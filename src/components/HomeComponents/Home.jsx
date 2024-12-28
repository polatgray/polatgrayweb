import React, { useCallback } from "react"
import MainPhoto from "../../images/Hottest Billionaire.jpg"
import "../../css/Home.css"
import "../../css/Main.css"
import "../../css/TextAni1.css"
import Marquee from "react-fast-marquee";
import DownIco from "../../images/si--arrow-downward-fill.svg"
import { Link } from "react-scroll";

const Home = () => {

    const handleScroll = useCallback(() => {
        const targetElement = document.getElementById("ofmIntroduction");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return(
        <>
            <div className="absolute bottom-0 flex justify-center w-full mb-7 z-10">
            <Link to="ofmIntroduction" smooth={true} duration={1000}>
                <img src={DownIco} className="w-[45px] downIcoAni " alt="Down Icon" onClick={handleScroll}/>  {/* BURAYA TIKLANDIĞI ZAMAN */}
            </Link>
            </div>
            <div className="homeWallpaper h-screen w-full bg-center bg-cover  relative select-none">
                <div className="bg-dark-solid-private h-full w-full">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center flex-col mt-12 absolute top-0 w-full sm:pt-4 pt-16">
                            <p className="inter-600  2xl:text-8xl  lg:text-6xl sm:text-5xl text-4xl mainLabel tracking-wide text-shadow-yellow animated-text">POLAT GRAY</p>
                            <p className="opacity-90 inter-500 tracking-widest-more mt-5 md:text-lg text-xs text-white helperLabel">WELCOME TO PARADISE</p>
                        </div>
                       <div className="flex justify-center items-center flex-col h-full mt-5">
                            <img src={MainPhoto} className="defaultImg object-cover 2xl:w-[800px] xl:w-[800px] lg:w-[700px] md:w-[500px] sm:w-[400px] w-[300px] box-shadow-yellow 2xl:h-[220px] xl:h-[220px] lg:h-[180px] md:h-[160px] sm:h-[120px] sm:h-[100px] h-[100px]  rounded-lg object-center" alt="Polat Gray" />
                            <div className="defaultImgLabel lg:flex hidden items-center justify-between 2xl:w-[800px] xl:w-[800px] lg:w-[700px]  mt-3">
                                <p className="opacity-90 inter-400  text-lg text-white w-1/4 text-center">B<span className="text-red-500"><strong>Ø</strong></span>SS</p>
                                <p className="inter-300 text-lg tracking-wide text-white w-1/4 text-center">OnlyFans Manager</p>
                                <p className="inter-300 text-lg tracking-wide text-white w-1/4 text-center">Playboy</p>
                                <p className="inter-300 text-lg tracking-wide text-white w-1/4 text-center">Multi Millionaire</p>
                            </div>
                            <Marquee className="specialClass defaultImgLabel">
                                <p className="opacity-90 inter-400 mx-12 text-lg text-white text-center">B<span className="text-red-500"><strong>Ø</strong></span>SS</p>
                                <p className="opacity-90 inter-300 mx-12 text-lg tracking-wide text-white text-center">OnlyFans Manager</p>
                                <p className="opacity-90 inter-300 mx-12 text-lg tracking-wide text-white text-center">Playboy</p>
                                <p className="opacity-90 inter-300 mx-12 text-lg tracking-wide text-white text-center">Multi Millionaire</p>
                            </Marquee>
                       </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home