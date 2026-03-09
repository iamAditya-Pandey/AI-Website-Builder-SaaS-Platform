/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Premium landing page for the AI Website Builder SaaS Platform. 
 */
import api from '@/configs/axios';
import { authClient } from '@/lib/auth-client';
import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Footer from '../components/Footer';

const Home = () => {

  const {data: session} = authClient.useSession()
  const navigate = useNavigate()

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!session?.user){
        return toast.error('Please sign in to access the deployment engine')
      }else if(!input.trim()){
        return toast.error('Please provide a prompt to initialize')
      }
      setLoading(true)
      const {data} = await api.post('/api/user/project', {initial_prompt: input});
      setLoading(false);
      navigate(`/projects/${data.projectId}`)
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }

  }

  return (
      <>
      <section className="flex flex-col items-center text-white text-sm pb-10 px-4 font-sans tracking-wide min-h-[80vh]">

        <div className="flex items-center gap-2 border border-orange-500/30 bg-orange-950/20 rounded-full p-1 pr-4 text-sm mt-20 cursor-default">
          <span className="bg-orange-600 text-xs font-semibold px-3 py-1 rounded-full tracking-wider uppercase">Enterprise</span>
          <p className="flex items-center gap-2 text-orange-50 font-medium">
            <span>Experience the next generation of web design</span>
            <svg className="mt-px text-orange-400" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </p>
        </div>

        <h1 className="text-center text-[40px] leading-[1.2] md:text-6xl mt-6 font-bold max-w-4xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Transform Ideas into Premium Web Experiences Instantly.
        </h1>

        <p className="text-center text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed font-light">
          Architect, customize, and deploy stunning web applications at unprecedented speeds with our Enterprise AI Engine.
        </p>

        <form onSubmit={onSubmitHandler} className="bg-gray-900/50 backdrop-blur-md max-w-2xl w-full rounded-2xl p-4 mt-12 border border-gray-700 focus-within:border-orange-500 focus-within:ring-1 ring-orange-500 transition-all shadow-2xl shadow-orange-900/10">
          <textarea onChange={e => setInput(e.target.value)} className="bg-transparent outline-none text-gray-200 resize-none w-full font-light placeholder-gray-500 text-base" rows={4} placeholder="Describe your digital vision in detail..." required />
          <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 rounded-lg px-6 py-2.5 font-medium transition-all shadow-lg shadow-orange-900/30">
            {!loading ? 'Initialize Build' : (
              <>
              Compiling <Loader2Icon className='animate-spin size-4 text-white'/>
              </>
            )}
            
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-20 mx-auto mt-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" alt="" />
          <img className="max-w-28 md:max-w-32" src="https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" alt="" />
        </div>
      </section>
      
      <Footer />
      </>
  )
}

export default Home