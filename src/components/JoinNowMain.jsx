import { useState,useContext } from "react";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { db } from "./Firebase/Firebase";
import Modal from 'react-modal';
import Close from "../images/closeWhite.svg";
import toast from 'react-hot-toast';
import { useCookies } from "react-cookie";
import Select from 'react-select'
import "../css/JoinNowMain.css";
import { LanguageContext } from "../Context/LanguageContext";

const JoinNow = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['email']);

  const {language} = useContext(LanguageContext)

  const db = getFirestore();
  const [modalOpen, setModalOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    setSelectedOption(selected); 
    console.log('Seçilen Değer:', selected);
  };

  const options = [
    { value: '1-5', label: '1K-5k' },
    { value: '5-30', label: '5K - 30K' },
    { value: '30-100', label: '30K - 100K' },
    { value: '100-1m', label: '100K - 1 Million' },
    { value: 'over1m', label: "Over 1 Million" }

  ]
  

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

  const sendEarlyAccess = async () => {
    if(name == "" || email == "" || phone == "" || instagram == ""){
        toast.error("Please fill in all information")
    }
    else{
        if(cookies.email){
            toast.error("You've already joined early access.")
        }
        else{
            try {
                toast.loading("Loading...");
                const userId = crypto.randomUUID();  
                const docRef = doc(collection(db, "earlyAccessUsers"), userId); 
          
                await setDoc(docRef, {
                  name,
                  email,
                  phone,
                  instagram,
                  moneyKeep:selectedOption,
                  subscribedAt: new Date().getTime(),
                });
          
                setCookie("email",email,{path : "/", expires: new Date(9999, 12, 31)})
                toast.dismiss();
                toast.success("You've joined early access!");
                setName(""); 
                setEmail("");
                setPhone("");
                setInstagram("");
                setModalOpen(!modalOpen)
              } catch (error) {
                console.error("Data Error:", error);
                toast.dismiss();
                toast.error("There was an error we did not expect! Please notify the developer.");
              }
        }
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
              className="w-[45px]"
              onClick={() => setModalOpen(!modalOpen)}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language == "en" ? "First Name" : "Adın"}</p>
              <input
                type="text"
                className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // name state'ini güncelle
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language == "en" ? "E-Mail Address" : "E-Posta adresi"}</p>
              <input
                type="email"
                className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white"
                placeholder="E-Mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language == "en" ? "Phone Number" : "Telefon Numaran"}</p>
              <input
                type="text"
                className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">{language == "en" ? "Instagram Username" : "Instagram kullanıcı adın"}</p>
              <input
                type="text"
                className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white"
                placeholder="Instagram Username"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)} 
              />
            </div>
            <div className="flex flex-col">
              <p className="text-white inter-500 mb-3">{language == "en" ? "How much money you have to invest in your future right now?" : "Geleceğin için ne kadar para ayırabilirsin?"}</p>
              <Select options={options}  onChange={handleChange} value={selectedOption} />   
            </div>
            <button
              className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 cursor-pointer px-8 py-3 text-white inter-500 rounded-lg text-xl outline-0"
              onClick={() => sendEarlyAccess()} 
            >
              {language == "en" ? "Send" : "Gönder"}
            </button>
            
          </div>
        </Modal>
      </div>
      <div className="flex flex-col items-center justify-center h-full h-screen select-none">
        <p className="animated-text inter-500 sm:text-6xl text-4xl text-center px-12">
          {language == "en" ? "Currently in early access!" : "Şu anda erken erişimde!"}
        </p>
        <p className="inter-500 text-white sm:w-[400px] w-[300px] text-white text-xl mt-12 text-center text-ani-3">
          {language == "en" ? "All our packages are currently being prepared, but stay in touch with us to make sure you don't miss the opportunity for abundance. Be the first to know when our packages are ready!" : "Tüm paketlerimiz şu anda hazırlanıyor, ancak bolluk fırsatını kaçırmamanız için bizimle iletişimde kalın. Paketlerimiz hazır olduğunda ilk sen öğren!"}
        </p>
        <button
          className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 cursor-pointer px-8 py-3 text-white inter-500 rounded-lg mt-12 text-xl specJoinNowButton outline-0"
          onClick={() => setModalOpen(!modalOpen)} 
        >
          {language == "en" ? "Claim Your Spot Now" : "Hemen Yerini Al"}
        </button>
      </div>
    </>
  );
};

export default JoinNow;
