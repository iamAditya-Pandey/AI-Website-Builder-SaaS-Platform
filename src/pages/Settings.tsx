/* * Author: Aditya Pandey 
 * GitHub: https://github.com/iamAditya-Pandey 
 * Description: Account configuration and security management controls. 
 */
import { AccountSettingsCards, ChangePasswordCard, DeleteAccountCard  } from "@daveyplate/better-auth-ui"

const Settings = () => {
  return (
 
    <div className="w-full p-4 flex justify-center items-center min-h-[90vh] flex-col gap-6 py-12 font-sans tracking-wide">
      <AccountSettingsCards 
      classNames={{
        card: {
            base: 'bg-gray-900/40 backdrop-blur-sm border border-orange-900/30 ring ring-orange-900/20 max-w-xl mx-auto shadow-xl',
            footer: 'bg-gray-900/60 border-t border-orange-900/20 ring ring-orange-900/20'
        }
      }}/>
      <div className="w-full">
            <ChangePasswordCard classNames={{
                base: 'bg-gray-900/40 backdrop-blur-sm border border-orange-900/30 ring ring-orange-900/20 max-w-xl mx-auto shadow-xl',
                footer: 'bg-gray-900/60 border-t border-orange-900/20 ring ring-orange-900/20'
            }}/>
        </div>
        <div className="w-full">
            <DeleteAccountCard classNames={{
                base: 'bg-gray-900/40 backdrop-blur-sm border border-red-900/30 ring ring-red-900/20 max-w-xl mx-auto shadow-xl'
            }}/>
        </div>
      </div>     
  )
}

export default Settings