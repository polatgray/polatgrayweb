import React,{useState,useEffect, useContext} from "react";
import MainPhoto from "../../images/Hottest Billionaire.jpg";
import Wgirl2 from "../../images/wgirl2.png";
import Photo1 from "../../images/01091339-17E0-47E3-BD6E-E36C31EDC3FD.jpeg";
import Toplu1 from "../../images/toplu1.jpeg"
import Arabali1 from "../../images/IMG_5362.jpeg"
import Marquee from "react-fast-marquee";
import DownIco from "../../images/si--arrow-downward-fill.svg";
import Img1 from "../../images/01091339-17E0-47E3-BD6E-E36C31EDC3FD.jpeg"
import Img2 from "../../images/013C0FE3-D0A7-43F8-AB47-F085FAB1B22D.jpeg"
import Img3 from "../../images/2734C695-404B-418C-A140-350FE19AFDE3.jpeg"
import Img4 from "../../images/2DC55378-84A6-463E-8462-28E493A50AFD.jpeg"
import Img5 from "../../images/3654BE09-574C-49C3-8298-E4C674549C44.jpeg"
import Img6 from "../../images/46850BCC-317B-4913-A3F0-3C520B2E8293.jpeg"
import Img7 from "../../images/50197BA6-203F-410D-8747-6B45A17FA0C0.jpeg"
import Img8 from "../../images/7AF70348-1931-47D5-BCCE-8B81B47C8FB7.jpeg"
import Img9 from "../../images/95313560-9648-4648-A259-EB7182AA65D7.jpeg"
import Img10 from "../../images/99E6056E-9A99-4F42-BF45-04B50266EDAB.jpeg"
import Img11 from "../../images/A8A00804-F2FB-4087-817C-4B7FD60F9CC3.jpeg"
import Img12 from "../../images/EDB928E1-E627-4735-A5DD-B6DD0580AD45.jpeg"
import Img13 from "../../images/IMG_5091.jpeg"
import Img14 from "../../images/IMG_5315.jpeg"
import Img15 from "../../images/IMG_5316.jpeg"
import Img16 from "../../images/IMG_5317.jpeg"
import Img17 from "../../images/IMG_5336.jpeg"
import WBack1 from "../../images/Wback1.jpeg"
import WBack2 from "../../images/WBack2.jpeg"
import WBack3 from "../../images/WBack3.jpeg"
import WBack4 from "../../images/Wback4.jpg"
import WBack5 from "../../images/wback5.jpg"
import WGirl2 from "../../images/wgirl2.png"
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../Context/LanguageContext";

const HomeV3 = () => {

  const {language} = useContext(LanguageContext);

  const navigate = useNavigate();

const FadeTransition = ({ images, duration = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
          setFade(true);
        }, 500); // Fade out süresi
      }, duration);
  
      return () => clearInterval(interval);
    }, [images.length, duration]);
  
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: "100%",
              objectFit: 'cover',
              opacity: currentIndex === index && fade ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              objectPosition: index == 1 ? "left" : index == 2 ? "50% 40%" : ""
            }}
          />
        ))}
      </div>
    );
  };
  const images = [MainPhoto, Toplu1, Arabali1, Wgirl2 ]; // Resimlerin listesi

    return(
        <>
            <div className="relative min-h-screen">
            <div className="flex lg:flex-row flex-col relative lg:min-h-screen">
                <div className="lg:w-1/3 lg:h-auto h-[250px] inner-left-shadow-spec">
                    <FadeTransition images={images} duration={4000} />
                </div>
                    <div className="flex flex-col lg:w-2/3 w-full lg:relative absolute lg:mt-0 mt-28">
                        <div className="flex flex-col items-center w-full pt-11 lg:relative relative">
                            <p className="inter-600 2xl:text-8xl lg:text-6xl sm:text-5xl text-4xl mainLabel tracking-wide text-shadow-yellow animated-text z-10">
                                POLAT GRAY
                            </p>
                            <p className="opacity-90 inter-500  mt-5 md:text-lg tracking-wide text-sm text-white helperLabel text-center z-10">
                            {language === "en" 
                              ? (
                                  <>
                                    Owner of the Biggest <span className="animated-text">Onlyfans Agency</span> in the World
                                  </>
                                ) 
                              : (
                                  <>
                                    Dünyanın En Büyük <span className="animated-text">Onlyfans Ajansı</span>'nın Sahibi
                                  </>
                                )}

                            </p>
                        </div>
                        <div className="flex flex-col items-center lg:mt-12">
                        <div className="flex flex-col mt-5 z-10 relative  w-full select-none">
                <div className="flex">
                    <div className="flex flex-col xl:items-start items-center  lg:ps-12 sm:px-0  h-[330px] lg:h-[350px] z-10 relative bg-transparent-black-special  2xl:w-auto w-full ">
                        <p className="lg:w-full md:w-[500px] text-white inter-500 spec-text-rem-1 md:px-0 px-2 lg:pe-24 mt-6 lg:text-start text-center ">
                          {language == "en" ? 
                          <>
                             In 2025, all the business models are dead. <br /> Ecom, dropshipping, SMMA, crypto  doesn't work anymore. The only business model that can make you filthy rich is OnlyFans management. But in order to start, you need a good team and mentor to show you, otherwise you will learn by your mistakes instead of learning from others to move 100x faster.
                          </>
                          :
                            <>
                              2025 yılında tüm iş modelleri öldü.<br /> E-ticaret, dropshipping, SMMA, kripto artık işe yaramıyor. Seni gerçekten zengin edebilecek tek iş modeli OnlyFans menajerliği. Ancak başlamak için iyi bir ekip ve sana yol gösterecek bir mentor gerekiyor, aksi takdirde başkalarından öğrenip 100 kat daha hızlı ilerlemek yerine, hatalarından ders alarak öğrenmek zorunda kalırsın.
                            </>
                          }
                        </p>
                    </div>
                    <div className="absolute z-0 ani2 w-full backdrop-blur-lg h-[320px]">
                        <Marquee loop={0}>
                            <img src={Img12} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img1} className="w-[350px] h-[300px] object-cover rounded-xl mx-4 " style={{objectPosition: "50% 65%"}} loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img7} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img5} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img16} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img10} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img13} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img4} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img15} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img3} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img8} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img6} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={Img14} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={WBack1} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={WBack2} className="w-[350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={WBack3} className="w-[250px] h-[300px] object-cover spec-object-position rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />
                            <img src={WGirl2} className="w-[z350px] h-[300px] object-cover rounded-xl mx-4" loading="lazy" alt="Polat Gray Photos" />                            
                        </Marquee>
                    </div>
                </div>
                </div>
                            <div className="flex flex-col items-center pb-6">
                              <p className="sm:text-3xl text-2xl inter-500 text-white mb-2">{language == "en" ? "Click Here to Change Your Life" : "Hayatını değiştirmek için tıkla"}</p>
                              <img
                                src={DownIco}
                                className="w-[45px] downIcoAni lg:mt-8 "
                                alt="Down Icon"
                              />
                                <button className="inter-500 text-2xl px-spec-1 py-3 bg-amber-500 rounded-lg mt-2 text-white" onClick={() => navigate("/checkPlan")}>{language == "en" ? "Join Millionaires Club" : "Milyonerler Club'ına katıl"}</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        </> 
    )
}

export default HomeV3