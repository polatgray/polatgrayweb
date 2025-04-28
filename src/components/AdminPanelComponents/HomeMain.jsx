import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import "../../css/AdminHomeMain.css"
import EarlyAccess from "../../images/earlyAccess.svg"
import Ticket from "../../images/ticket.svg"
import Wallet from "../../images/wallet.svg"
import Featured from "../../images/featured.svg"


const now = new Date();
const hours = now.getHours();

const HomeMain = ({ loggedUserInner, clickedValueOuter }) => {
  const [homeName, setHomeName] = useState("");
  const [loading,setLoading] = useState(true); 

  //Functions
  const [earlyAccessCount,setEarlyAccessCount] = useState(null);
  const [supportCount,setSupportCount] = useState(null);
  const [usersPurchasedCount,setUserPurchasedCount] = useState(null);
  const [featuredUsersCount,setFeaturedUsersCount] = useState(null);
  const [proccessLoading,setProccessLoading] = useState("0,0,0");
  const [clickedValue,setClickedValue] = useState("");

  useEffect(() => {
    if (loggedUserInner) {
      setHomeName(loggedUserInner);
    }
  }, [loggedUserInner]);

  const getGreeting = () => {
    if (hours >= 0 && hours < 6) return "İyi geceler";
    if (hours >= 6 && hours < 12) return "Günaydın";
    if (hours >= 12 && hours < 15) return "İyi öğlenler";
    if (hours >= 15 && hours < 19) return "İyi günler";
    return "İyi akşamlar";
  };
  
  const getEarlyAccessUsersCount = async () => {
    try{
        const querySnapshot = await getDocs(collection(db,"earlyAccessUsers"));
        const docCount = querySnapshot.size;
        setEarlyAccessCount(docCount);
        setProccessLoading("0,0,1")
    }
    catch(error){
        console.error("Erken erişim kullanıcıları alınırken hata", error);
    }
  }

  const getSupportCount = async () => {
    try{
        const querySnapshot = await getDocs(collection(db,"support"));
        const docCount = querySnapshot.size;
        setSupportCount(docCount);
        setProccessLoading("0,1,1")

    }
    catch(error){
        console.error("Destek kullanıcıları alınırken hata", error);
    }
  }

  const getFeaturedUsersCount = async () => {
    try{
      const querySnapshot = await getDocs(collection(db,"featuredUsers"));
      const docCount = querySnapshot.size;
      setFeaturedUsersCount(docCount);
    }
    catch(error){
      console.error("Öne çıkan kullanıcılar çekilirken hata:",error)
    }
  }

  const getUsersPurchased = async () => {
    try{
        const querySnapshot = await getDocs(collection(db,"paymentsOk"));
        const docCount = querySnapshot.size;
        setUserPurchasedCount(docCount);
        setProccessLoading("1,1,1")

    }
    catch(error){
        console.error("Satın almış kullanıcıları alırken hata", error);
    }
  }

  

  const allInOneStart = async () => {
    await getSupportCount();
    await getUsersPurchased();
    await getFeaturedUsersCount();
    await getEarlyAccessUsersCount();
    setLoading(false);
  }
  
  useEffect(() => {
    allInOneStart();
  }, [])

  useEffect(() => {
    clickedValueOuter(clickedValue)
  }, [clickedValue])

  return (
    <>
      {loading ? 
       <div className="fixed h-screen w-screen bg-black flex items-center justify-center z-10">
            <div className="w-[300px] h-[5px] rounded-lg bg-gray-800">
                <div className={`h-full transition-all rounded-lg bg-amber-500 duration-300 ${proccessLoading == "0,0,0" ? "w-[0px]" : proccessLoading == "0,0,1" ? "w-1/3" : proccessLoading == "0,1,1" ? "w-2/3" : proccessLoading == "1,1,1" ? "w-full" : "w-1/2"}`}>
                </div>
            </div>
       </div>
       :
        <div className="flex flex-col">
            <div className="flex items-center lg:justify-start justify-center px-4 mt-16">
                <p className="animated-text text-2xl sm:text-5xl py-3">{getGreeting()}{homeName && `, ${homeName == "polatgraybillionaire@gmail.com" ? "Polat Bey" : homeName == "asdkralxasd@gmail.com" ? "Ahmet" : "Kullanıcı"}`}</p>
            </div>
            <div className="flex items-center gap-4 px-4 mt-3 overflow-auto py-5 lg:flex-row flex-col flex-wrap">
                <div className="advanced-card" onClick={() => setClickedValue("earlyAccess")}>
                    <div className="card-icon">
                        <img src={EarlyAccess} className="w-[35px]" alt="Early Access Icon" />
                    </div>
                    <div className="card-content">
                        <h3>Erken erişim </h3>
                        <p>{earlyAccessCount}</p>
                    </div>
                </div>
                <div className="advanced-card" onClick={() => setClickedValue("featuredUsers")}>
                    <div className="card-icon">
                        <img src={Featured} className="w-[35px]" alt="Featured Icon" />
                    </div>
                    <div className="card-content">
                        <h3>Özel kullanıcılar</h3>
                        <p>{featuredUsersCount}</p>
                    </div>
                </div>
                <div className="advanced-card" onClick={() => setClickedValue("support")}>
                    <div className="card-icon">
                        <img src={Ticket} className="w-[35px]" alt="Early Access Icon" />
                    </div>
                    <div className="card-content">
                        <h3>Destek biletleri </h3>
                        <p>{supportCount}</p>
                    </div>
                </div>
                <div className="advanced-card" onClick={() => setClickedValue("purchase")}>
                    <div className="card-icon">
                        <img src={Wallet} className="w-[35px]" alt="Early Access Icon" />
                    </div>
                    <div className="card-content">
                        <h3>Satın Alım</h3>
                        <p>{usersPurchasedCount}</p>
                    </div>
                </div>
            </div>
        </div>
     }

    </>
  );
};

export default HomeMain;
