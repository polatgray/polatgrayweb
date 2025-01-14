import "../../css/Opening.css";

const Opening = () => {
    return (
        <div className="fixed w-full h-full bg-black z-20 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
                {/* <p className="animated-text sm:text-9xl text-7xl pg-text ">PG</p> */}
                <div class="container">
                    <div class="box">
                        <div class="title">
                            <span class="block"></span>
                            <h1 className="animated-text sm:text-9xl text-7xl pg-text">PG</h1>
                        </div>
                    </div>
                </div>
                <p className="dm-serif-text-regular text-white sm:text-2xl text-2xl px-2  animated-text-opening-label text-center mt-5">World’s Best Charismatic Millionaire</p>
            </div>
        </div>
    );
};

export default Opening;
