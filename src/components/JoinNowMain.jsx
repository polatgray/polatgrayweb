import { useState } from "react";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { db } from "./Firebase/Firebase";
import Modal from 'react-modal';
import Close from "../images/closeWhite.svg";
import toast from 'react-hot-toast';
import { useCookies } from "react-cookie";
import "../css/JoinNowMain.css";

const JoinNow = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['email']);


  const db = getFirestore();
  const [modalOpen, setModalOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");

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
              <p className="text-white inter-500">First Name</p>
              <input
                type="text"
                className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // name state'ini güncelle
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">E-Mail Address</p>
              <input
                type="email"
                className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white"
                placeholder="E-Mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">Phone Number</p>
              <input
                type="text"
                className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white inter-500">Instagram Username</p>
              <input
                type="text"
                className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white"
                placeholder="Instagram Username"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)} 
              />
            </div>
            <button
              className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 cursor-pointer px-8 py-3 text-white inter-500 rounded-lg text-xl outline-0"
              onClick={() => sendEarlyAccess()} 
            >
              Send
            </button>
          </div>
        </Modal>
      </div>
      <div className="flex flex-col items-center justify-center h-full h-screen select-none">
        <p className="animated-text inter-500 sm:text-6xl text-4xl text-center px-12">
          Currently in early access!
        </p>
        <p className="inter-500 text-white sm:w-[400px] w-[300px] text-white text-xl mt-12 text-center text-ani-3">
          All our packages are currently being prepared, but stay in touch with us to make sure you don't miss the opportunity for abundance. Be the first to know when our packages are ready!
        </p>
        <button
          className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 cursor-pointer px-8 py-3 text-white inter-500 rounded-lg mt-12 text-xl specJoinNowButton outline-0"
          onClick={() => setModalOpen(!modalOpen)} 
        >
          Claim Your Spot Now
        </button>
      </div>
    </>
  );
};

export default JoinNow;
