import React, { useEffect, useRef, useState } from "react";
import "../../css/MyLife.css";
import saatlerImg from "../../images/Saatler.jpeg"
import Araba1 from "../../images/WAraba.jpeg"
import Araba2 from "../../images/WAraba2.jpeg"
import Girl from "../../images/WGirl.jpeg"
import Photo12 from "../../images/toplu1.jpeg"
import Photo12R from "../../images/toplu1R.jpeg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    <div ref={ref} className="fade-item">
      {children}
    </div>
  );
};



const MyLife = () => {
  const images = [
    Girl,Araba2,saatlerImg,Araba1
  ];

   useEffect(() => {
    const width = window.innerWidth;
    let updatedSettings;

    if (width >= 1536) {
      updatedSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
      };
    } else if (width >= 1295) {
      updatedSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
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
        slidesToShow: 2,
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
    <div className="flex items-center  bg-fixed">
      <div className="bg-black-special py-12 flex md:flex-row flex-col justify-center items-center w-full">
        <FadeInText>
          <div className="flex flex-col md:m-0 mb-12 md:items-start items-center">
            <p className="text-white poppins-semibold text-5xl md:me-16 opacity-90">My Life</p>
            <p className="text-amber-500 text-shadow-yellow-mylife poppins-semibold text-6xl mt-4 md:me-16">with OFM</p>
          </div>
        </FadeInText>
          <div className="2xl:w-full xl:w-[700px] lg:w-[550px] md:w-[350px] w-[300px] max-w-4xl">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    className={`w-[300px] select-none h-[400px] object-cover box-shadow-yellow-spec rounded-lg shadow-lg mx-12 mx-auto ${image == Photo12 ? "object-left" : image == Photo12R ? "object-right" : ""}`}
                    alt={`Slide ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
      </div>
    </div>
  );
};

export default MyLife;
