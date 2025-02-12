import { useNavigate } from "react-router-dom"
import "../../css/CheckPlan.css"
import { useContext } from "react";
import {LanguageContext} from "../../Context/LanguageContext"

const CheckPlan = () => {

    const navigate = useNavigate();

    const {language} = useContext(LanguageContext)

    return(
        <>
            <div className="flex flex-wrap items-center justify-center h-screen">
                <div className="flex flex-col border border-amber-400 items-center rounded-lg w-[300px] sm:w-[350px]">
                    <p className="inter-600 text-3xl sm:text-5xl text-white bg-amber-400 w-full text-center rounded-lg p-4 py-2">OFM PDF</p>
                    <div className="flex flex-col my-5 gap-3">
                        <p className="inter-500 text-white px-5 text-xl text-center">{language == "en" ? "Polat Gray PDF Package" : "Polat Gray PDF paketi"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "One-on-one for starters" : "Başlangıç için bire bir"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Rich and in-depth content" : "Zengin ve derinlemesine içerik"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Comprehensive guidance and tips" : "Kapsamlı rehberlik ve ipuçları"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Key strategies for OnlyFans management success" : "OnlyFans yönetiminde başarı için temel stratejiler"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Fan engagement and content optimization" : "Fan etkileşimi ve içerik optimizasyonu"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Revenue boosting methods and marketing tactics" : "Gelir artırma yöntemleri ve pazarlama taktikleri"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Professional management techniques" : "Profesyonel menajerlik teknikleri"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Bonus materials and tutorial videos" : "Bonus materyaller ve özel ders videoları"}</p>
                        <div className="price-tag">
                            <p className="line-1 text-white old-price">{language == "en" ? "1500$" : "14999TL"}</p>
                            <p className="text-white text-3xl sm:text-5xl inter-600">{language == "en" ? "599$" : "5999TL"}</p>
                        </div>
                        <button className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 inter-500 text-white px-4 py-2 rounded-lg text-2xl mx-4 outline-0" onClick={() => navigate("/CheckOut?package=1")}>{language == "en" ? "Buy Now" : "Satın Al"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckPlan

