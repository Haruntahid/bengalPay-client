import { useState, useEffect } from "react";
import balance from "../../assets/Balance Inquiry.png";
import GetUserData from "../reusable/GetUserData";

function BalanceInquiry() {
  const { userData, isLoading } = GetUserData();

  const [showBalance, setShowBalance] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout;
    if (showBalance) {
      timeout = setTimeout(() => {
        setShowBalance(false);
        setProgress(0);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [showBalance]);

  const handleMouseDown = () => {
    // setIsHolding(true);
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setShowBalance(true);
          return 100;
        }
        return prev + 1.67;
      });
    }, 50);
  };

  const handleMouseUp = () => {
    setProgress(0);
  };

  //   loading
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
      </div>
    );

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-center my-8 gap-3">
        <img className="w-10 h-10" src={balance} alt="Balance Inquiry" />
        <p className="text-green-600 text-2xl font-semibold">Balance Inquiry</p>
      </div>

      {/* btn */}
      <div className="flex items-center justify-center">
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative flex items-center justify-center w-full border border-green-500 rounded-md shadow-md focus:outline-none h-10"
        >
          <span
            className={`absolute text-green-600 text-xl font-semibold transition-opacity duration-500 ${
              showBalance ? "opacity-100" : "opacity-0"
            }`}
          >
            {userData.balance} TK
          </span>
          <span
            className={`absolute text-green-600 text-xl font-semibold transition-opacity duration-500 ${
              showBalance ? "opacity-0" : "opacity-100"
            }`}
          >
            Tap and hold to see balance
          </span>
          {!showBalance && (
            <div
              className="absolute inset-0 bg-green-color transition-width duration-500 ease-linear"
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: "inherit",
              }}
            ></div>
          )}
        </button>
      </div>
    </div>
  );
}

export default BalanceInquiry;
