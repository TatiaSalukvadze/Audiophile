"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay"; // Ensure you have imported autoplay CSS

import productData from "../../../../data.json";
import "./swiperc.css";
import Link from "next/link";
import { useContext } from "react";
import { MyContext } from "../../../../context/MyContext";

function SwiperC() {
  const { imageSrcKey } = useContext(MyContext);
  return (
    <div className="mainwrap swiper">
      <h1>
        Our <span>Products</span>
      </h1>
      <Swiper
        spaceBetween={20}
        slidesPerView={
          imageSrcKey == "desktop" ? 4 : imageSrcKey == "tablet" ? 3 : 2
        }
        //   effect="cube"
        //   pagination={{ clickable: true }}
        //   centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        //   className="mainwrap swiper"
      >
        {productData.map((p, index) => (
          <SwiperSlide key={index}>
            {p.image.mobile && (
              <Link href={`/${p.category}/${p.slug}`}>
                <img
                  src={p.image.mobile}
                  alt="product image"
                  width="100%"
                  height="auto"
                />
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperC;
