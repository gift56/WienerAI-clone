import React, { useState, useEffect } from "react";
import CustomizeButton from "./CustomizeButton";

const CountdownTimer = ({ endDate, loadingEthValue }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  return (
    <div className="flex justify-between items-center w-full md:w-[90%] bg-[#966CF2] h-[85px] rounded-2xl px-6">
      {Object.keys(timeLeft).length ? (
        <div className="w-full flex justify-between items-center">
          {!loadingEthValue && (
            <div className="w-full flex justify-between items-center">
              <div className="text-center mx-2">
                <span className="text-sm font-normal font-sauage">Days</span>
                <h6 className="text-2xl font-normal font-sauage">
                  {formatTime(timeLeft.days)}
                </h6>
              </div>
              <div className="text-center mx-2">
                <span className="text-sm font-normal font-sauage">Hours</span>
                <h6 className="text-2xl font-normal font-sauage">
                  {formatTime(timeLeft.hours)}
                </h6>
              </div>
              <div className="text-center mx-2">
                <span className="text-sm font-normal font-sauage">Minutes</span>
                <h6 className="text-2xl font-normal font-sauage">
                  {formatTime(timeLeft.minutes)}
                </h6>
              </div>
              <div className="text-center mx-2">
                <span className="text-sm font-normal font-sauage">Seconds</span>
                <h6 className="text-2xl font-normal font-sauage">
                  {formatTime(timeLeft.seconds)}
                </h6>
              </div>
            </div>
          )}
          {loadingEthValue && (
            <>
              {[0, 1, 2, 3].map((_, index) => (
                <div key={index} className="w-[30%] mx-1">
                  <div className="bg-primary animate-pulse h-12 rounded-xl w-full"></div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <CustomizeButton
            title="Claim $WAI"
            className="px-8 !bg-primary uppercase !font-normal"
            handleClick={() => navigate("/wallets/")}
          />
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
