import Slider from "react-slick";
import React, {useEffect,useState} from "react"
import Profit1 from "../../images/video2.jpg"
import "../../css/OFMSomeSales.css"

const OFMSomeSales = () => {

   
    
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

    return(
        <>
            {/* <div className="flex flex-col mt-24 items-center sliderClass2">
                <p className="inter-500 text-white text-6xl mb-12 px-12 text-center">Some sales with <span className="animated-text">OFM</span> ;)</p>
                <Slider {...settings}>
                    <video className="w-[300px] rounded-lg" autoPlay muted loop>
                        <source src="/videos/video1.mp4"  type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <img src={Profit1} className="w-[300px] rounded-lg" alt="" />
                    <video className="w-[300px] rounded-lg" autoPlay muted loop>
                        <source src="/videos/video1.mp4"  type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <img src={Profit1} className="w-[300px] rounded-lg" alt="" />
                    <video className="w-[300px] rounded-lg" autoPlay muted loop>
                        <source src="/videos/video1.mp4"  type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <img src={Profit1} className="w-[300px] rounded-lg" alt="" />
                    <video className="w-[300px] rounded-lg" autoPlay muted loop>
                        <source src="/videos/video1.mp4"  type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <img src={Profit1} className="w-[300px] rounded-lg" alt="" />
                    <video className="w-[300px] rounded-lg" autoPlay muted loop>
                        <source src="/videos/video1.mp4"  type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <img src={Profit1} className="w-[300px] rounded-lg" alt="" />
                    <video className="w-[300px] rounded-lg" autoPlay muted loop>
                        <source src="/videos/video1.mp4"  type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <img src={Profit1} className="w-[300px] rounded-lg" alt="" />
                </Slider>
            </div> */}
        </>
    )
}

export default OFMSomeSales