import "../../css/Opening.css";

const Opening = () => {
    return (
        <div className="fixed w-full h-full bg-black z-20 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
                <div className="spinner"></div>
                <p className="animated-text text-9xl pg-text absolute">PG</p>
            </div>
        </div>
    );
};

export default Opening;
