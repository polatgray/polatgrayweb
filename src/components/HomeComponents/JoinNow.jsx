import React, { useEffect, useRef } from "react";
import "../../css/JoinNow.css";

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
  return (
    <div className="flex flex-col items-center bg-black py-16 select-none">
      {/* Animasyonlu öğeler */}
      <FadeInItem>
        <p className="text-white text-4xl inter-600">Join now:</p>
      </FadeInItem>
      <FadeInItem>
        <p className="text-shadow-yellow-spec text-amber-500 poppins-bold inter-70 mt-5 text-6xl">
          Learn OFM
        </p>
      </FadeInItem>
      <FadeInItem>
        <p className="inter-400 text-white w-[300px] sm:w-[400px] text-center my-5">Being an OFM (OnlyFans Manager) is an amazing way to earn big money quickly! You get to work with creative content creators, help them grow, and earn commissions—it's both easy and highly profitable!</p>
      </FadeInItem>
      <FadeInItem>
        <button className="inter-500 border-amber-500-spec border rounded-lg  py-3 px-12 text-amber-500 transition-all duration-300 hover:text-white hover:bg-amber-500 hover:scale-105">
          Join Now
        </button>
      </FadeInItem>
    </div>
  );
};

export default JoinNow;
