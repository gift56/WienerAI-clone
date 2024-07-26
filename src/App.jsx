import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomizeButton from "./components/CustomizeButton";
import { MdClose } from "react-icons/md";
import { Link as ScrolLInk } from "react-scroll";
import { FaAngleDown, FaBars, FaTelegram, FaXTwitter } from "react-icons/fa6";
import CountdownTimer from "./components/CountdownTimer";
import {
  buySteps,
  faqData,
  featuresData,
  IframeData,
  statsInfo,
  whatQuestion,
} from "./constants";
import Slider from "./components/Slider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Marquee from "react-fast-marquee";

const App = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      document
        .querySelector(".custom-next")
        .addEventListener("click", () => swiperInstance.slideNext());
      document
        .querySelector(".custom-prev")
        .addEventListener("click", () => swiperInstance.slidePrev());
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMobileNav(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");

    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const body = document.querySelector("body");

  const overflowHidden = () => {
    if (mobileNav) {
      body?.classList.add("!overflow-hidden");
    } else {
      body?.classList.remove("!overflow-hidden");
    }
  };

  useMemo(() => overflowHidden(), [mobileNav]);

  const endDate = "2024-07-31T00:00:00";

  const toggleFaq = (id) => {
    if (id === openFaq) {
      setOpenFaq(null);
    } else {
      setOpenFaq(id);
    }
  };

  return (
    <React.Fragment>
      <header className="w-full fixed top-0 z-40">
        <div className="relative top-0 z-40 transition-all duration-300 w-full">
          <div className="contain">
            <nav className="w-full flex items-center justify-between py-3">
              <Link
                to="/"
                className="flex items-center justify-start select-none"
              >
                <img
                  src="/images/logo.png"
                  alt="WienerAI logo"
                  className="w-10 h-10 md:w-14 md:h-14"
                />
              </Link>
              <ul className="hidden lg:flex items-center justify-center gap-8">
                <li className="hover:text-primary cursor-pointer transition-all duration-300">
                  <ScrolLInk
                    to="home"
                    spy={true}
                    smooth={true}
                    className="font-sauage text-2xl font-normal"
                  >
                    Staking
                  </ScrolLInk>
                </li>
                <li className="hover:text-primary cursor-pointer transition-all duration-300">
                  <a
                    href="https://wienerdog.ai/assets/documents/whitepaper.pdf"
                    className="font-sauage text-2xl font-normal"
                  >
                    Whitepaper
                  </a>
                </li>
                <li className="hover:text-primary cursor-pointer transition-all duration-300">
                  <ScrolLInk
                    to="about"
                    spy={true}
                    smooth={true}
                    className="font-sauage text-2xl font-normal"
                  >
                    About
                  </ScrolLInk>
                </li>
                <li className="hover:text-primary cursor-pointer transition-all duration-300">
                  <a
                    href="https://wienerdog.ai/assets/documents/audit.pdf"
                    className="font-sauage text-2xl font-normal"
                  >
                    Audit
                  </a>
                </li>
              </ul>
              <div className="hidden lg:!flex gap-3 items-center justify-end">
                <Link
                  to="https://twitter.com/WienerDogAI"
                  className="w-10 h-10 bg-white flex items-center justify-center rounded-full text-gray-500"
                >
                  <img src="/icons/twitterIcon.svg" alt="twitter Icon" />
                </Link>
                <Link
                  to="https://t.me/WienerAi"
                  className="w-10 h-10 bg-white flex items-center justify-center rounded-full text-gray-500"
                >
                  <img src="/icons/telegramIcon.svg" alt="telegram Icon" />
                </Link>
                <CustomizeButton
                  title="Buy now"
                  className="px-6"
                  handleClick={() => navigate("/wallets/")}
                />
                <button
                  type="button"
                  className="flex items-center justify-center text-xs font-semibold gap-1 select-none outline-none uppercase"
                >
                  <img
                    src="/icons/enflagIcon.svg"
                    alt="flag icon"
                    className="w-5 h-5 rounded-[50%]"
                  />
                  <span className="font-sauage">En</span>
                  <FaAngleDown />
                </button>
              </div>
              <span
                onClick={() => setMobileNav((prev) => !prev)}
                className="flex lg:hidden text-white rounded-lg"
              >
                {mobileNav === false && <FaBars size={28} />}
              </span>
            </nav>
          </div>
        </div>
        {/* MOBILE NAV */}
        <div
          className={`${
            mobileNav ? "left-0" : "-left-full"
          } lg:hidden flex justify-start h-screen bg-black/40 gap-7 absolute top-0 w-full z-40 transition-all duration-300`}
        >
          <div
            ref={modalRef}
            className="flex flex-col items-start justify-between h-full bg-black shadow-[0px_6px_20px_0px_#0000001F] text-white py-4 px-4 w-[320px] overflow-y-auto"
          >
            <div className="w-full flex flex-col items-start gap-8">
              <div className="w-full flex items-center justify-between gap-6">
                <Link
                  to="/"
                  className="flex items-center justify-start select-none"
                >
                  <img
                    src="/images/logo.png"
                    alt="WienerAI logo"
                    className="w-10 h-10 md:w-14 md:h-14"
                  />
                </Link>
                <span
                  className="text-white flex items-center justify-center rounded-full"
                  onClick={() => setMobileNav(false)}
                >
                  <MdClose size={25} />
                </span>
              </div>
              <ul className="flex flex-col w-full items-start justify-start">
                <ScrolLInk
                  to="home"
                  spy={true}
                  smooth={true}
                  className="border-b border-[#ffffff5c] py-4 w-full"
                >
                  <li
                    onClick={() => {
                      setMobileNav(false);
                    }}
                    className="font-sauage text-xl font-normal hover:text-primary"
                  >
                    Staking
                  </li>
                </ScrolLInk>
                <a
                  href="https://wienerdog.ai/assets/documents/whitepaper.pdf"
                  className="border-b border-[#ffffff5c] py-4 w-full"
                >
                  <li
                    onClick={() => {
                      setMobileNav(false);
                    }}
                    className="font-sauage text-xl font-normal hover:text-primary"
                  >
                    Whitepaper
                  </li>
                </a>
                <ScrolLInk
                  to="what"
                  spy={true}
                  smooth={true}
                  className="border-b border-[#ffffff5c] py-4 w-full"
                >
                  <li
                    onClick={() => {
                      setMobileNav(false);
                    }}
                    className="font-sauage text-xl font-normal hover:text-primary"
                  >
                    What Is Wiener AI
                  </li>
                </ScrolLInk>
                <ScrolLInk
                  to="about"
                  spy={true}
                  smooth={true}
                  className="border-b border-[#ffffff5c] py-4 w-full"
                >
                  <li
                    onClick={() => {
                      setMobileNav(false);
                    }}
                    className="font-sauage text-xl font-normal hover:text-primary"
                  >
                    How to Buy
                  </li>
                </ScrolLInk>
                <ScrolLInk
                  to="faq"
                  spy={true}
                  smooth={true}
                  className="border-b border-[#ffffff5c] py-4 w-full"
                >
                  <li
                    onClick={() => {
                      setMobileNav(false);
                    }}
                    className="font-sauage text-xl font-normal hover:text-primary"
                  >
                    FAQ
                  </li>
                </ScrolLInk>
                <a
                  href="https://wienerdog.ai/assets/documents/audit.pdf"
                  className="border-b border-[#ffffff5c] py-4 w-full"
                >
                  <li
                    onClick={() => {
                      setMobileNav(false);
                    }}
                    className="font-sauage text-xl font-normal hover:text-primary"
                  >
                    Audit
                  </li>
                </a>
              </ul>
            </div>
            <div className="flex items-center flex-wrap w-full justify-start gap-4 border-b border-[#ffffff5c] py-4">
              <Link
                to="https://twitter.com/WienerDogAI"
                className="w-10 h-10 bg-white flex items-center justify-center rounded-full text-gray-500"
              >
                <FaXTwitter size={17} />
              </Link>
              <Link
                to="https://t.me/WienerAi"
                className="w-10 h-10 bg-white flex items-center justify-center rounded-full text-gray-500"
              >
                <FaTelegram size={17} />
              </Link>
            </div>
            <CustomizeButton
              title="Buy now"
              className="px-6 !w-full my-4 !min-h-10 !bg-white !text-black"
              handleClick={() => navigate("/wallets/")}
            />
            <button
              type="button"
              className="flex items-center justify-center text-sm font-semibold gap-3 select-none outline-none uppercase w-full border p-3 rounded-full"
            >
              <img
                src="/icons/enflagIcon.svg"
                alt="flag icon"
                className="w-5 h-5 rounded-[50%]"
              />
              <span className="font-sauage">En</span>
            </button>
          </div>
        </div>
      </header>
      <section
        id="home"
        className="w-full pt-32 pb-10 lg:pb-64 md:min-h-screen bg-heroBg bg-no-repeat bg-cover bg-black/60 relative"
      >
        <div className="contain relative z-10">
          <div className="w-full flex flex-col lg:flex-row items-start justify-start md:justify-between gap-6 lg:gap-0 h-full">
            <div className="w-full lg:flex-[2.8] flex flex-col items-start justify-start gap-6 relative">
              <h1 className="text-[40px] leading-[1] md:text-6xl font-medium pt-6 pb-3 flex flex-col items-start gap-1">
                <span className="font-sauage">WienerAI </span>
                <span className="font-sauage">
                  Part Dog, Part Sausage, Part
                </span>
                <span className="font-sauage">AI Trading Bot</span>
              </h1>
              <img src="/images/poweredImage.png" alt="powered image" />
              <img
                src="/images/dog.svg"
                alt="hero image"
                className="w-[550px] aspect-square lg:absolute lg:top-[93%] lg:left-[24%]"
              />
            </div>
            <div className="w-full lg:flex-[1.4] bg-heroCard p-4 rounded-2xl flex flex-col items-center justify-start gap-4">
              <h3 className="text-2xl font-normal text-white font-sauage text-center leading-6">
                Last Chance to Buy! Presale Ends in:
              </h3>
              <div className="w-full flex items-center justify-center">
                <CountdownTimer endDate={endDate} />
              </div>
              <h3 className="text-2xl text-center font-normal font-sauage">
                OVER $7M RAISED
              </h3>
              <ul className="w-full flex flex-col items-center justify-center gap-2">
                <li className="flex items-center justify-center gap-2">
                  <span className="text-center uppercase text-xs font-normal font-sauage flex items-center gap-1">
                    Your purchased $WAI{" "}
                    <span className="font-sauage"> = 0</span>
                  </span>
                  <img
                    src="/icons/infoIcon.svg"
                    alt="info icon"
                    className="cursor-pointer"
                  />
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-center uppercase text-xs font-normal font-sauage flex items-center gap-1">
                    Your stakeable $WAI{" "}
                    <span className="font-sauage"> = 0</span>
                  </span>
                  <img
                    src="/icons/infoIcon.svg"
                    alt="info icon"
                    className="cursor-pointer"
                  />
                </li>
              </ul>
              <div className="w-full flex items-center justify-between gap-5">
                <div className="w-[19%] md:w-[23%] h-0.5 bg-white"></div>
                <span className="text-sm font-medium font-sauage">
                  1 $WAI = $0.00073
                </span>
                <div className="w-[19%] md:w-[23%] h-0.5 bg-white"></div>
              </div>
              <div className="w-full flex flex-wrap md:grid md:grid-cols-3 items-center justify-center gap-5">
                {["eth", "usdt", "card"].map((token) => (
                  <div
                    key={token}
                    className={`w-[45%] md:w-full h-[50px] flex items-center justify-center gap-4 rounded-[30px] ${
                      token === "eth"
                        ? "bg-[#BA8BF9] text-white"
                        : "bg-[#EEE8FA] text-[#AC8EEB]"
                    } transition-all duration-300 cursor-pointer capitalize`}
                  >
                    <img
                      src={`/icons/${token}Icon.svg`}
                      alt="token icons"
                      className="w-6 h-6 rounded-full"
                    />
                    <h5 className="text-sm font-normal font-sauage text-inherit">
                      {token}
                    </h5>
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4 mt-3">
                <div className="w-full md:w-2/4 flex flex-col items-start justify-start gap-2">
                  <label
                    htmlFor="eth"
                    className="flex items-center justify-between w-full cursor-pointer"
                  >
                    <span className="text-xs font-normal text-[#E3E3E3] font-sauage">
                      ETH you pay
                    </span>
                    <span className="text-xs font-normal text-[#E3E3E3] font-sauge">
                      Max
                    </span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type="number"
                      placeholder="0"
                      id="eth"
                      min={0}
                      className="w-full pl-3 pr-10 bg-transparent outline-none border-2 border-[#EEE8FA] rounded-2xl text-base font-normal text-white h-12"
                    />
                    <img
                      src="/icons/ethIcon.svg"
                      alt="eth icon"
                      className="rouned-full absolute top-[17%] right-3 w-8 h-8"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/4 flex flex-col items-start justify-start gap-2">
                  <label
                    htmlFor="wai"
                    className="flex items-center justify-between w-full cursor-pointer"
                  >
                    <span className="text-xs font-normal text-[#E3E3E3] font-sauage">
                      $WAI you receive
                    </span>
                    <span className="text-xs font-normal text-[#E3E3E3]"></span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type="number"
                      placeholder="0"
                      id="wai"
                      min={0}
                      className="w-full pl-3 pr-10 bg-transparent outline-none border-2 border-[#EEE8FA] rounded-2xl text-base font-normal text-white h-12"
                    />
                    <img
                      src="favicon.svg"
                      alt="wai icon"
                      className="rouned-full absolute top-[17%] right-3 w-8 h-8"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4 mt-3">
                <div className="w-full md:w-2/4 flex flex-col items-start justify-start gap-2">
                  <CustomizeButton
                    title="Connect Wallet"
                    className="px-6 !w-full !bg-primary uppercase !font-normal"
                    handleClick={() => navigate("/wallets/")}
                  />
                </div>
                <div className="w-full md:w-2/4 flex flex-col items-start justify-start gap-2">
                  <button
                    type="button"
                    onClick={() => navigate("/wallets/")}
                    className="flex items-center justify-center text-sm font-normal gap-3 select-none outline-none uppercase w-full border p-3 rounded-full"
                  >
                    <img
                      src="/icons/bnbIcon.svg"
                      alt="bnb icon"
                      className="w-5 h-5 rounded-[50%]"
                    />
                    Buy with BNB
                  </button>
                </div>
              </div>
              <p className="text-center text-sm font-normal text-white underline">
                Don't have a wallet?
              </p>
              <div className="flex items-center gap-1">
                <span className="text-center text-sm font-normal text-white">
                  Powered by{" "}
                </span>
                <img src="/icons/web3LogoIcon.svg" alt="wallet icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-heroLinearBg absolute top-0 h-full"></div>
      </section>
      <section className="w-full border-b-[4px] border-[#8968B9]">
        <div className="contain">
          <div className="w-full py-8 grid grid-cols-2 lg:grid-cols-4 items-start justify-start gap-8">
            {statsInfo.map((stat, index) => (
              <div
                key={index}
                className="w-full flex flex-col items-center justify-center gap-2"
              >
                <h6 className="text-sm md:text-base font-normal text-center">
                  {stat.heading}
                </h6>
                <h3 className="text-2xl md:text-4xl font-normal text-center">
                  {stat.stat}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full border-[#8968B9]">
        <div className="contain">
          <div className="w-full py-8 hidden lg:grid grid-cols-4 items-start justify-start gap-6">
            {IframeData.map((frame, index) => (
              <div
                key={index}
                className="w-full h-[155px] border border-black rounded-2xl overflow-hidden"
              >
                <iframe
                  _ngcontent-ng-c3662670485=""
                  width="100%"
                  height="155"
                  src={frame.frame}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen=""
                ></iframe>
              </div>
            ))}
          </div>
          <div className="w-full py-8 flex items-center justify-center lg:hidden">
            <Slider>
              {IframeData.map((frame, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full mb-12 flex items-center justify-center"
                >
                  <div
                    key={index}
                    className="w-full h-[155px] border border-black rounded-2xl overflow-hidden"
                  >
                    <iframe
                      _ngcontent-ng-c3662670485=""
                      width="100%"
                      height="155"
                      src={frame.frame}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen=""
                    ></iframe>
                  </div>
                </SwiperSlide>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="w-full flex flex-col items-center justify-center gap-20 relative py-16">
          <h2 className="text-4xl md:text-5xl font-medium text-center">
            FOLLOW @WienerDogAI
          </h2>
          <img
            src="/images/followDog.svg"
            alt="follow dog image"
            className="absolute -top-20 right-0 hidden lg:block"
          />
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 80000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, A11y, Navigation]}
            breakpoints={{
              540: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="homeslide w-[90%] h-full mx-auto"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <div className="w-full h-[524px] bg-white border border-[#CFD9DE] rounded-2xl flex items-center justify-center">
                  <img
                    src="/images/tokenmicDog.svg"
                    alt="loading"
                    className="animate-bounce w-[200px] aspect-square"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-next w-[60px] h-[60px] flex items-center justify-center absolute top-[93%] lg:top-1/2 right-[30%] lg:right-2 transform lg:-translate-y-1/2 bg-[#BA8BF9] text-black rounded-full p-2 cursor-pointer hover:bg-opacity-75 z-10">
            <GrFormNext className="w-10 h-10" />
          </div>
          <div className="custom-prev w-[60px] h-[60px] flex items-center justify-center absolute top-[97%] lg:top-1/2 left-[30%] lg:left-2 transform -translate-y-1/2 bg-[#BA8BF9] text-black rounded-full p-2 cursor-pointer hover:bg-opacity-75 z-10">
            <GrFormPrevious className="w-10 h-10" />
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="contain">
          <div className="w-full flex flex-col items-center justify-center gap-5 py-12">
            <h5 className="text-base font-normal">Featured In</h5>
            <div className="w-full hidden lg:grid lg:grid-cols-6 items-center justify-between gap-4">
              {featuresData.map((feature, index) => (
                <img
                  key={index}
                  src={feature.src}
                  alt="feature logo image"
                  className="w-full"
                />
              ))}
            </div>
            <div className="w-full lg:hidden">
              <Marquee className="w-full " pauseOnHover={true} speed={20}>
                {featuresData.map((feature, index) => (
                  <img
                    key={index}
                    src={feature.src}
                    alt="feature logo image"
                    className="w-full"
                  />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>
      <section id="what" className="w-full relative">
        <div className="contain">
          <div className="w-full flex flex-col items-center justify-center gap-10 py-10">
            <div className="w-full flex flex-col items-center justify-center gap-2 relative">
              <h3 className="text-4xl md:text-5xl text-center font-medium">
                What is WienerAI ($WAI)?
              </h3>
              <p className="text-lg text-center md:max-w-[648px]">
                Despite its hilarious sausage-y exterior, WienerAI is the
                pinnacle of AI trading technology. With girthy, predictive
                features–WienerAI is a trader’s best friend.
              </p>
              <img
                src="/images/whatDog.svg"
                alt="what dog image"
                className="absolute right-4 top-[-110%] hidden lg:block"
              />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-start gap-6 relative z-10">
              {whatQuestion.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col items-center justify-start gap-4 p-4 rounded-2xl bg-[#8968B9] h-[225px]"
                >
                  <h2 className="text-2xl font-medium text-center">
                    {item.title}
                  </h2>
                  <p className="text-lg text-center font-normal md:max-w-[213px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-lg text-center md:max-w-[648px] relative z-10">
              Not just a bot, nor a simple sausage–but an AI-powered crypto
              trading partner designed to give YOU the advantage you’ve been
              searching for
            </p>
            <div className="w-fit relative z-10">
              <CustomizeButton
                title="Buy $WAI Presale"
                className="px-12 !bg-white !text-[#6C42A8]"
                handleClick={() => navigate("/wallets/")}
              />
            </div>
            <img
              src="/images/spaceDog.svg"
              alt="space dog image"
              className="absolute -left-10 bottom-0 w-[598px] aspect-square"
            />
          </div>
        </div>
      </section>
      <section className="w-full bg-[#663AA0]">
        <div className="contain">
          <div className="w-full flex flex-col items-center justify-center py-10 gap-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center">
              OUTSMART THE MARKET WITH $WAI –
              <br />
              WienerAI’s Predictive Technology
            </h2>
            <p className="text-base text-center font-normal md:max-w-[900px]">
              WienerAI’s predictive technology, combined with its user-friendly
              AI interface, allows you to instantly scour the crypto market for
              those hidden gems. Ask WienerAI to find your next trade and it
              delivers the market analysis to help you win more often. Then
              seamlessly swap, MEV-free, through decentralized exchanges.
            </p>
            <a href="https://wienerdog.ai/assets/documents/whitepaper.pdf">
              <CustomizeButton
                title="Learn more"
                className="px-12 !bg-white !text-black"
              />
            </a>
          </div>
        </div>
      </section>
      <section className="w-full lg:bg-tokenmicBg lg:bg-no-repeat lg:bg-[center_top_-5rem]">
        <div className="contain h-full">
          <div className="w-full pt-14 pb-6 flex flex-col lg:flex-row items-start justify-start md:justify-between h-full">
            <div className="flex flex-col p-4 bg-[#00000033] items-start justify-start gap-6 rounded-2xl w-full md:max-w-[505px] lg:mt-[230px]">
              <h3 className="text-3xl md:text-4xl lg:text-6xl font-normal">
                Tokenomics
              </h3>
              <ul className="flex flex-col items-start justify-start gap-1">
                <li className="text-lg md:text-2xl font-normal">
                  30% - Presale
                </li>
                <li className="text-lg md:text-2xl font-normal">
                  20% - Staking
                </li>
                <li className="text-lg md:text-2xl font-normal">
                  20% - Community Rewards
                </li>
                <li className="text-lg md:text-2xl font-normal">
                  10% - DEX/CEX Liquidity
                </li>
                <li className="text-lg md:text-2xl font-normal">
                  20% - Marketing
                </li>
              </ul>
              <span className="text-lg md:text-2xl font-normal">
                Token Supply: 69.000.000.000
              </span>
            </div>
            <div className="h-full flex items-end justify-end mt-[40px] lg:mt-[400px]">
              <div className="flex flex-col p-4 bg-[#00000033] items-start justify-start gap-6 rounded-2xl w-full lg:max-w-[505px]">
                <h3 className="text-3xl md:text-4xl lg:text-6xl font-normal">
                  The WienerAI Masterplan
                </h3>
                <div className="w-full flex flex-col items-start justify-start gap-5">
                  <h6 className="text-3xl md:text-4xl font-normal">Step 1.</h6>
                  <ul className="flex flex-col items-start justify-start gap-1">
                    <li className="text-lg md:text-2xl font-normal">
                      Sausage Army Launch
                    </li>
                    <li className="text-lg md:text-2xl font-normal">
                      WienerAI Contract Audit
                    </li>
                    <li className="text-lg md:text-2xl font-normal">
                      Presale LAUNCHED
                    </li>
                    <li className="text-lg md:text-2xl font-normal">
                      Final Wiener-y Preparations
                    </li>
                    <li className="text-lg md:text-2xl font-normal">
                      Worldwide Marketing Campaign
                    </li>
                  </ul>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-5">
                  <h6 className="text-3xl md:text-4xl font-normal">Step 2.</h6>
                  <ul className="flex flex-col items-start justify-start gap-1">
                    <li className="text-lg md:text-2xl font-normal">
                      Sausage Army Expansion
                    </li>
                    <li className="text-lg md:text-2xl font-normal">
                      KOL Blast
                    </li>
                    <li className="text-lg md:text-2xl font-normal">
                      Ethereum Network Takeover
                    </li>
                  </ul>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-5">
                  <h6 className="text-3xl md:text-4xl font-normal">Step 3.</h6>
                  <ul className="flex flex-col items-start justify-start gap-1">
                    <li className="text-lg md:text-2xl font-normal">
                      Token Listing: The LONG wait is over. WienerAI launches on
                      Global Exchange Platforms. This is the public $WAI launch.
                    </li>
                    <li className="text-lg md:text-2xl font-normal">
                      WienerAI Trading Bot Launch: Not just a bot; but an
                      AI-powered crypto trading partner designed to give YOU the
                      advantage you’ve been searching for.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="w-full bg-howBg bg-no-repeat bg-cover">
        <div className="contain">
          <div className="w-full flex flex-col items-center justify-center py-20 gap-8">
            <h3 className="text-4xl md:text-5xl text-center font-extrabold">
              How To Buy $WAI
            </h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-start gap-6">
              {buySteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-[#FFFFFF33] flex flex-col items-center justify-start gap-5 min-h-[346px] select-none p-4 rounded-2xl"
                >
                  <span className="w-12 h-12 bg-[#BA8BF9] flex items-center justify-center rounded-full">
                    <span className="text-xl font-bold">{`0 ${
                      index + 1
                    }`}</span>
                  </span>
                  <h1 className="text-xl font-normal text-center">
                    {step.title}
                  </h1>
                  <p className="text-base font-normal text-center">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="overflow-hidden">
        <div className="contain">
          <div className="w-full flex flex-col items-center justify-center gap-8 py-14 relative">
            <h3 className="text-4xl md:text-5xl text-center font-light uppercase">
              faq
            </h3>
            <img
              src="/images/rocketDog.svg"
              alt="rocket dog image"
              className="absolute right-[-15%] top-[0%] hidden lg:block"
            />
            <div className="flex flex-col gap-6 max-w-[615px]">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => toggleFaq(index)}
                  className={`w-full border border-[#663AA0] font-semibold rounded-2xl cursor-pointer ${
                    openFaq === index
                      ? "text-white bg-[#663AA0]"
                      : "bg-[#663AA0] text-white"
                  }`}
                >
                  <div className="w-full px-5 py-4 flex items-center justify-between select-none">
                    <span className="text-lg md:text-2xl font-normal text-inherit select-none">
                      {item.question}
                    </span>
                  </div>
                  <p
                    className={`w-full overflow-hidden  px-5 transition-all text-base font-normal text-inherit duration-300 select-none ${
                      openFaq === index
                        ? "max-h-[1000px] py-4 border-t"
                        : "max-h-0"
                    }`}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              ))}
            </div>
            <img
              src="/images/tunnelDog.svg"
              alt="tunnel dog image"
              className="lg:absolute lg:-left-10 lg:bottom-[-15%]"
            />
          </div>
        </div>
      </section>
      <footer className="w-full flex flex-col items-center justify-center gap-2 py-10">
        <h3 className="text-xs font-medium text-center">DISCLAIMER</h3>
        <p className="text-center text-xs text-[#E3E3E3] font-normal">
          Investing in 'WienerAI' is risky and may lead to loss of capital.
          Returns are not guaranteed. Not financial advice. DYOR.
        </p>
        <h2 className="text-lg text-center font-normal">
          © 2024 WienerAI — All Rights Reserved.
        </h2>
      </footer>
    </React.Fragment>
  );
};

export default App;
