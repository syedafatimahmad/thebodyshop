import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slider() {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      loop={true}
    >
      <SwiperSlide>
        <img src="/thebodyshop/images/banner1.jpg" alt="Banner 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/thebodyshop/images/banner2.jpg" alt="Banner 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/thebodyshop/images/banner3.jpg" alt="Banner 3" />
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
