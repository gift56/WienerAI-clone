import { Swiper } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = ({ children, slideTotal = 1 }) => {
  return (
    <div className="w-full mt-7">
      <Swiper
        slidesPerView={slideTotal}
        spaceBetween={30}
        autoplay={{
          delay: 150000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default Slider;