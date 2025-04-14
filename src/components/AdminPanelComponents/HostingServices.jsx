import { useState } from "react";
import Host from "../../images/host.svg"

const HostingServices = () => {
    
      const [responseTime,setResponseTime] = useState(null);

      const measureResponseTime = async () => {
        const start = performance.now(); 
        try {
          const response = await fetch('https://httpbin.org/get');
          const end = performance.now(); 
          const duration = end - start; 
          console.log(`API yanıt süresi: ${duration.toFixed(2)} ms`);
          setResponseTime(duration.toFixed(2))  
          const data = await response.json();
        } catch (error) {
          console.error('Hata oluştu:', error);
        }
      };


    return(
        <>
            <div className="flex flex-col items-center mt-12">
                <div className="flex flex-col">
                    <div className="advanced-card w-[300px]!">
                        <div className="card-icon">
                            <img src={Host} className="w-[35px]" alt="Early Access Icon" />
                        </div>
                        <div className="card-content">
                            <h3>Sunucu Hızı:</h3>
                            <p className={`${responseTime ? "block" : "hidden"}`}>{responseTime} ms</p>
                        </div>
                    </div>
                    <button className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 rounded-lg px-4 py-2 text-white inter-500 mt-4" onClick={() => measureResponseTime()}>Test et</button>
                </div>
            </div>
        </>
    )
}

export default HostingServices