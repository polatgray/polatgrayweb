import React, { useEffect, useRef, useState, useContext } from "react";
import "../../css/OFMIntroduction.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Profit1 from "../../images/video2.jpg"
import { LanguageContext } from "../../Context/LanguageContext";

const FadeInText = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      },
      { threshold: 0.1 } // Görünürlüğün %10'u yeterli
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <p ref={ref} className="fade-item">
      {children}
    </p>
  );
};



const OFMIntroduction = () => {

  const {language} = useContext(LanguageContext)

  useEffect(() => {
    const width = window.innerWidth;
    let updatedSettings;

    if (width >= 1536) {
      updatedSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
      };
    } else if (width >= 1295) {
      updatedSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
      };
    }  
    else if (width >= 1024) {
      updatedSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
      };
    } else if (width >= 768) {
      updatedSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
      };
    } else {
      updatedSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
      };
    }

    setSettings(updatedSettings);
  }, []);

  const [settings, setSettings] = useState({});

  return (
    <div className="w-full bg-black   select-none" id="ofmIntroduction">
      <div className="bg-black bg-fixed flex items-center">
        <div className="bg-semiblack h-full w-full flex items-center justify-center py-12">
          <div className="flex  xl:flex-row flex-col xl:gap-0 gap-12 justify-between items-center w-[1600px] classCheck1">
              <div className="flex flex-col">
                {/* İlk Kısım */}
                  <div className="flex flex-col xl:items-start items-center mt-spec-1">
                    <FadeInText>
                      <span className="text-white inter-500 text-4xl  sm:text-6xl sm:ms-12">
                          {language == "en" ? <span>Who is <span className="animated-text">Polat Gray?</span></span> : <span className="animated-text">Polat Gray <span className="text-white bg-transparent">kimdir?</span></span>}
                      </span>
                    </FadeInText>
                    <FadeInText>
                      <span className="md:ps-12 md:w-[700px] sm:w-[500px] w-[320px] mt-12 block text-white inter-600 xl:text-start text-center">
                         {language == "en" ? <>
                            Polat Gray is the owner of Lostboy, one of the largest OnlyFans agencies in the world, and the man who introduced OnlyFans management to the world in 2021. A true visionary, he recognized the growing impact of digital platforms and paved the way for content creators to manage their careers professionally. His name is synonymous with OnlyFans management, leaving a legacy that will be talked about for years to come.
                         </> :
                          <>
                            Polat Gray, OnlyFans dünyasının en büyük ajanslarından biri olan Lostboy'un sahibi ve aynı zamanda 2021 yılında OnlyFans yönetimi konseptini dünyaya tanıtan öncü isim. Hem dijital platformların büyüyen etkisini fark eden, hem de içerik üreticilerinin kariyerlerini profesyonel bir şekilde yönetme yolunu açan vizyoner bir lider. Onun adı, OnlyFans menajerliği ile eşleşiyor ve bu alandaki etkisi yıllar boyu konuşulacak bir miras bırakıyor.
                          </>
                         }
                      </span>
                    </FadeInText>
                  </div>

                  {/* İkinci Kısım */}
                  {/* <div className="flex flex-col xl:mt-52 sm:mt-32 mt-24 xl:items-start items-center">
                    <FadeInText>
                      <span className="text-white inter-500 text-4xl sm:text-6xl sm:ms-12">
                        So,
                        <span className="text-amber-500 text-shadow-yellow inter-600">
                          Why can't you?
                        </span>
                      </span>
                    </FadeInText>
                    <FadeInText>
                      <span className="md:ps-12 md:w-[700px] sm:w-[500px] w-[320px] mt-12 text-white block inter-600 xl:text-start text-center">
                      "In 2025, all the traditional business models are dead. E-commerce, dropshipping, SMMA, and crypto no longer work. The only business model that can make you filthy rich is OnlyFans management. However, to start, you need a good team and a mentor to guide you. Without this, you'll end up learning through your own mistakes, while with proper guidance, you can learn from others and move 100x faster.
                      </span>
                    </FadeInText>
                  </div> */}
              </div>
              {/* <div className="xl:me-32">
                <Slider {...settings}>
                  <video className="w-[300px] rounded-lg" autoPlay muted loop loading="lazy">
                      <source src="/videos/video1.mp4"  type="video/mp4"/>
                      Your browser does not support the video tag.
                  </video>
                  <img src={Profit1} className="w-[300px] rounded-lg" alt="" />
                </Slider>
              </div>    */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OFMIntroduction;
