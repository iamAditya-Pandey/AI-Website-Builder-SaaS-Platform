/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: User workspace dashboard to manage, preview, and deploy AI-generated architectures. 
 */
import React, { useEffect, useState } from 'react'
import type { Project } from '../types';
import { Loader2Icon, PlusIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import api from '@/configs/axios';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

const MyProjects = () => {
    const {data: session, isPending} = authClient.useSession()
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([])
    const navigate = useNavigate()

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/api/user/projects')
            setProjects(data.projects)
            setLoading(false)
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const deleteProject = async (projectId:string) => {
        try {
            const confirm = window.confirm('Are you sure you want to permanently delete this architecture?');
            if(!confirm) return;
            const { data } = await api.delete(`/api/project/${projectId}`)
            toast.success(data.message);
            fetchProjects()
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    useEffect(()=>{
        if(session?.user && !isPending){
            fetchProjects()
        }else if(!isPending && !session?.user){
            navigate('/');
            toast('Please authenticate to access your secure workspace');
        }
    },[session?.user])
  return (
    <>
      <div className='px-4 md:px-16 lg:px-24 xl:px-32 font-sans tracking-wide'>
        {loading ? (
            <div className='flex items-center justify-center h-[80vh]'>
                <Loader2Icon className='size-8 animate-spin text-orange-400'/>
            </div>
        ) : projects.length > 0 ? (
            <div className='py-10 min-h-[80vh]' > 
                <div className='flex items-center justify-between mb-12'>
                    <h1 className='text-3xl font-semibold text-white tracking-tight'>Active Deployments</h1>
                    <button onClick={()=> navigate('/')} className='flex items-center gap-2 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded shadow-lg shadow-orange-900/30 bg-linear-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:opacity-100 active:scale-95 transition-all font-medium'>
                        <PlusIcon size={18}/> Initialize Build
                    </button>
                </div>

                <div className='flex flex-wrap gap-5'>
                    {projects.map((project)=>(
                        <div onClick={()=> navigate(`/projects/${project.id}`)} key={project.id} className='relative group w-72 max-sm:mx-auto cursor-pointer bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden shadow-lg group hover:shadow-orange-900/20 hover:border-orange-500/50 transition-all duration-300'>
                            {/* Desktop-like Mini Preview */}
                            <div className='relative w-full h-40 bg-gray-950 overflow-hidden border-b border-gray-800/50'>
                                {project.current_code ? (
                                    <iframe  
                                    srcDoc={project.current_code}
                                    className='absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none'
                                    sandbox='allow-scripts allow-same-origin'
                                    style={{ transform: 'scale(0.25)'}}/>
                                )
                            : (
                                <div className='flex items-center justify-center h-full text-gray-600 uppercase text-xs font-semibold tracking-widest'>
                                    <p>Engine Rendering...</p>
                                </div>
                            )}
                            </div>
                             {/* Content */}
                             <div className='p-5 text-white bg-linear-180 from-transparent group-hover:from-orange-950/30 to-transparent transition-colors'>
                                <div className='flex items-start justify-between'>
                                    <h2 className='text-lg font-medium line-clamp-2 leading-tight'>{project.name}</h2>
                                    <button className='px-2.5 py-1 mt-1 ml-2 text-[10px] uppercase tracking-wider font-semibold text-orange-400 bg-orange-950/50 border border-orange-900/50 rounded-full'>Deployed</button>
                                </div>
                                <p className='text-gray-400 mt-2 text-sm line-clamp-2 leading-relaxed'>{project.initial_prompt}</p>

                                <div onClick={(e)=>e.stopPropagation()} className='flex justify-between items-center mt-6 pt-4 border-t border-gray-800/50'>
                                    <span className='text-xs font-medium text-gray-500 tracking-wider'>{new Date(project.createdAt).toLocaleDateString()}</span>
                                    <div className='flex gap-2 text-white text-xs font-medium uppercase tracking-wider'>

                                        <button onClick={()=>navigate(`/preview/${project.id}`)} className='px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded transition-all'>View</button>

                                        <button onClick={()=>navigate(`/projects/${project.id}`)} className='px-3 py-1.5 bg-orange-600 hover:bg-orange-700 rounded transition-colors shadow-md shadow-orange-900/30'>Edit</button>
                                    </div>
                                </div>
                             </div>
                             <div onClick={e => e.stopPropagation()}>
                                <TrashIcon className='absolute top-3 right-3 scale-0 group-hover:scale-100 bg-gray-900 border border-gray-700 p-1.5 size-8 rounded-lg text-red-500 cursor-pointer hover:bg-red-950/50 transition-all shadow-xl' onClick={()=>deleteProject(project.id)}/>
                             </div>
                        </div>
                    ))}
                </div>
                
            </div>
        ) : (
            <div className='flex flex-col items-center justify-center h-[80vh] font-sans'>
                 <h1 className='text-3xl font-semibold text-gray-300 tracking-tight'>Your workspace is empty.</h1>
                 <button onClick={() => navigate('/')} className='text-white font-medium px-6 py-2.5 mt-6 rounded shadow-lg shadow-orange-900/30 bg-orange-600 hover:bg-orange-700 active:scale-95 transition-all'>
                    Initialize Architecture
                 </button>
            </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default MyProjects