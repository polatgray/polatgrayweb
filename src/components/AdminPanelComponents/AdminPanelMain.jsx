import Main from "./Main"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../Firebase/Firebase";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

const AdminPanelMain = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loggedUser,setLoggedUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(["logged"]);


    const login = async () => {
        toast.loading("Giriş yapılıyor...")
        try {
            const auth = getAuth(app); 
            const loggedInUser = await signInWithEmailAndPassword(auth, email, password); 
            setLoggedUser(loggedInUser.user); 
            toast.dismiss();
            setCookie("logged",loggedInUser.user.email, {path: "/", expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)});
            toast.success("Başarıyla giriş yapıldı!"); 
        } catch (error) {
            setPassword("")
            setEmail("");
            console.error(error);
            toast.dismiss();
            toast.error("E-Posta veya şifreniz yanlış!");
        }
    };

    useEffect(() => {
        if(cookies.logged){
            setLoggedUser({email: "polatgraybillionaire@gmail.com"});
        }
    }, [])
     
    const handleKeyPress = (event) => {
        if (event.key === "Enter") { 
            login();
        }
      };

    

    return(
        <>
            <div className="h-screen">
                {loggedUser ? <Main loggedUser={loggedUser.email}/> :
                    <div className="flex justify-center items-center h-full">
                        <div className="flex flex-col p-8 py-12 rounded-lg border border-amber-500">
                            <div className="flex flex-col mb-8">
                                <p className="inter-500 text-white text-lg mb-2">E-Posta</p>
                                <input type="text" className="bg-black inter-500 border border-amber-500 rounded-lg p-2 outline-0 text-white" onKeyDown={handleKeyPress} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Posta"/>
                            </div>
                            <div className="flex flex-col">
                                <p className="inter-500 text-white text-lg mb-2">Şifre</p>
                                <input type="password" className="bg-black inter-500 border border-amber-500 rounded-lg p-2 outline-0 text-white" onKeyDown={handleKeyPress} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre"/>
                            </div>
                            <button className="bg-amber-500 text-white inter-600 text-lg py-2 rounded-lg mt-12 cursor-pointer transition-all duration-300 hover:bg-amber-600 outline-0" onClick={() => login()}>Giriş yap</button>
                        </div>
                    </div>
                }
            </div> 
        </>
    )
}

export default AdminPanelMain