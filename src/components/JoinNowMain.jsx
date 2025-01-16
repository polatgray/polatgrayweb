import { useSearchParams } from "react-router-dom";
import "../css/JoinNowMain.css"
import Modal from 'react-modal';
import { useState } from "react";
import Close from "../images/closeWhite.svg"
import toast from 'react-hot-toast';


const JoinNow = () => {

    const [modalOpen,setModalOpen] = useState(false);

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

    const sendEarlyAccess = () => {

    }

    return(
        <>
            <div className="joinNowModal">
                <Modal style={customStyles} isOpen={modalOpen}>
                    <div className="flex justify-end">
                        <img src={Close} alt="Close Button" className="w-[45px]" onClick={() => setModalOpen(!modalOpen)}/>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-white inter-500">Name Surname</p>
                            <input type="text" className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white" placeholder="Name Surname"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-white inter-500">E-Mail Address</p>
                            <input type="mail" className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white" placeholder="E-Mail Address"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-white inter-500">Phone Number</p>
                            <input type="number" className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white" placeholder="Phone Number"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-white inter-500">Instagram Username</p>
                            <input type="text" className="p-2 px-2 rounded-lg outline-0 border placeholder:inter-500 inter-500 bg-black border-amber-400 text-white" placeholder="Instagram Username"/>
                        </div>
                        <button className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 cursor-pointer px-8 py-3 text-white inter-500 rounded-lg text-xl outline-0">Send</button>
                    </div>
                </Modal>
            </div>
           <div className="flex flex-col items-center justify-center h-full h-screen select-none">
                <p className="animated-text inter-500 sm:text-6xl text-4xl text-center px-12">Currently in early access!</p>
                <p className="inter-500 text-white sm:w-[400px] w-[300px] text-white text-xl mt-12 text-center text-ani-3">All our packages are currently being prepared, but stay in touch with us to make sure you don't miss the opportunity for abundance. Be the first to know when our packages are ready!</p>
                <button className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 cursor-pointer px-8 py-3 text-white inter-500 rounded-lg mt-12 text-xl specJoinNowButton" onClick={() => setModalOpen(!modalOpen)}>Claim Your Spot Now</button>
           </div>
        </>
    )
}

export default JoinNow