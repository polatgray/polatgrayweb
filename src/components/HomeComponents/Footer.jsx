import IGLogo from "../../images/igLogo.svg"
import XLogo from "../../images/xLogo.svg"
import Mail from "../../images/mail.svg"
import CustomerServiceLogo from "../../images/csLogo.svg"
import Work from "../../images/work.svg"
import Add from "../../images/material-symbols--add-rounded.svg"
import Money from "../../images/Money.svg"

const Footer = () => {
    return(
        <>
          <div className="flex border-t-1 justify-around border-amber-500 py-12 gap-24 w-full lg:flex-row flex-col lg:items-start items-center">
                <p className="animated-text inter-500 text-7xl me-12">PG</p>
                <div className="flex flex-col">
                    <p className="inter-500 text-amber-400 text-2xl mb-3">Social Media Links</p>
                    <div className="flex flex-col mb-5">
                            <a href="https://www.instagram.com/polatgray/" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={IGLogo} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">Instagram</p>
                            </a>
                    </div>
                    <div className="flex flex-col mb-5">
                            <a href="https://www.instagram.com/polatgrayreels/" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={IGLogo} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">Polat Gray | Reels</p>
                            </a>
                    </div>
                    <div className="flex flex-col">
                            <a href="https://x.com/polatgray" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={XLogo} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">X</p>
                            </a>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="inter-500 text-amber-400 text-2xl mb-3">Contact</p>
                    <div className="flex flex-col mb-5">
                            <a href="mail:polatgraywebveodeme@gmail.com" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={Mail} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">E-Mail address</p>
                            </a>
                    </div>
                    <div className="flex flex-col mb-5">
                            <a href="#" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={CustomerServiceLogo} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">Support form</p>
                            </a>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="inter-500 text-amber-400 text-2xl mb-3">About OFM</p>
                    <div className="flex flex-col mb-5">
                            <a href="/learnAboutOFM" className="flex items-center gap-2 cursor-pointer" >
                                <img src={Work} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">About OFM</p>
                            </a>
                    </div>
                    <div className="flex flex-col mb-5">
                            <a href="#" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={Add} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">Join OFM</p>
                            </a>
                    </div>
                    <div className="flex flex-col mb-5">
                            <a href="#" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={Money} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">Some OFM Sales</p>
                            </a>
                    </div>
                </div>
          </div>
        </>
    )
}

export default Footer