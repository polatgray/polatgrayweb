import HomeWallpaper from "../../images/Untouchable Boss.jpg"
import MainPhoto from "../../images/Hottest Billionaire.jpg"
import "../../css/Home.css"
import "../../css/Main.css"
import "../../css/TextAni1.css"

const Home = () => {
    return(
        <>
            <div className="homeWallpaper h-screen w-full bg-center bg-cover">
                <div className="bg-dark-solid-private h-full w-full">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center flex-col mt-12 absolute top-0 w-full">
                            <p className="inter-600  text-8xl tracking-wide text-shadow-yellow animated-text">POLAT GRAY</p>
                            <p className="opacity-90 inter-500 tracking-widest-more mt-5 text-lg text-white">WELCOME TO PARADISE</p>
                        </div>
                       <div className="flex justify-center items-center flex-col h-full mt-5">
                            <img src={MainPhoto} className="object-cover w-[800px] box-shadow-yellow h-[220px] rounded-lg object-center" alt="Polat Gray" />
                            <div className="flex items-center justify-between w-[800px] mt-3">
                                <p className="opacity-90 inter-400  text-lg text-white w-1/4 text-center">B<span className="text-red-500"><strong>Ø</strong></span>SS</p>
                                <p className="inter-300 text-lg tracking-wide text-white w-1/4 text-center">OnlyFans Manager</p>
                                <p className="inter-300 text-lg tracking-wide text-white w-1/4 text-center">Playboy</p>
                                <p className="inter-300 text-lg tracking-wide text-white w-1/4 text-center">Multi Millionaire</p>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home