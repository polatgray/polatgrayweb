import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import Modal from 'react-modal';
import Close from "../../images/closeWhite.svg";
import "../../css/Loading.css";
import "../../css/AdminPanel.css";
import Menu from "../../images/menu.svg"
import HomeMain from "./HomeMain";
import Right from "../../images/rightAdmin.svg"
import PurchaseMain from "./PurchaseMain";
import SupportMain from "./SupportMain";
import HostingServices from "./HostingServices";
import Delete from "../../images/delete.svg"
import { deleteUser } from "firebase/auth";
import FeaturedMain from "./FeaturedMain";

const Main = ({loggedUser}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [userInstagram, setUserInstagram] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userJoinedAt, setUserJoinedAt] = useState("");
    const [userConvertedDate, setConvertedDate] = useState("");
    const [userMail,setUserMail] = useState("");
    const [keepMoney, setKeepMoney] = useState("");
    const [menuBar,setMenuBar] = useState(false);
    const [purchaseTriggerState,setPurchaseTriggerState] = useState(0);
    const [supportTriggerState,setSupportTriggerState] = useState(0);
    const [clickedValueInner,setClickedValueInner] = useState("");
    const [percentageState,setPercentageState] = useState("NO-DATA");
    const [filterState,setFilterState] = useState("no-select");
    const [filterData,setFilterData] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [phoneResetKeyState,setPhoneResetKeyState] = useState("");


    //ARTICLE

    const [homeMain,setHomeMain] = useState(true);
    const [earlyAccess,setEarlyAccess] = useState(false);
    const [purchaseMainState,setPurchaseMainState] = useState(false);
    const [supportMainState,setSupportMainState] = useState(false);
    const [hostingMainState,setHostingMainState] = useState(false);
    const [featuredMainState,setFeaturedMainState] = useState(false);


    useEffect(() => {
        fetchEarlyAccessUsers();
    }, []);

    useEffect(() => {
        if (userJoinedAt !== "") {
            const date = new Date(userJoinedAt);
            const formattedDate = new Intl.DateTimeFormat('tr-TR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date);
            setConvertedDate(formattedDate);
        }
    }, [userJoinedAt]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const fetchEarlyAccessUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "earlyAccessUsers"));
            const usersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersList);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Veriler çekilirken bir sorun oluştu, lütfen geliştirici ile iletişime geçin");
        }
    };

    const calculatePercentageDistribution = (usersList) => {
        if (!usersList || usersList.length === 0) {
            return [{ range: "Veri Yok", percentage: "0%" }];
        }
    
        const totalUsers = usersList.length;
    
        const distribution = usersList.reduce((acc, user) => {
            const value = user.moneyKeep?.value;
            if (value) {
                acc[value] = (acc[value] || 0) + 1;
            }
            return acc;
        }, {});


    
        const percentages = Object.keys(distribution).map((key) => ({
            range: key,
            percentage: ((distribution[key] / totalUsers) * 100).toFixed(2) + '%',
        }));
    
        // Eğer hiç oran hesaplanmamışsa %0 ekle
        return percentages.length > 0 
            ? percentages 
            : [{ range: "Veri Yok", percentage: "0%" }];
    };

    const deleteUser = async (userId) => {
        toast.loading("Yükleniyor...")
        try {
            await deleteDoc(doc(db, "earlyAccessUsers", userId));
            toast.dismiss();
            toast.success("Kullanıcı başarıyla silindi.");
            fetchEarlyAccessUsers();
        } catch (error) {
            console.error("Kullanıcı silinirken hata oluştu: ", error);
            toast.dismiss();
            toast.error("Kullanıcı silinirken bir sorun oluştu, lütfen geliştirici ile iletişime geçin.");
        }
    }
    
    
    useEffect(() => {
        const percentageSend = calculatePercentageDistribution(users);
        setPercentageState(percentageSend);
    }, [users])

    const handleCheckboxChange = async (userId, isChecked) => {
        try {
            const userRef = doc(db, "earlyAccessUsers", userId);
            await updateDoc(userRef, {
                isChecked: !isChecked,
            });
            fetchEarlyAccessUsers(); // Verileri yeniden çek
        } catch (error) {
            console.error("Checkbox durumu güncellenirken hata oluştu: ", error);
        }
    };

    useEffect(() => {
        if (!users || users.length === 0) return;
        
        const filteredUsers = users.filter(user => {
            const moneyValue = user.moneyKeep?.value || ""; // Eğer moneyKeep yoksa boş string döndür
            switch (filterState) {
                case "1-5": return moneyValue === "1-5";
                case "5-10": return moneyValue === "5-10"; //new
                case "5-30": return moneyValue === "5-30";
                case "10-30": return moneyValue === "10-30"; //NEW
                case "30-100": return moneyValue === "30-100";
                case "100-500": return moneyValue === "100-500"; //NEW
                case "100-1m": return moneyValue === "100-1m";
                case "500-1m": return moneyValue === "500-1m"; //NEW
                case "over1m": return moneyValue === "over1m";
                default: return true; // Tüm kullanıcıları göster
            }
        });
        
        setFilterData(filteredUsers);
    }, [users, filterState]);
    

    useEffect(() => {
        if(clickedValueInner == "earlyAccess"){
            setHomeMain(false); setEarlyAccess(true); setSupportMainState(false); setPurchaseMainState(false); setMenuBar(false); setHostingMainState(false)
        }
        else if(clickedValueInner == "support"){
            setHomeMain(false); setEarlyAccess(false); setSupportTriggerState(supportTriggerState + 1); setPurchaseMainState(false); setMenuBar(false); setSupportMainState(true); setHostingMainState(false)
        }
        else if(clickedValueInner == "purchase"){
            setPurchaseTriggerState(purchaseTriggerState + 1); setHomeMain(false); setEarlyAccess(false); setPurchaseMainState(true); setMenuBar(false); setHostingMainState(false)
        }
        else if(clickedValueInner == "featuredUsers"){
            setFeaturedMainState(true);setHomeMain(false); setEarlyAccess(false); setSupportMainState(false); setPurchaseMainState(false); setMenuBar(false); setHostingMainState(false)

        }
    }, [clickedValueInner])

    return (
        <>
            <div className={`h-screen w-full transition-all duration-300   fixed ${menuBar ? "block bg-black-special-admin" : "hidden bg-transparent"}`}>
                <div className="bg-neutral-900 w-full sm:w-1/2 lg:w-1/3 h-screen fixed end-0 offcanvasAni">
                    <div className="flex flex-col ps-5">
                        <div className="flex justify-end">
                            <img src={Close} className="w-[55px] pe-3 pt-3" onClick={() => setMenuBar(!menuBar)} alt="Close" />
                        </div>
                        <div className="flex flex-col mt-5 gap-8">
                            <div className="flex items-center cursor-pointer" onClick={() => {setHomeMain(true); setEarlyAccess(false); setSupportMainState(false); setPurchaseMainState(false); setMenuBar(false); setHostingMainState(false)}}>
                                <img src={Right} className="w-[40px]" alt="Right" />
                                <p className="text-white inter-500 text-2xl">Anasayfa</p>
                            </div>
                            <div className="flex items-center cursor-pointer" onClick={() => {setHomeMain(false); setEarlyAccess(true); setSupportMainState(false); setPurchaseMainState(false); setMenuBar(false); setHostingMainState(false)}}>
                                <img src={Right} className="w-[40px]" alt="Right" />
                                <p className="text-white inter-500 text-2xl">Erken Erişim Üyeleri</p>
                            </div>
                            <div className="flex items-center cursor-pointer" onClick={() => {setPurchaseTriggerState(purchaseTriggerState + 1); setHomeMain(false); setEarlyAccess(false); setPurchaseMainState(true); setMenuBar(false); setHostingMainState(false)}}>
                                <img src={Right} className="w-[40px]" alt="Right" />
                                <p className="text-white inter-500 text-2xl">Satın Alım Üyeleri</p>
                            </div>
                            <div className="flex items-center cursor-pointer" onClick={() => {setHomeMain(false); setEarlyAccess(false); setSupportTriggerState(supportTriggerState + 1); setPurchaseMainState(false); setMenuBar(false); setSupportMainState(true); setHostingMainState(false)}}>
                                <img src={Right} className="w-[40px]" alt="Right" />
                                <p className="text-white inter-500 text-2xl">Destek Biletleri</p>
                            </div>
                            <div className="flex items-center cursor-pointer" onClick={() => {setHomeMain(false); setEarlyAccess(false); setSupportMainState(false); setPurchaseMainState(false); setMenuBar(false); setHostingMainState(true)}}>
                                <img src={Right} className="w-[40px]" alt="Right"/>
                                <p className="text-white inter-500 text-2xl">Sunucu işlemleri</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal style={customStyles} isOpen={modalOpen}>
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <img src={Close} alt="Close Button" className="w-[45px]" onClick={() => setModalOpen(!modalOpen)} />
                    </div>
                    <div className="flex flex-col">
                        <p className="inter-400 text-white">ID: <span className="inter-700"> {userId}</span></p>
                        <p className="inter-400 text-white">Kullanıcı Adı: <span className="inter-700"> {username}</span></p>
                        <p className="inter-400 text-white">Instagram: <span className="inter-700"> {userInstagram}</span></p>
                        <p className="inter-400 text-white">E-Posta: <span className="inter-700"> {userMail}</span></p>
                        <p className="inter-400 text-white">phoneResetKey: <span className="inter-700"> {phoneResetKeyState}</span></p>
                        <p className="inter-400 text-white">Telefon Numarası: <span className="inter-700"> {userPhone}</span></p>
                        <p className="inter-400 text-white">
                            Şu kadar parasını ayırabilir:{" "}
                            <span className="inter-700">
                                {keepMoney ? `${keepMoney.label}` : "Veri henüz kaydedilmedi"}
                            </span>
                        </p>
                        <p className="inter-400 text-white">{userConvertedDate}'de katıldı.</p>
                    </div>
                </div>
            </Modal>
            <div className="flex justify-between px-4 pt-3">
                <p className="animated-text text-3xl sm:text-7xl">PG</p>
                <img src={Menu} className="w-[40px] sm:w-[60px]" onClick={() => setMenuBar(!menuBar)} alt="Menu" />
            </div>
            
            {homeMain ? 
            <>
                <HomeMain loggedUserInner={loggedUser} clickedValueOuter={setClickedValueInner}/>
            </> : ""}
            {earlyAccess ? <div className="flex flex-col p-5 w-full items-center">
                <p className="inter-600 text-white text-4xl text-2xl sm:text-start text-center mb-5">Erken erişim üyeleri</p>
                <div className="flex items-center gap-4 sm:w-[600px] w-[330px] overflow-auto py-5 yellowScroll">
                    <div className="advanced-card" onClick={() => setFilterState("1-5")}>
                        <div>
                            
                            {/* <img src={EarlyAccess} className="w-[35px]" alt="Early Access Icon" /> */}
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">1-5K</p>
                            {/* <p>{earlyAccessCount}</p> */}
                        </div>
                    </div>
                    <div className="advanced-card" onClick={() => setFilterState("5-10")}>
                        <div>
                            
                            {/* <img src={EarlyAccess} className="w-[35px]" alt="Early Access Icon" /> */}
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">5K-10K</p>
                            {/* <p>{earlyAccessCount}</p> */}
                        </div>
                    </div>
                    <div className="advanced-card" onClick={() => setFilterState("5-30")}>
                        <div>
                            
                            {/* <img src={EarlyAccess} className="w-[35px]" alt="Early Access Icon" /> */}
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">5K-30K</p>
                            {/* <p>{earlyAccessCount}</p> */}
                        </div>
                    </div>
                    <div className="advanced-card" onClick={() => setFilterState("10-30")}>
                        <div>
                            
                            {/* <img src={EarlyAccess} className="w-[35px]" alt="Early Access Icon" /> */}
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">10K-30K</p>
                            {/* <p>{earlyAccessCount}</p> */}
                        </div>
                    </div>
                    <div className="advanced-card" onClick={() => setFilterState("30-100")}>
                        <div>
                           
                            {/* <img src={EarlyAccess} className="w-[35px]" alt="Early Access Icon" /> */}
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">30K-100K</p>
                            {/* <p>{earlyAccessCount}</p> */}
                        </div>
                    </div>
                    <div className="advanced-card" onClick={() => setFilterState("100-500")}>
                        <div>
                            
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">100K-500K</p>
                        </div>
                    </div>
                    <div className="advanced-card" onClick={() => setFilterState("100-1m")}>
                        <div>
                            
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">100K-1M</p>
                        </div>
                    </div>
                    <div className="advanced-card" onClick={() => setFilterState("500-1m")}>
                        <div>
                            
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">500K-1M</p>
                        </div>
                    </div>
                  
                    <div className="advanced-card" onClick={() => setFilterState("over1m")}>
                        <div>
                            {/* {percentageState && percentageState[5] ? 
                                <p className="text-amber-500 inter-600">
                                    {percentageState[8].percentage}
                                </p>
                             : 
                                <p className="text-amber-500 inter-600">0%</p>  
                            } */}
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">Over 1M</p>
                        </div>
                    </div>
                    <div className="advanced-card" onClick={() => setFilterState("no-select")}>
                        <div>
                            {percentageState != "NO-DATA" ? 
                            <>
                            
                            </> : <></>}
                            {/* <img src={EarlyAccess} className="w-[35px]" alt="Early Access Icon" /> */}
                        </div>
                        <div className="card-content">
                            <p className="text-white inter-600 text-xs">Temizle</p>
                            {/* <p>{earlyAccessCount}</p> */}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-6">
                    <div>

                    </div>
                    <div className="flex flex-col gap-4 mt-5 items-center sm:w-[600px] w-[330px] h-spec-admin yellowScroll overflow-auto">
                        <input type="text" placeholder="İsim ara..." className="mb-4 p-2 rounded-lg border border-amber-500 bg-transparent text-white outline-none w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        {loading ? (
                            <div className="loader"></div>
                        ) : filterState === "no-select" ? (
                            users && users.length > 0 ? (
                                users
                                .sort((a, b) => (b.subscribedAt || 0) - (a.subscribedAt || 0))
                                .filter((user) => 
                                    user.name && 
                                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((user) => (
                                        <div className="flex border border-amber-600 rounded-lg justify-between px-5 items-center w-full select-none" key={user.id}>
                                            <p className="my-3 inter-500 text-white sm:text-xl">{user.name}</p>
                                            <div className="flex items-center gap-4">
                                                <img src={Delete} onClick={() => deleteUser(user.id)} className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-all duration-300 w-[40px]" alt="Delete" />
                                            <input
                                                    type="checkbox"
                                                    checked={user.isChecked || false}
                                                    onChange={() => handleCheckboxChange(user.id, user.isChecked)}
                                                    className="mr-2 w-[25px] h-[25px] rounded-2xl outline-0"
                                                />
                                            <button
                                                    className="bg-amber-500 py-1 rounded-lg text-white px-3 inter-500 outline-0"
                                                    onClick={() => {
                                                        setModalOpen(!modalOpen);
                                                        setUsername(user.name);
                                                        setUserId(user.id);
                                                        setUserInstagram(user.instagram);
                                                        setUserPhone(user.phone);
                                                        setUserJoinedAt(user.subscribedAt);
                                                        setKeepMoney(user.moneyKeep || "");
                                                        setUserMail(user.email)
                                                        setPhoneResetKeyState(user.phoneResetKey || "Bu kullanıcı eski, anahtar verilmedi.")
                                                    }}
                                                >
                                                    ...
                                            </button>
                                        </div>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-white">Henüz kullanıcı bulunamadı.</p>
                            )
                        ) : (
                            filterData.length > 0 ? (
                                filterData
                                    .filter((user) => 
                                        user.name && 
                                        user.name.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((user) => (
                                    <div className="flex border border-amber-600 rounded-lg justify-between px-5 items-center w-full select-none" key={user.id}>
                                        <p className="my-3 inter-500 text-white sm:text-xl">{user.name}</p>
                                        <div className="flex items-center gap-4">
                                            <img src={Delete} onClick={() => deleteUser(user.id)} className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-all duration-300 w-[40px]" alt="Delete" />
                                            <input
                                                    type="checkbox"
                                                    checked={user.isChecked || false}
                                                    onChange={() => handleCheckboxChange(user.id, user.isChecked)}
                                                    className="mr-2 w-[25px] h-[25px] rounded-2xl outline-0"
                                                />
                                            <button
                                                    className="bg-amber-500 py-1 rounded-lg text-white px-3 inter-500 outline-0"
                                                    onClick={() => {
                                                        setModalOpen(!modalOpen);
                                                        setUsername(user.name);
                                                        setUserId(user.id);
                                                        setUserInstagram(user.instagram);
                                                        setUserPhone(user.phone);
                                                        setUserJoinedAt(user.subscribedAt);
                                                        setKeepMoney(user.moneyKeep || "");
                                                        setUserMail(user.email)
                                                    }}
                                                >
                                                    ...
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white">Filtreye uyan kullanıcı yok.</p>
                            )
                        )}
                    </div>
                </div>
                
            </div> : ""}
            {purchaseMainState ? <PurchaseMain purchaseTrigger={purchaseTriggerState}/> : ""}
            {supportMainState ? <SupportMain supportTriggerInner={supportTriggerState}/> : ""}
            {featuredMainState ? <FeaturedMain /> : ""}
            {hostingMainState ? <HostingServices /> : ""} 
        </>
    );
};

export default Main;