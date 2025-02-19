import React, { useEffect, useRef, useContext } from "react";
import "../../css/JoinNow.css";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../Context/LanguageContext";

// Fade-in bileşeni
const FadeInItem = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      },
      { threshold: 0.1 }
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

const JoinNow = () => {

  const {language} = useContext(LanguageContext)

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-black py-16 select-none">
      {/* Animasyonlu öğeler */}
      <FadeInItem>
        <p className="text-white text-4xl inter-600">{language == "en" ? "Join Now" : "Hemen Katıl:"}</p>
      </FadeInItem>
      <FadeInItem>
        <p className="text-shadow-yellow-spec text-amber-500 poppins-bold inter-70 mt-5 text-6xl">
          {language == "en" ? "Learn OFM" : "OFM Öğren"}
        </p>
      </FadeInItem>
      <FadeInItem>
        <p className="inter-400 text-white w-[300px] sm:w-[400px] text-center my-5">{language == "en" ? "OFM is the best Business Model in 2025-2026. You get to work with creative content creators, help them grow, and earn commissions—it's both easy and highly profitable!" : "Bir OFM (OnlyFans Menajeri) olmak, hızlı bir şekilde büyük paralar kazanmanın harika bir yoludur! Yaratıcı içerik üreticileriyle çalışır, onların büyümesine yardımcı olur ve komisyon kazanırsınız—hem kolay hem de son derece kârlıdır!"}</p>
      </FadeInItem>
      <FadeInItem>
        <div className="flex flex-col items-center gap-3">
          <button className="inter-500 border-amber-500-spec border rounded-lg  py-3 px-12 text-amber-500 transition-all duration-300 hover:text-white hover:bg-amber-500 hover:scale-105" onClick={() => navigate("/CheckPlan")}>  
            {language == "en" ? "Join Millionaires Club" : "Milyonerler Club'ına katıl"}
          </button>
          <button className="inter-500 border-amber-500-spec border rounded-lg  py-3 px-12 text-amber-500 transition-all duration-300 hover:text-white hover:bg-amber-500 hover:scale-105" onClick={() => {navigate("/learnAboutOFM"); window.scrollTo(0,0)}}>
            {language == "en" ? "Learn about OFM" : "OFM Hakkında"}
          </button>
        </div>
      </FadeInItem>
    </div>
  );
};

export default JoinNow;
