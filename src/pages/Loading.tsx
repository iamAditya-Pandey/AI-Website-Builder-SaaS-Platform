/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Global loading screen for seamless transitions between workspace views. 
 */
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'

const Loading = () => {

    useEffect(()=>{
        setTimeout(()=>{
            window.location.href = '/'
        },6000)
    },[])

  return (
    <div className='h-screen flex flex-col font-sans'>
      <div className='flex items-center justify-center flex-1'>
        <Loader2Icon className='size-8 animate-spin text-orange-400 drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]'/>
      </div>
    </div>
  )
}

export default Loading