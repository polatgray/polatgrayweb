import { useState, useContext, useEffect } from "react";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import Modal from 'react-modal';
import Close from "../images/closeWhite.svg";
import toast from 'react-hot-toast';
import { useCookies } from "react-cookie";
import "../css/JoinNowMain.css";
import { LanguageContext } from "../Context/LanguageContext";

const JoinNow = () => {
  const [cookies, setCookie] = useCookies(['email']);
  const { language } = useContext(LanguageContext);
  const db = getFirestore();

  const options = [
    { value: 'noSelect', label: `${language == "en" ? "How much money you have to invest?" : "Ne kadar ayırabilirsin?"}` },
    { value: '1-5', label: '1K-5K' },
    { value: '5-30', label: '5K - 30K' },
    { value: '30-100', label: '30K - 100K' },
    { value: '100-1m', label: '100K - 1 Million' },
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


  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0].code);

 

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  

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


  const handleSelectChange = (e) => {
    const selected = options.find(option => option.value === e.target.value);
    setSelectedOption(selected);
  };

  const sendEarlyAccess = async () => {
    if (!name || !email || !phone || !instagram) {
      toast.error(language === "en" ? "Please fill in all information" : "Lütfen tüm bilgileri doldurun");
      return;
    }

    if (cookies.email) {
      toast.error(language === "en" ? "You've already joined early access." : "Zaten erken erişime katıldınız.");
      return;
    }

    if(selectedOption.value == "noSelect"){
      toast.error(language == "en" ? "You must choose how much money you will set aside for your future" : "Geleceğin için ne kadar para ayıracağını seçmelisin")
      return;
    }

    try {
      toast.loading(language === "en" ? "Loading..." : "Yükleniyor...");
      const userId = crypto.randomUUID();
      const docRef = doc(collection(db, "earlyAccessUsers"), userId);

      await setDoc(docRef, {
        name,
        email,
        phone: `${selectedCountry} ${phone}`,
        instagram,
        moneyKeep: selectedOption.value === "noSelect" ? { value: '1-5', label: '1K-5k' } : selectedOption,
        subscribedAt: new Date().getTime(),
      });

      setCookie("email", email, { path: "/", expires: new Date(9999, 12, 31) });
      toast.dismiss();
      toast.success(language === "en" ? "You've joined early access!" : "Erken erişime katıldın!");

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
  

  return (
    <>
      <div className="joinNowModal">
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
      </div>
      <div className="flex flex-col items-center justify-center h-full h-screen">
        <p className="animated-text inter-500 sm:text-6xl text-4xl text-center px-12">
          {language === "en" ? "Currently in early access!" : "Şu anda erken erişimde!"}
        </p>
        <p className="inter-500 text-white sm:w-[400px] w-[300px] text-xl mt-12 text-center">
          {language === "en"
            ? "All our packages are currently being prepared, but stay in touch with us to make sure you don't miss the opportunity for abundance. Be the first to know when our packages are ready!"
            : "Tüm paketlerimiz şu anda hazırlanıyor, ancak bolluk fırsatını kaçırmamanız için bizimle iletişimde kalın. Paketlerimiz hazır olduğunda ilk sen öğren!"}
        </p>
        <button
          className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 cursor-pointer px-8 py-3 text-white inter-500 rounded-lg mt-12 text-xl"
          onClick={() => setModalOpen(true)}
        >
          {language === "en" ? "Claim Your Spot Now" : "Hemen Yerini Al"}
        </button>
      </div>
    </>
  );
};

export default JoinNow;
