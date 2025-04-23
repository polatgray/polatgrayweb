import { useContext, useState } from "react"
import IGLogo from "../../images/igLogo.svg"
import XLogo from "../../images/xLogo.svg"
import Mail from "../../images/mail.svg"
import toast from 'react-hot-toast';
import CustomerServiceLogo from "../../images/csLogo.svg"
import Work from "../../images/work.svg"
import Add from "../../images/material-symbols--add-rounded.svg"
import Money from "../../images/Money.svg"
import { useNavigate } from "react-router-dom"
import { LanguageContext } from "../../Context/LanguageContext"
import Close from "../../images/closeWhite.svg";
import Modal from 'react-modal';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase"


const Footer = () => {

    const {language} = useContext(LanguageContext);

    const [modalOpen,setModalOpen] = useState(false);

    const navigate = useNavigate();

    const [mail,setMail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [title,setTitle] = useState("");
    const [message,setMessage] = useState("");

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          zIndex: "50"
        },
      };

    const sendSupport = async () => {
        toast.loading("Loading...");
        try{
            const docRef = await addDoc(collection(db,"support"),{
                mail:mail,
                phoneNumber: phoneNumber,
                title: title,
                message: message,
                createdAt: new Date().getTime()
            })
            setModalOpen(!modalOpen);
            toast.dismiss();
            toast.success("Message Sent!")
        }
        catch(error){
            console.error(error);
            toast.dismiss();
            toast.error("Some problems occurred, please contact support")
        }
    }

    return(
        <>
         <Modal isOpen={modalOpen} style={customStyles}>
            <div className="flex justify-end">
                <img
                src={Close}
                alt="Close Button"
                className="w-[45px]"
                onClick={() => setModalOpen(!modalOpen)}
                />
            </div>
            <div className="flex flex-col">
                <p className="inter-500 text-white">{language == "en" ? "E-Mail Address" : "E-Posta adresin"}</p>
                <input type="text" placeholder="E-Mail Address" onChange={(e) => setMail(e.target.value)} className="p-2 rounded-lg border-amber-500 border bg-black mt-2 inter-500 text-white outline-0"/>
            </div>
            <div className="flex flex-col mt-6">
                <p className="inter-500 text-white">{language == "en" ? "Phone Number" : "Telefon Numaran"}</p>
                <input type="number" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} className="p-2 rounded-lg border-amber-500 border bg-black mt-2 inter-500 text-white outline-0"/>
            </div>
            <div className="flex flex-col mt-6">
                <p className="inter-500 text-white">{language == "en" ? "Subtitle" : "Konu"}</p>
                <input type="text" placeholder="Subtitle" onChange={(e) => setTitle(e.target.value)} className="p-2 rounded-lg border-amber-500 border bg-black mt-2 inter-500 text-white outline-0"/>
            </div>
            <div className="flex flex-col mt-6">
                <p className="inter-500 text-white">{language == "en" ? "Message" : "Mesajın"}</p>
                <textarea type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)} className="p-2 rounded-lg border-amber-500 border bg-black mt-2 inter-500 text-white outline-0 h-[130px]"/>
            </div>
            <button className="mt-4 bg-amber-500 rounded-lg py-2 inter-500 text-white w-full" onClick={() => sendSupport()}>{language == "en" ? "Send" : "Gönder"}</button>
         </Modal>
          <div className="flex border-t-1 justify-around border-amber-500 lg:py-12 py-24 lg:gap-24 gap-12 w-full lg:flex-row flex-col lg:items-start items-center">
                <p className="animated-text inter-500 text-7xl lg:me-12 text-center">PG</p>
                <div className="flex flex-col lg:w-auto w-[220px]">
                    <p className="inter-500 text-amber-400 text-2xl mb-3">{language == "en" ? "Social Media Links" : "Sosyal Medya Linkleri"}</p>
                    <div className="flex flex-col  mb-5">
                            <a href="https://www.instagram.com/polatgray/" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={IGLogo} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">Instagram</p>
                            </a>
                    </div>
                    <div className="flex flex-col mb-5">
                            <a href="https://www.instagram.com/polatgreyreels/" className="flex items-center gap-2 cursor-pointer" target="_blank">
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
                <div className="flex flex-col lg:w-auto w-[220px]">
                    <p className="inter-500 text-amber-400 text-2xl mb-3">{language == "en" ? "Contact" : "İletişim"}</p>
                    <div className="flex flex-col mb-5">
                            <a href="mailto:polatgraybillionaire@gmail.com" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={Mail} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">{language == "en" ? "E-Mail address" : "E-Mail adresi"}</p>
                            </a>
                    </div>
                    <div className="flex flex-col mb-5">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setModalOpen(!modalOpen)}>
                                <img src={CustomerServiceLogo} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">{language == "en" ? "Support form" : "Destek formu"}</p>
                            </div>
                    </div>
                </div>
                <div className="flex flex-col lg:w-auto w-[220px]">
                    <p className="inter-500 text-amber-400 text-2xl mb-3">{language == "en" ? "About OFM" : "OFM Hakkında"}</p>
                    <div className="flex flex-col mb-5">
                            <a href="/learnAboutOFM" className="flex items-center gap-2 cursor-pointer" >
                                <img src={Work} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">{language == "en" ? "About OFM" : "OFM Hakkında"}</p>
                            </a>
                    </div>
                    <div className="flex flex-col mb-5">
                            <a href="/CheckPlan" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={Add} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">{language == "en" ? "Join Club" : "Club'a katıl"}</p>
                            </a>
                    </div>
                    <div className="flex flex-col mb-5">
                            <a href="#" className="flex items-center gap-2 cursor-pointer" target="_blank">
                                <img src={Money} className="w-[35px]" alt="Instagram Logo" />
                                <p className="text-amber-500 inter-500 text-xl">{language == "en" ? "Some OFM Sales" : "Bazı OFM satışları"}</p>
                            </a>
                    </div>
                </div>
          </div>
        </>
    )
}

export default Footer