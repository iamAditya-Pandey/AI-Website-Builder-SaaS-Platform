/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Core integrated development environment (IDE) for live AI code manipulation. 
 */
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Project } from '../types'
import { ArrowBigDownDashIcon, EyeIcon, EyeOffIcon, FullscreenIcon, LaptopIcon, Loader2Icon, MessageSquareIcon, SaveIcon, SmartphoneIcon, TabletIcon, XIcon } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import ProjectPreview, { type ProjectPreviewRef } from '../components/ProjectPreview'
import api from '@/configs/axios'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'

const Projects = () => {
  const {projectId} = useParams()
  const navigate = useNavigate()
  const {data: session, isPending} = authClient.useSession()

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  const [isGenerating, setIsGenerating] = useState(true)
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>("desktop")

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const previewRef = useRef<ProjectPreviewRef>(null)

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${projectId}`);
      setProject(data.project)
      setIsGenerating(data.project.current_code ? false : true)
      setLoading(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  }

  const saveProject = async () => {
    if(!previewRef.current) return;
    const code = previewRef.current.getCode();
    if(!code) return;
    setIsSaving(true);
    try {
      const { data } = await api.put(`/api/project/save/${projectId}`, {code});
      toast.success(data.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }finally{
      setIsSaving(false);
    }
    };

    // download code ( index.html )
  const downloadCode = ()=>{
    const code = previewRef.current?.getCode() || project?.current_code;
    if(!code){
      if(isGenerating){
        return
      }
      return
    }
    const element = document.createElement('a');
    const file = new Blob([code], {type: "text/html"});
    element.href = URL.createObjectURL(file)
    element.download = "index.html";
    document.body.appendChild(element)
    element.click();
  }

  const togglePublish = async () => {
    try {
      const { data } = await api.get(`/api/user/publish-toggle/${projectId}`);
      toast.success(data.message)
      setProject((prev)=> prev ? ({...prev, isPublished: !prev.isPublished}) : null)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  }

  useEffect(()=>{
    if(session?.user){
      fetchProject();
    }else if(!isPending && !session?.user){
      navigate("/")
      toast("Please authorize session to access workspace.")
    }
  },[session?.user])

  useEffect(()=>{
    if(project && !project.current_code){
      const intervalId = setInterval(fetchProject, 10000);
      return ()=> clearInterval(intervalId)
    }
  },[project])

  if(loading){
    return (
      <>
      <div className="flex items-center justify-center h-screen font-sans">
        <Loader2Icon className="size-8 animate-spin text-orange-400"/>
      </div>
      </>
    )
  }
  return project ? (
    <div className='flex flex-col h-screen w-full bg-gray-950 text-white font-sans tracking-wide'>
      {/* builder navbar  */}
      <div className='flex max-sm:flex-col sm:items-center gap-4 px-4 py-3 border-b border-gray-800 bg-gray-900/80 no-scrollbar'>
        {/* left  */}
        <div className='flex items-center gap-3 sm:min-w-90 text-nowrap'>
          <img src="/favicon.svg" alt="logo" className="h-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={()=> navigate('/')}/>
          <div className='max-w-64 sm:max-w-xs pl-2 border-l border-gray-700'>
            <p className='text-sm font-semibold tracking-wide text-gray-200 capitalize truncate'>{project.name}</p>
            <p className='text-[10px] uppercase font-medium text-orange-400 mt-0.5 tracking-wider'>Rendering Active Build</p>
          </div>
          <div className='sm:hidden flex-1 flex justify-end'>
            {isMenuOpen ? 
            <MessageSquareIcon onClick={()=> setIsMenuOpen(false)} className="size-6 text-orange-400 cursor-pointer" />
            : <XIcon onClick={()=> setIsMenuOpen(true)} className="size-6 text-orange-400 cursor-pointer"/>}
          </div>
        </div>
        {/* middle  */}
        <div className='hidden sm:flex gap-1.5 bg-gray-950 border border-gray-800 p-1 rounded-lg shadow-inner'>
          <SmartphoneIcon onClick={()=> setDevice('phone')} className={`size-7 p-1.5 rounded-md cursor-pointer transition-colors ${device === 'phone' ? "bg-gray-800 text-orange-400" : "text-gray-400 hover:text-gray-200"}`}/>

          <TabletIcon onClick={()=> setDevice('tablet')} className={`size-7 p-1.5 rounded-md cursor-pointer transition-colors ${device === 'tablet' ? "bg-gray-800 text-orange-400" : "text-gray-400 hover:text-gray-200"}`}/>

          <LaptopIcon onClick={()=> setDevice('desktop')} className={`size-7 p-1.5 rounded-md cursor-pointer transition-colors ${device === 'desktop' ? "bg-gray-800 text-orange-400" : "text-gray-400 hover:text-gray-200"}`}/>
        </div>
        {/* right  */}
        <div className='flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm font-medium'>
              <button onClick={saveProject} disabled={isSaving} className='max-sm:hidden bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-1.5 flex items-center gap-2 rounded-md transition-colors border border-gray-700'>
                {isSaving ? <Loader2Icon className="animate-spin text-orange-400" size={16}/> : <SaveIcon className="text-orange-400" size={16}/>} Commit
              </button>
              <Link target='_blank' to={`/preview/${projectId}`} className="flex items-center gap-2 px-4 py-1.5 rounded-md border border-gray-700 hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors text-gray-200">
                <FullscreenIcon size={16} className="text-gray-400"/> Preview
              </Link>
              <button onClick={downloadCode} className='bg-linear-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 text-gray-200 px-4 py-1.5 flex items-center gap-2 rounded-md transition-colors'>
                <ArrowBigDownDashIcon size={16} className="text-gray-400" /> Export Source
              </button>
              <button onClick={togglePublish} className='bg-linear-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 shadow-md shadow-orange-900/30 border border-orange-500 text-white px-4 py-1.5 flex items-center gap-2 rounded-md transition-all'>
                {project.isPublished ?
                <EyeOffIcon size={16}/> : <EyeIcon size={16}/> 
              }
                {project.isPublished ? "Revoke Access" : "Deploy Live"}
              </button>
        </div>
      </div>
      <div className='flex-1 flex overflow-auto'>
             <Sidebar isMenuOpen={isMenuOpen} project={project} setProject={(p)=>setProject(p)} isGenerating={isGenerating} setIsGenerating={setIsGenerating}/>

              <div className='flex-1 p-3 pl-0'>
                <ProjectPreview ref={previewRef} project={project} isGenerating={isGenerating} device={device}/>
              </div>
      </div>
    </div>
  )
  : 
  (
    <div className='flex items-center justify-center h-screen font-sans'>
      <p className="text-2xl font-medium text-gray-300 tracking-wide">Architecture configuration failed to load.</p>
    </div>
  )
}

export default Projects