/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Handles AI code generation, revisions, version control, and state rollbacks. 
 */
import {Request, Response} from 'express'
import prisma from '../lib/prisma.js';
import openai from '../configs/openai.js';

// Controller Function to Make Revision
export const makeRevision = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        
        const {projectId} = req.params;
        const {message} = req.body;

        const user = await prisma.user.findUnique({
            where: {id: userId}
        })

        if(!userId || !user){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if(user.credits < 5){
            return res.status(403).json({ message: 'Insufficient compute credits. Please acquire a new license.' });
        }

        if(!message || message.trim() === ''){
            return res.status(400).json({ message: 'Please enter a valid command' });
        }

        const currentProject = await prisma.websiteProject.findUnique({
            where: {id: projectId, userId},
            include: {versions: true}
        })

        if(!currentProject){
            return res.status(404).json({ message: 'Architecture not found' });
        }

        await prisma.conversation.create({
            data: {
                role: 'user',
                content: message,
                projectId
            }
        })

        await prisma.user.update({
            where: {id: userId},
            data: {credits: {decrement: 5}}
        })

        // Enhance user prompt
        const promptEnhanceResponse = await openai.chat.completions.create({
            model: 'openrouter/free',
            messages: [
                {
                    role: 'system',
                     content: `
                     You are a senior enterprise prompt engineering specialist. The user wants to modify their web architecture. Enhance their request to be hyper-specific and actionable for an AI web developer.

                    Enhance this by:
                    1. Being specific about what DOM elements to change.
                    2. Mentioning premium design details (colors, spacing, sizes, modern aesthetics).
                    3. Clarifying the desired outcome.
                    4. Using clear technical terms.

                    Return ONLY the enhanced request, nothing else. Keep it concise (1-2 sentences).`
                },
                {
                    role: 'user',
                    content: `User's request: "${message}"`
                }
            ]
        })

        const enhancedPrompt = promptEnhanceResponse.choices[0].message.content;

        await prisma.conversation.create({
            data: {
                role: 'assistant',
                content: `I've refined your architectural command to: "${enhancedPrompt}"`,
                projectId
            }
        })
        await prisma.conversation.create({
            data: {
                role: 'assistant',
                content: 'Compiling your new architecture...',
                projectId
            }
        })

        // Generate website code
        const codeGenerationResponse = await openai.chat.completions.create({
            model: 'openrouter/free',
            messages: [
                {
                    role: 'system',
                    content: `
                    You are an expert enterprise web developer. 

                    CRITICAL REQUIREMENTS:
                    - Return ONLY the complete updated HTML code with the requested changes.
                    - Use Tailwind CSS for ALL styling (NO custom CSS).
                    - Use Tailwind utility classes for all styling changes.
                    - Include all JavaScript in <script> tags before closing </body>
                    - Make sure it's a complete, standalone HTML document with Tailwind CSS.
                    - Return the HTML Code Only, nothing else.

                    Apply the requested changes while maintaining a premium, modern Tailwind CSS styling approach.`
                },
                {
                    role: 'user',
                    content: `
                    Here is the current website code: "${currentProject.current_code}" The user wants this change: "${enhancedPrompt}"`
                }
            ]
        })

        const code = codeGenerationResponse.choices[0].message.content || '';

        if(!code){
             await prisma.conversation.create({
            data: {
                role: 'assistant',
                content: "Engine failed to render the code. Please re-initialize.",
                projectId
            }
        })
        await prisma.user.update({
            where: {id: userId},
            data: {credits: {increment: 5}}
        })
        return;
        }

        const version = await prisma.version.create({
            data: {
                code: code.replace(/```[a-z]*\n?/gi, '')
                .replace(/```$/g, '')
                .trim(),
                description: 'Architecture revised',
                projectId
            }
        })

        await prisma.conversation.create({
            data: {
                role: 'assistant',
                content: "Architecture successfully updated! Deployment is ready for preview.",
                projectId
            }
        })

        await prisma.websiteProject.update({
            where: {id: projectId},
            data: {
                current_code: code.replace(/```[a-z]*\n?/gi, '')
                .replace(/```$/g, '')
                .trim(),
                current_version_index: version.id
            }
        })
        

        res.json({message: 'Architecture revision successful'})
    } catch (error : any) {
        await prisma.user.update({
            where: {id: userId},
            data: {credits: {increment: 5}}
        })
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller Function to rollback to a specific version
export const rollbackToVersion = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if(!userId){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { projectId, versionId } = req.params;

        const project = await prisma.websiteProject.findUnique({
            where: {id: projectId, userId},
            include: {versions: true}
        })

        if (!project) {
            return res.status(404).json({ message: 'Architecture not found' });
        }

        const version = project.versions.find((version)=>version.id === versionId);

        if(!version){
            return res.status(404).json({ message: 'Deployment version not found' });
        }

        await prisma.websiteProject.update({
            where: {id: projectId, userId},
            data: {
                current_code: version.code,
                current_version_index: version.id
            }
        })

        await prisma.conversation.create({
            data: {
                role: 'assistant',
                content: "Deployment successfully rolled back to the selected version.",
                projectId
            }
        })

        res.json({ message: 'Deployment restored' });
    } catch (error : any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller Function to Delete a Project
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const { projectId } = req.params;

        await prisma.websiteProject.delete({
            where: {id: projectId, userId},
        })

        res.json({ message: 'Architecture successfully purged' });
    } catch (error : any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller for getting project code for preview
export const getProjectPreview = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const { projectId } = req.params;

        if(!userId){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const project = await prisma.websiteProject.findFirst({
            where: {id: projectId, userId},
            include: {versions: true}
        })

        if(!project){
            return res.status(404).json({ message: 'Architecture not found' });
        }

        res.json({ project });
    } catch (error : any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Get published projects
export const getPublishedProjects = async (req: Request, res: Response) => {
    try {
        
        const projects = await prisma.websiteProject.findMany({
            where: {isPublished: true},
            include: {user: true}
        })

        res.json({ projects });
    } catch (error : any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Get a single project by id
export const getProjectById = async (req: Request, res: Response) => {
    try {
       const { projectId } = req.params;

        const project = await prisma.websiteProject.findFirst({
            where: {id: projectId},
        })

        if(!project || project.isPublished === false || !project?.current_code){
            return res.status(404).json({ message: 'Deployment unavailable or not found' });
        }

        res.json({ code: project.current_code });
    } catch (error : any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller to save project code
export const saveProjectCode = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const { projectId } = req.params;
        const {code} = req.body;

        if(!userId){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if(!code){
            return res.status(400).json({ message: 'Valid code payload is required' });
        }

        const project = await prisma.websiteProject.findUnique({
            where: {id: projectId, userId}
        })

        if(!project){
            return res.status(404).json({ message: 'Architecture not found' });
        }

        await prisma.websiteProject.update({
            where: {id: projectId},
            data: {current_code: code, current_version_index: ''}
        })

        res.json({ message: 'Deployment state saved successfully' });
    } catch (error : any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}