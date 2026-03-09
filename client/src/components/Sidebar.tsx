/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: AI chat interface and version control sidebar for project modifications. 
 */
import React, { useEffect, useRef, useState } from 'react'
import type { Message, Project, Version } from '../types';
import { BotIcon, EyeIcon, Loader2Icon, SendIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/configs/axios';
import { toast } from 'sonner';

interface SidebarProps {
    isMenuOpen: boolean;
    project: Project,
    setProject: (project: Project)=> void;
    isGenerating: boolean;
    setIsGenerating: (isGenerating: boolean)=> void;
}

const Sidebar = ({isMenuOpen, project, setProject, isGenerating, setIsGenerating} : SidebarProps) => {

    const messageRef = useRef<HTMLDivElement>(null)
    const [input, setInput] = useState('')

    const fetchProject = async () => {
        try {
            const { data } = await api.get(`/api/user/project/${project.id}`)
            setProject(data.project)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    const handleRollback = async (versionId: string) => {
        try {
            const confirm = window.confirm('Are you sure you want to rollback to this version?')
            if(!confirm) return;
            setIsGenerating(true)
            const { data } = await api.get(`/api/project/rollback/${project.id}/${versionId}`);
            const { data: data2 } = await api.get(`/api/user/project/${project.id}`);
            toast.success(data.message)
            setProject(data2.project)
            setIsGenerating(false)

        } catch (error: any) {
            setIsGenerating(false)
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    const handleRevisions = async (e: React.FormEvent) => {
        e.preventDefault()
        let interval: number | undefined;
        try {
            setIsGenerating(true);
            interval = setInterval(()=>{
                fetchProject();
            },10000)
            const {data} = await api.post(`/api/project/revision/${project.id}`, {message: input})
            fetchProject();
            toast.success(data.message)
            setInput('')
            clearInterval(interval)
            setIsGenerating(false);
        } catch (error: any) {
            setIsGenerating(false);
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
            clearInterval(interval)
        }
    }

    useEffect(()=>{
        if(messageRef.current){
            messageRef.current.scrollIntoView({behavior: 'smooth'})
        }
    },[project.conversation.length, isGenerating])

  return (
    <div className={`h-full  sm:max-w-sm rounded-xl bg-gray-900 border-gray-800 transition-all font-sans tracking-wide ${isMenuOpen ? 'max-sm:w-0 overflow-hidden' : 'w-full'}`}>
      <div className='flex flex-col h-full'>
        {/* Messages container */}
        <div className='flex-1 overflow-y-auto no-scrollbar px-3 flex flex-col gap-4 pt-4'>
            {[...project.conversation, ...project.versions]
            .sort((a,b)=> new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).map((message)=>{
                const isMessage = 'content' in message;

                if(isMessage){
                    const msg = message as Message;
                    const isUser = msg.role === 'user';
                    return (
                        <div key={msg.id} className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
                            {!isUser && (
                                <div className='w-8 h-8 rounded-full bg-linear-to-br from-orange-600 to-orange-700 shadow-md shadow-orange-900/50 flex items-center justify-center flex-shrink-0'>
                                    <BotIcon className='size-5 text-white'/>
                                </div>
                            )}
                            <div className={`max-w-[80%] p-3 px-4 rounded-2xl shadow-sm text-sm mt-1 leading-relaxed ${isUser ? "bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-tr-none shadow-orange-900/20" : "rounded-tl-none bg-gray-800 border border-gray-700 text-gray-100"}`}>
                                {msg.content}
                            </div>
                            {isUser && (
                                <div className='w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 mt-1'>
                                    <UserIcon className='size-5 text-gray-300'/>
                                </div>
                            )}
                        </div>
                    )
                }else{
                    const ver = message as Version;
                    return (
                        <div key={ver.id} className='w-4/5 mx-auto my-3 p-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 shadow-lg flex flex-col gap-3'>
                            <div className='text-xs font-semibold tracking-wide text-orange-400 uppercase'>
                                Architecture Updated <br /> 
                                <span className='text-gray-400 text-[10px] font-normal tracking-wider'>
                                    {new Date(ver.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <div className='flex items-center justify-between'>
                                {project.current_version_index === ver.id ? (
                                    <button className='px-4 py-1.5 rounded-lg text-xs font-medium bg-gray-900/80 border border-gray-700 text-gray-400'>Active Build</button>
                                ): (
                                    <button onClick={()=> handleRollback(ver.id)} className='px-4 py-1.5 rounded-lg text-xs font-medium bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-900/30 text-white transition-colors'>Restore Deployment</button>
                                )}
                                <Link target='_blank' to={`/preview/${project.id}/${ver.id}`}>
                                <EyeIcon className='size-7 p-1.5 bg-gray-700 hover:bg-orange-500 text-gray-300 hover:text-white transition-colors rounded-lg'/>
                                </Link>
                            </div>
                        </div>
                    )
                }
            })}
            {isGenerating && (
                <div className='flex items-start gap-3 justify-start mt-2'>
                    <div className='w-8 h-8 rounded-full bg-linear-to-br from-orange-600 to-orange-700 shadow-md shadow-orange-900/50 flex items-center justify-center'>
                        <BotIcon className='size-5 text-white'/>
                    </div>
                    {/* three dot loader */}
                    <div className='flex gap-1.5 h-full items-center pt-3'>
                        <span className='size-2.5 rounded-full animate-bounce bg-orange-400' style={{animationDelay : '0s'}}/>
                        <span className='size-2.5 rounded-full animate-bounce bg-orange-500' style={{animationDelay : '0.2s'}}/>
                        <span className='size-2.5 rounded-full animate-bounce bg-orange-600' style={{animationDelay : '0.4s'}}/>
                    </div>
                </div>
            )

            }
            <div ref={messageRef}/>
        </div>
        {/* Input area */}
        <form onSubmit={handleRevisions} className='m-4 relative'>
            <div className='flex items-center gap-2'>
                <textarea onChange={(e)=>setInput(e.target.value)} value={input} rows={4} placeholder='Command the AI to refine your workspace or inject new features...' className='flex-1 p-4 rounded-xl resize-none text-sm outline-none border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-800/80 text-gray-100 placeholder-gray-500 transition-all shadow-inner' disabled={isGenerating}/>
                <button disabled={isGenerating || !input.trim()} className='absolute bottom-3 right-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-900/40 text-white transition-all disabled:opacity-50 disabled:grayscale'>
                    {isGenerating 
                    ? <Loader2Icon className='size-9 p-2 animate-spin text-white'/>
                : <SendIcon className='size-9 p-2 text-white'/>}
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Sidebar