/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Enterprise billing interface integrating Stripe for credit management. 
 */
import React from 'react'
import { appPlans } from '../assets/assets';
import Footer from '../components/Footer';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import api from '@/configs/axios';

interface Plan {
    id: string;
    name: string;
    price: string;
    credits: number;
    description: string;
    features: string[];
}

const Pricing = () => {

    const {data: session} = authClient.useSession()
    const [plans] = React.useState<Plan[]>(appPlans)

    const handlePurchase = async (planId: string) => {
        try {
            if(!session?.user) return toast('Authentication required to process transactions')
            const {data} = await api.post('/api/user/purchase-credits', {planId})
            window.location.href = data.payment_link;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }
    
  return (
    <>
      <div className='w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh] font-sans tracking-wide'>
        <div className='text-center mt-20'>
            <h2 className='text-white text-4xl font-bold tracking-tight'>Enterprise Licensing</h2>
            <p className='text-gray-400 text-base max-w-xl mx-auto mt-4 leading-relaxed font-light'>Scale your digital infrastructure effortlessly. Acquire compute credits to fuel the AI architecture engine.</p>
        </div>
        <div className='pt-16 py-4 px-4 '>
        <div className='grid grid-cols-1 md:grid-cols-3 flex-wrap gap-8'>
                        {plans.map((plan, idx) => (
                            <div key={idx} className="p-8 bg-gray-900/50 backdrop-blur-sm border border-orange-900/30 mx-auto w-full max-w-sm rounded-2xl text-white shadow-xl hover:border-orange-500/60 hover:shadow-orange-900/20 hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-xl font-bold tracking-wide text-orange-50">{plan.name}</h3>
                                <div className="my-4">
                                    <span className="text-5xl font-extrabold tracking-tighter">{plan.price}</span>
                                    <span className="text-orange-400/80 font-medium ml-1"> / {plan.credits} Compute</span>
                                </div>

                                <p className="text-gray-400 mb-8 font-light text-sm">{plan.description}</p>

                                <ul className="space-y-3 mb-8 text-sm font-light">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg className="h-5 w-5 text-orange-500 mr-3 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => handlePurchase(plan.id)} className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 active:scale-95 text-sm font-semibold tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-orange-900/40">
                                    Acquire License
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='max-w-2xl mx-auto mt-12 p-4 rounded-xl border border-orange-900/20 bg-orange-950/10'>
                    <p className='text-center text-sm text-gray-400 font-light leading-relaxed'>
                        <span className='font-semibold text-orange-400'>System Protocol:</span> Engine Initialization and Architecture Revisions consume <span className='text-white font-medium'>5 compute credits</span> per cycle. Active subscription models ensure uninterrupted access to the generation matrix.
                    </p>
                </div>
      </div>
      <Footer />
    </>
  )
}

export default Pricing