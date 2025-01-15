import React, { useEffect, useRef, useState } from "react";
import "../../css/OFMIntroduction.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Profit1 from "../../images/video2.jpg"

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
                  <div className="flex flex-col xl:items-start items-center">
                    <FadeInText>
                      <span className="text-white inter-500 text-4xl  sm:text-6xl sm:ms-12">
                        Your dream?{" "} <br className="lg:hidden"/>
                        <span className="text-amber-500 text-shadow-yellow inter-600">
                          I live your dream
                        </span>
                      </span>
                    </FadeInText>
                    <FadeInText>
                      <span className="md:ps-12 md:w-[700px] sm:w-[500px] w-[320px] mt-12 block text-white inter-600 xl:text-start text-center">
                        "Yes, I’m living the life you can only dream of. I travel the
                        world, experience the finest cultures, and surround myself with
                        extraordinary people. I spend my days in the company of sexy,
                        amazing women, laughing with my close friends, and dining in
                        the most luxurious restaurants imaginable. Every moment of my
                        life is filled with pleasure. The best watches on my wrist, the
                        most luxurious cars under me—this is my reality."
                      </span>
                    </FadeInText>
                  </div>

                  {/* İkinci Kısım */}
                  <div className="flex flex-col xl:mt-52 sm:mt-32 mt-24 xl:items-start items-center">
                    <FadeInText>
                      <span className="text-white inter-500 text-4xl sm:text-6xl sm:ms-12">
                        So,
                        <span className="text-amber-500 text-shadow-yellow inter-600">
                          Why can't you?
                        </span>
                      </span>
                    </FadeInText>
                    {/* <FadeInText>
                      <span className="md:ps-12 md:w-[700px] sm:w-[500px] w-[320px] mt-12 text-white block inter-600 xl:text-start text-center">
                        "Yes, while I was doing all this and reaching where I am today,
                        it certainly wasn’t easy.
                        <span className="text-amber-500"> I’m an OnlyFans manager, </span>
                        I do my job in the best way possible, and I give it everything
                        it deserves.
                        <span className="text-amber-500">
                          {" "}
                          This job is both easy and incredibly profitable. So, why don’t
                          you give it a try?"
                        </span>
                      </span>
                    </FadeInText> */}
                  </div>
              </div>
              <div className="xl:me-32">
                <Slider {...settings}>
                  <video className="w-[300px] rounded-lg" autoPlay muted loop loading="lazy">
                      <source src="/videos/video1.mp4"  type="video/mp4"/>
                      Your browser does not support the video tag.
                  </video>
                  <img src={Profit1} className="w-[300px] rounded-lg" alt="" />
                </Slider>
              </div>   
          </div>
        </div>
      </div>
    </div>
  );
};

export default OFMIntroduction;
