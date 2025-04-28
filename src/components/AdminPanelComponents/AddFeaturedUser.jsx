import { useContext, useEffect } from "react"
import { LanguageContext } from "../../Context/LanguageContext"
import { db } from "../Firebase/Firebase" 
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const AddFeautedUser = () => {
    const { language } = useContext(LanguageContext)

    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const pParam = urlParams.get('p')

        if (pParam) {
            const addUserToFeatured = async () => {
                try {
                    const docRef = doc(db, "featuredUsers", pParam)
                    await setDoc(docRef, { createdAt: new Date() })
                    console.log("Kardeşim başarıyla ekledik amk, p:", pParam)
                    toast.success(language == "en" ? "Success!" : "Öne çıkarıldın!")
                    navigate("/")
                } catch (error) {
                    console.error("Aq hata oldu:", error)
                    toast.error(language == "en" ? "Error! Try again later" : "Hata oluştu! Daha sonra tekrar deneyin.")
                    navigate("/")
                }
            }
            addUserToFeatured()
        } else {
            console.warn("P parametresi yok amk, napıyon?")
        }
    }, [])

    return(
        <>
            <div className="flex items-center justify-center">
                <p className="text-amber-500 inter-600">
                    {language === "en" ? "Counting the money..." : "Paralar sayılıyor..."}
                </p>
            </div>
        </>
    )
}

export default AddFeautedUser
