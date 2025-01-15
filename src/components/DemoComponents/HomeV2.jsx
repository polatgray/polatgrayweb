import DownIco from "../../images/si--arrow-downward-fill.svg";


const HomeV2 = () => {
    return(
        <>
        <div className="relative min-h-[980px]">
            <div className="flex lg:flex-row flex-col relative">
                <div className="lg:w-1/3 w-full max-h-screen bg-right lg:h-screen h-[250px] bg-cover inner-left-shadow-spec arabaPhoto1">
                </div>
                    <div className="flex flex-col lg:w-2/3 w-full lg:relative absolute lg:mt-0 mt-28">
                        <div className="flex flex-col items-center w-full pt-11 lg:relative relative">
                            <p className="inter-600 2xl:text-8xl lg:text-6xl sm:text-5xl text-4xl mainLabel tracking-wide text-shadow-yellow animated-text ">
                                POLAT GRAY
                            </p>
                            <p className="opacity-90 inter-500  mt-5 md:text-lg tracking-wide text-sm text-white helperLabel">
                                Owner of the Biggest  <span className="animated-text">Onlyfans Agency</span> in the World
                            </p>
                        </div>
                        <div className="flex flex-col items-center lg:mt-36 mt-10">
                            <p className="lg:w-[600px] w-[320px] inter-500 lg:text-lg text-sm text-white">Other business models? Rotten tales of the past! In today’s world, true success comes from mastering the trends. OnlyFans management is the golden ticket to breaking free from mediocrity and printing money with a visionary mindset. Visionaries like me see the opportunity while others just dream. If you want to walk this path, stop with the empty talk and join the league of those who know how to win. Because I crack the code and made multi multi millions of dollar. I have 2000 different girls working for me and this girls are not your regular town girls all of them are supermodels famous girls and this girls making me so much money that I’m able to turn all of my dreams into reality.</p>
                            <img
                                src={DownIco}
                                className="w-[45px] downIcoAni lg:mt-24 mt-12"
                                alt="Down Icon"
                            />
                            <div className="flex flex-col items-center">
                                <p className="text-xl inter-500 text-white mb-2">What are you waiting?</p>
                                <button className="inter-500 text-2xl px-12 py-3 bg-amber-500 rounded-lg mt-2 text-white"></button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

        </>
    )
}

export default HomeV2