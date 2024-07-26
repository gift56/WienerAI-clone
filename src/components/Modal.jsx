import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

const Modal = ({ show, children, setShow, className }) => {
  const modalRef = useRef(null);

  const variants = {
    open: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    closed: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
  };

  const body = document.querySelector("body");

  const overflowHidden = () => {
    if (show) {
      body?.classList.add("!overflow-hidden");
    } else {
      body?.classList.remove("!overflow-hidden");
    }
  };

  useMemo(() => overflowHidden(), [show]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShow(false);
        body?.classList.remove("!overflow-hidden");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } fixed top-0 right-0 w-full h-full bg-[#00000085] z-[90] place-items-center flex items-center justify-center transition-all duration-500 overflow-auto pt-20`}
    >
      <motion.div
        ref={modalRef}
        animate={show ? "open" : "closed"}
        variants={variants}
        className={`w-[90%] bg-white rounded-lg p-4 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
