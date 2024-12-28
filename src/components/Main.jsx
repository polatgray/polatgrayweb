import Home from "./HomeComponents/Home"
import JoinNow from "./HomeComponents/JoinNow"
import MyLife from "./HomeComponents/MyLife"
import OFMIntroduction from "./HomeComponents/OFMIntroduction"

const Main = () => {
    return(
        <>
         <Home />
         <OFMIntroduction />
         <JoinNow />
         <MyLife />
        </>
    )
}

export default Main