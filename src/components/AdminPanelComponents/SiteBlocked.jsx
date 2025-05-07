import Logo from "../../images/logo3.svg"

const siteBlocked = () => {
    return(
        <>  
        <div className="flex flex-col h-screen">
            <div className="flex sm:flex-row  items-center flex-col fixed justify-center items-center h-full w-full gap-8 bg-white">
                <img src={Logo} className="w-[80px]" alt="Seku Software Logo" />
                <div className="bg-gray-900 w-[60px] sm:w-[3px] rounded-lg h-[3px] sm:h-[120px]"></div>
                <div className="flex flex-col gap-3 ">
                    <p className="inter-600 text-3xl sm:text-start text-center">Bu siteye erişim şu anda mevcut değil.</p>
                    <p className="inter-500 text-2xl sm:text-start text-center">Access to this site is currently unavailable.</p>
                    <a href="https://sekusoftware.com" className="underline">sekusoftware.com</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default siteBlocked