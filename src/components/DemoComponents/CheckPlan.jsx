import { useNavigate } from "react-router-dom"
import "../../css/CheckPlan.css"

const CheckPlan = () => {

    const navigate = useNavigate();

    return(
        <>
            <div className="flex flex-wrap items-center justify-center h-screen">
                <div className="flex flex-col border border-amber-400 items-center rounded-lg w-[300px] sm:w-[350px]">
                    <p className="inter-600 text-3xl sm:text-5xl text-white bg-amber-400 w-full text-center rounded-lg p-4 py-2">OFM PDF</p>
                    <div className="flex flex-col my-5 gap-3">
                        <p className="inter-500 text-white px-5 text-xl text-center">Polat Gray PDF paketi</p>
                        <p className="inter-500 text-white px-5  text-center">Başlangıç için bire bir</p>
                        <p className="inter-500 text-white px-5  text-center">Zengin ve derinlemesine içerik</p>
                        <p className="inter-500 text-white px-5  text-center">Kapsamlı rehberlik ve ipuçları</p>
                        <p className="inter-500 text-white px-5  text-center">OnlyFans yönetiminde başarı için temel stratejiler</p>
                        <p className="inter-500 text-white px-5  text-center">Fan etkileşimi ve içerik optimizasyonu</p>
                        <p className="inter-500 text-white px-5  text-center">Gelir artırma yöntemleri ve pazarlama taktikleri</p>
                        <p className="inter-500 text-white px-5  text-center">Profesyonel menajerlik teknikleri</p>
                        <p className="inter-500 text-white px-5  text-center">Bonus materyaller ve özel ders videoları</p>
                        <div className="price-tag">
                            <p className="line-1 text-white old-price">14999 TL</p>
                            <p className="text-white text-3xl sm:text-5xl inter-600">4999TL</p>
                        </div>
                        <button className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 inter-500 text-white px-4 py-2 rounded-lg text-2xl mx-4 outline-0" onClick={() => navigate("/CheckOut?package=1")}>Satın al</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckPlan

