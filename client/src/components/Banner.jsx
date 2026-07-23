import { useState } from "react";
import { TruckIcon, XIcon ,ZapIcon} from "lucide-react";
function Banner() {
    const [banner, setBanner] = useState(()=>{
        return sessionStorage.getItem('banner_dismissed') !== 'true';
    })
    const dismissBanner = () => {
        setBanner(false);
        sessionStorage.setItem('banner_dismissed', 'true');
    }
  return (
    <div>{
        banner && (
            <div className="bg-linear-to-r from-app-green via-emerald-800 to-app-green-light text-white text-xs sm:text-sm relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex-center gap-6">
                    <div className="flex-center gap-2">
                        <TruckIcon className="size-4 shrink-0" />
                        <span className="font-medium">Free delivery on orders over $50</span>
                    </div>
                    <span className="hidden sm:inline text-white/40">|</span>
                    <div className="hidden sm:flex items-center gap-2">
                        <ZapIcon className="size-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                        <span>Farm-fresh produce directly from farmers</span>
                    </div>
                </div>
                <button onClick={dismissBanner} className="absolute top-1/2 -translate-y-1/2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                    <XIcon className="size-3.5" />
                </button>
            </div>
        )
    }</div>
  )
}

export default Banner