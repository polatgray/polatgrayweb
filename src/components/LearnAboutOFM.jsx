import Marquee from "react-fast-marquee";
import Img1 from "../images/01091339-17E0-47E3-BD6E-E36C31EDC3FD.jpeg"
import Img2 from "../images/013C0FE3-D0A7-43F8-AB47-F085FAB1B22D.jpeg"
import Img3 from "../images/2734C695-404B-418C-A140-350FE19AFDE3.jpeg"
import Img4 from "../images/2DC55378-84A6-463E-8462-28E493A50AFD.jpeg"
import Img5 from "../images/3654BE09-574C-49C3-8298-E4C674549C44.jpeg"
import Img6 from "../images/46850BCC-317B-4913-A3F0-3C520B2E8293.jpeg"
import Img7 from "../images/50197BA6-203F-410D-8747-6B45A17FA0C0.jpeg"
import Img8 from "../images/7AF70348-1931-47D5-BCCE-8B81B47C8FB7.jpeg"
import Img9 from "../images/95313560-9648-4648-A259-EB7182AA65D7.jpeg"
import Img10 from "../images/99E6056E-9A99-4F42-BF45-04B50266EDAB.jpeg"
import Img11 from "../images/A8A00804-F2FB-4087-817C-4B7FD60F9CC3.jpeg"
import Img12 from "../images/EDB928E1-E627-4735-A5DD-B6DD0580AD45.jpeg"
import Img13 from "../images/IMG_5091.jpeg"
import Img14 from "../images/IMG_5315.jpeg"
import Img15 from "../images/IMG_5316.jpeg"
import Img16 from "../images/IMG_5317.jpeg"
import Img17 from "../images/IMG_5336.jpeg"
import "../css/LearnAboutOFM.css"



const LearnAboutOFM = () => {
    return(
        <>
            <div className="flex flex-col mt-5 z-10 relative  w-full ">
                <div className="flex pt-12">
                    <div className="flex flex-col items-start ps-12 h-[400px] z-10 relative bg-transparent-black-special box-shadow-black-1">
                        <p className="text-5xl animate-open-text text-white inter-600"><span className="animated-text">O</span>nly<span className="animated-text">F</span>ans<span className="animated-text">M</span>anager</p>
                        <p className="w-[1200px] text-white inter-500 mt-5 ">What’s up? Have all business models died? Dropshipping, eCommerce, Crypto... Yeah, these wouldn’t have made you filthy rich, but one could’ve made you wealthy for life. With so many trends coming and going, it’s easy to get discouraged. But OFM offers a fresh perspective—a business model that might not make you a millionaire, but could give you long-term stability and freedom. Why not give it a try? It could be the change you need to transform your future.</p>
                        
                    </div>
                    <div className="absolute z-0 ani2">
                        <Marquee >
                            <img src={Img12} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img1} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img7} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img5} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img16} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img10} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img13} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img4} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img9} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img2} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img15} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img3} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img17} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img8} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img6} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />
                            <img src={Img14} className="w-[300px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="" />

                        </Marquee>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LearnAboutOFM