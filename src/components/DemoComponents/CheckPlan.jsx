import { useNavigate } from "react-router-dom"
import "../../css/CheckPlan.css"
import { useContext, useState } from "react";
import {LanguageContext} from "../../Context/LanguageContext"
import Modal from 'react-modal';
import Close from "../../images/closeWhite.svg";
import toast from "react-hot-toast";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { db } from "./../Firebase/Firebase";
import { useCookies } from "react-cookie";


const CheckPlan = () => {

  const {language} = useContext(LanguageContext);

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  const options = [
    { value: 'noSelect', label: `${language == "en" ? "How much money you have to invest?" : "Ne kadar ayırabilirsin?"}` },
    { value: '5-10', label: '5K - 10K' },
    { value: '10-30', label: '10K-30K' },
    { value: '100-500', label: '100K-500K' },
    { value: '500-1m', label: '500K - 1M' },
    { value: 'over1m', label: "Over 1 Million" }
  ];

    const countries = [
        { code: "+90", name: "Turkey", flag: "🇹🇷" },
        { code: "+1", name: "United States", flag: "🇺🇸" },
        { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
        { code: "+49", name: "Germany", flag: "🇩🇪" },
        { code: "+33", name: "France", flag: "🇫🇷" },
        { code: "+39", name: "Italy", flag: "🇮🇹" },
        { code: "+34", name: "Spain", flag: "🇪🇸" },
        { code: "+81", name: "Japan", flag: "🇯🇵" },
        { code: "+82", name: "South Korea", flag: "🇰🇷" },
        { code: "+86", name: "China", flag: "🇨🇳" },
        { code: "+91", name: "India", flag: "🇮🇳" },
        { code: "+7", name: "Russia", flag: "🇷🇺" },
        { code: "+61", name: "Australia", flag: "🇦🇺" },
        { code: "+1", name: "Canada", flag: "🇨🇦" },
        { code: "+46", name: "Sweden", flag: "🇸🇪" },
        { code: "+47", name: "Norway", flag: "🇳🇴" },
        { code: "+48", name: "Poland", flag: "🇵🇱" },
        { code: "+351", name: "Portugal", flag: "🇵🇹" },
        { code: "+41", name: "Switzerland", flag: "🇨🇭" },
        { code: "+31", name: "Netherlands", flag: "🇳🇱" },
        { code: "+32", name: "Belgium", flag: "🇧🇪" },
        { code: "+45", name: "Denmark", flag: "🇩🇰" },
        { code: "+43", name: "Austria", flag: "🇦🇹" },
        { code: "+30", name: "Greece", flag: "🇬🇷" },
        { code: "+353", name: "Ireland", flag: "🇮🇪" },
        { code: "+62", name: "Indonesia", flag: "🇮🇩" },
        { code: "+64", name: "New Zealand", flag: "🇳🇿" },
        { code: "+63", name: "Philippines", flag: "🇵🇭" },
        { code: "+52", name: "Mexico", flag: "🇲🇽" },
        { code: "+56", name: "Chile", flag: "🇨🇱" },
        { code: "+55", name: "Brazil", flag: "🇧🇷" },
        { code: "+54", name: "Argentina", flag: "🇦🇷" },
        { code: "+27", name: "South Africa", flag: "🇿🇦" },
        { code: "+20", name: "Egypt", flag: "🇪🇬" },
        { code: "+98", name: "Iran", flag: "🇮🇷" },
        { code: "+964", name: "Iraq", flag: "🇮🇶" },
        { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
        { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
        { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
        { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
        { code: "+92", name: "Pakistan", flag: "🇵🇰" },
        { code: "+356", name: "Malta", flag: "🇲🇹" },
        { code: "+357", name: "Cyprus", flag: "🇨🇾" },
        { code: "+212", name: "Morocco", flag: "🇲🇦" },
        { code: "+216", name: "Tunisia", flag: "🇹🇳" },
      ];

    const navigate = useNavigate();


    const [cookies, setCookie] = useCookies(['email']);

    const [modalOpen,setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [instagram, setInstagram] = useState("");
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [selectedCountry, setSelectedCountry] = useState(countries[0].code);

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

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const userId = crypto.randomUUID();


    const handleSelectChange = (e) => {
      const selected = options.find(option => option.value === e.target.value);
      setSelectedOption(selected);
    };
    
      const sendEnMail = async () => {
        const code = generateCode()
        const formData = {
          service_id: process.env.REACT_APP_MAILSERVICEID,
          template_id: process.env.REACT_APP_MAILTEMPLATEIDEN,
          user_id: "qAE_Wfu-u0HWDL8Cy", 
          template_params: {
              to_name: name,
              to_mail: email,
              parameter: code,
              idUserFotFeatured: userId,
              message: "Merhaba, bu bir test mesajıdır."
          }
      };
  
        try {
            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
    
            if (response.ok) {
            } else {
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
      } 

      const sendTrMail = async () => {
        const code = generateCode()
        const formData = {
            service_id: process.env.REACT_APP_MAILSERVICEID,
            template_id: process.env.REACT_APP_MAILTEMPLATEIDTR,
            user_id: "qAE_Wfu-u0HWDL8Cy", 
            template_params: {
                to_name: name,
                to_mail: email,
                parameter: code,
                idUserFotFeatured: userId,
                message: "Merhaba, bu bir test mesajıdır."
            }
        };
    
        try {
            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
    
            if (response.ok) {
            } else {
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };
    
      
      const sendEarlyAccess = async () => {
        
        if(language == "en"){
          sendEnMail();
        }
        else{
          sendTrMail();
        }
        if (!name || !email || !phone || !instagram || selectedOption.value == "noSelect") {
          toast.error(language === "en" ? "Please fill in all information" : "Lütfen tüm bilgileri doldurun");
          return;
        }
    
        if (cookies.email2) {
          toast.error(language === "en" ? "You've already have demo package!" : "Zaten deneme paketi alındı!");
          return;
        }
    
    
        try {
          toast.loading(language === "en" ? "Loading..." : "Yükleniyor...");
          const docRef = doc(collection(db, "earlyAccessUsers"), userId);
    
          await setDoc(docRef, {
            name,
            email,
            phone: `${selectedCountry} ${phone}`,
            moneyKeep: selectedOption.value === "noSelect" ? { value: '5-10', label: '5K-10K' } : selectedOption,
            instagram,
            phoneResetKey: generateCode(),
            subscribedAt: new Date().getTime(),
          });
    
          setCookie("email2", email, { path: "/", expires: new Date(9999, 12, 31) });
          toast.dismiss();
          toast.success(language === "en" ? "The trial package has been received, it will be sent to your e-mail address within a few days." : "Deneme paketi alındı, bir kaç gün içinde mail adresinize atılacak.");
    
          setName("");
          setEmail("");
          setPhone("");
          setInstagram("");
          setModalOpen(false);
        } catch (error) {
          console.error("Data Error:", error);
          toast.dismiss();
          toast.error(language === "en" ? "Unexpected error!" : "Beklenmedik bir hata oluştu!");
        }
      };

    return(
        <>  
            <Modal style={customStyles} isOpen={modalOpen}>
            <div className="flex justify-end">
            <img
              src={Close}
              alt="Close Button"
              className="w-[45px] cursor-pointer"
              onClick={() => setModalOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language === "en" ? "First Name" : "Adın"}</p>
              <input
                type="text"
                className="p-2 rounded-lg outline-none border bg-black border-amber-400 text-white"
                placeholder={language === "en" ? "First Name" : "Adınız"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language === "en" ? "E-Mail Address" : "E-Posta adresi"}</p>
              <input
                type="email"
                className="p-2 rounded-lg outline-none border bg-black border-amber-400 text-white"
                placeholder={language === "en" ? "E-Mail Address" : "E-Posta adresi"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language === "en" ? "Phone Number" : "Telefon Numaran"}</p>
              <div className="flex  flex-col gap-2">
                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="p-2 rounded-lg bg-black border border-amber-400 text-white mb-2"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="p-2 rounded-lg outline-none border bg-black border-amber-400 text-white flex-1"
                  placeholder={language === "en" ? "Phone Number" : "Telefon Numaran"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language === "en" ? "Instagram Username" : "Instagram Kullanıcı Adın"}</p>
              <input
                type="text"
                className="p-2 rounded-lg outline-none border bg-black border-amber-400 text-white"
                placeholder={language === "en" ? "Instagram Username" : "Instagram Kullanıcı Adın"}
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language === "en" ? "How much money you have to invest in yourself?" : "Geleceğin için ne kadar para ayırabilirsin?"}</p>
              <select
              value={selectedOption.value}  
              onChange={handleSelectChange}
              className="p-2 rounded-lg outline-none border bg-black border-amber-400 text-white"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            </div>
            <button
              className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 cursor-pointer px-8 py-3 text-white inter-500 rounded-lg"
              onClick={() => sendEarlyAccess()}
            >
              {language === "en" ? "Send" : "Gönder"}
            </button>
          </div>
            </Modal>
            <div className="flex flex-wrap items-center justify-center h-screen gap-12 py-12">
                <div className="flex flex-col border border-amber-400 items-center rounded-lg justify-between w-[300px] sm:w-[350px] sm:h-[780px] h-auto p-4 gap-4">
                    <p className="inter-600 text-3xl sm:text-4xl text-white bg-amber-400 w-full text-center rounded-lg p-4 py-2">OFM <br /> {language == "en" ? "Free Package" : "Ücretsiz Paket"}</p>
                    <p className="inter-500 text-xl text-white p-3 text-center">{language == "en" ? "Polat Gray's legendary trial package is now available and free. Learn what OFM is in the best way possible!" : "Polat Gray'in efsane deneme paketi, şu anda mevcut ve ücretsiz. OFM'in ne olduğunu en iyi şekilde öğren!"}</p>
                    <button className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 inter-500 w-full text-white px-4 py-2 rounded-lg text-2xl mx-4 outline-0" onClick={() => setModalOpen(!modalOpen)}>{language == "en" ? "Get Package" : "Al"}</button>
                </div>
                <div className="flex flex-col border border-amber-400 items-center rounded-lg w-[300px] sm:w-[350px] h-[780px] p-4 justify-between">
                    <p className="inter-600 text-3xl sm:text-5xl text-white bg-amber-400 w-full text-center rounded-lg p-4 py-2">OFM PDF</p>
                    <div className="flex flex-col mt-5 gap-3">
                        <p className="inter-500 text-white px-5 text-xl text-center">{language == "en" ? "Polat Gray PDF Package" : "Polat Gray PDF paketi"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "You will learn how to find your first model" : "İlk modelini nasıl bulacağını öğreneceksin."}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "You will learn how to find top 1 percent models and get a deal with them" : "En iyi yüzde 1'lik modelleri nasıl bulacağını ve onlarla nasıl anlaşma yapacağını öğreneceksin."}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "You will learn how to find chatters and make them work for you and your model" : "Sohbet edenleri nasıl bulacağını ve onların senin ve modelinin için çalışmasını nasıl sağlayacağını öğreneceksin."}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "You will learn all the secret marketing techniques that polatgray uses" : "Polatgray'in kullandığı tüm gizli pazarlama tekniklerini öğreneceksin."}</p>
                        <div className="price-tag">
                            <p className="line-1 text-white old-price">{language == "en" ? "1500$" : "14999TL"}</p>
                            <p className="text-white text-3xl sm:text-5xl inter-600">{language == "en" ? "799$" : "8999TL"}</p>
                        </div>
                    </div>
                    <button className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 w-full inter-500 text-white px-4 py-2 rounded-lg text-2xl mx-4 outline-0" onClick={() => navigate("/CheckOut?package=1")}>{language == "en" ? "Buy Now" : "Satın Al"}</button>
                </div>
                <div className="flex flex-col border border-amber-400 items-center rounded-lg w-[300px] sm:w-[350px] h-[780px] p-4 justify-between">
                    <p className="inter-600 text-3xl sm:text-3xl text-white bg-amber-400 w-full text-center rounded-lg p-4 py-2">{language == "en" ? <>One on One <br />With Polat Gray</> : <>Polat Gray ile <br />bire bir</>}</p>
                    <div className="flex flex-col mt-5 gap-3">
                        <p className="inter-500 text-white px-5 text-xl text-center">{language == "en" ? "You will start make money in your first week." : "İlk haftanda para kazanmaya başlayacaksın."}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Your first model will arrange it for you" : "  İlk modelin bunu senin için ayarlayacak."}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "Your 3 chatters for your first model arrange for you" : "İlk modelin için 3 sohbetin senin için ayarlanacak"}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "You will learn everything with details" : "Her şeyi en detayıyla öğreneceksin."}</p>
                        <p className="inter-500 text-white px-5  text-center">{language == "en" ? "You will get a chance to partner with Polat Gray." : "Polat Gray ile ortak olma şansına sahip olacaksınız."}</p>
                        
                    </div>
                    <div className="price-tag">
                            <p className="line-1 text-white old-price">{language == "en" ? "29999$" : "299999TL"}</p>
                            <p className="text-white text-3xl sm:text-5xl inter-600">{language == "en" ? "7999$" : "159999TL"}</p>
                    </div>
                    <button className="bg-amber-400 hover:bg-amber-500 w-full transition-all duration-300 inter-500 text-white px-4 py-2 rounded-lg text-2xl mx-4 outline-0" onClick={() => navigate("/CheckOut?package=2")}>{language == "en" ? "Buy Now" : "Satın Al"}</button>
                </div>
            </div>
        </>
    )
}

export default CheckPlan

