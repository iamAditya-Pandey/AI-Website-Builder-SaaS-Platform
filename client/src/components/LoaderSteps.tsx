/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Premium loading state component indicating AI website generation progress. 
 */
import { CircleIcon, ScanLineIcon, SquareIcon, TriangleIcon } from "lucide-react"
import { useEffect, useState } from "react"

const steps = [
    {icon: ScanLineIcon, label: "Initializing AI engine architecture…"},
    {icon: SquareIcon, label: "Synthesizing UI component matrix…"},
    {icon: TriangleIcon, label: "Compiling responsive layout structures…"},
    {icon: CircleIcon, label: "Finalizing premium web assets…"},
]

const STEP_DURATION = 45000

const LoaderSteps = () => {
    const [current, setCurrent] = useState(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrent((s)=> (s + 1) % steps.length)
        }, STEP_DURATION);
        return ()=> clearInterval(interval)
    },[])

    const Icon = steps[current].icon;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-950 relative overflow-hidden text-white font-sans">
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 blur-3xl animate-pulse"></div>

      <div className="relative z-10 w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-orange-500 animate-ping opacity-30"/>
        <div className="absolute inset-4 rounded-full border border-amber-400/30"/>
        <Icon className="w-8 h-8 text-orange-400 opacity-90 animate-bounce"/>
      </div>
       {/* Step label – fade using transition only (no invisible start) */}
       <p key={current} className="mt-8 text-lg font-light text-white/90 tracking-wide transition-all duration-700 ease-in-out opacity-100">{steps[current].label}</p>

       <p className="text-xs text-gray-400 mt-2 transition-opacity duration-700 opacity-100 tracking-wider uppercase">Processing • Please Wait</p>
    </div>
  )
}

export default LoaderSteps