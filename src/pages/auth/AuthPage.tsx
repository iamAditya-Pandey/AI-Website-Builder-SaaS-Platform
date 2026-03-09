/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Authentication page handling secure user sign-in and sign-up flows. 
 */
import { useParams } from "react-router-dom"
import { AuthView } from "@daveyplate/better-auth-ui"

export default function AuthPage() {
  const { pathname } = useParams()

  return (
    <main className="p-6 flex flex-col justify-center items-center h-[80vh] font-sans">
      <AuthView pathname={pathname} classNames={{base: 'bg-black/10 ring ring-orange-900/50'}}/>
    </main>
  )
}