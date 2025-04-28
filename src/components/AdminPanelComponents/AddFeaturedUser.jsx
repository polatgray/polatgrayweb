import { useEffect } from "react"
import { db } from "../Firebase/Firebase" 
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const AddFeautedUser = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const pParam = urlParams.get('p')

        if (pParam) {
            const addUserToFeatured = async () => {
                try {
                    const docRef = doc(db, "featuredUsers", pParam)
                    await setDoc(docRef, {id: pParam, createdAt: new Date() })
                    toast.success("Success!")
                    navigate("/")
                } catch (error) {
                    toast.error("Error! Try again later")
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
            <div className="flex items-center justify-center h-screen">
                <p className="text-amber-500 inter-600 text-2xl">
                        Counting the money...
                </p>
            </div>
        </>
    )
}

export default AddFeautedUser
