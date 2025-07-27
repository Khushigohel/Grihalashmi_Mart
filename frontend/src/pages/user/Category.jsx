import React from "react";
import "../../css/Category.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function Category() {
  const categories = [
    {
      name: "Crft",
      image: "https://sell.cratejoy.com/wp-content/uploads/2015/06/crochet.jpg",
    },
    {
      name: "",
      image:"https://www.falgunigruhudhyog.in/cdn/shop/files/02KhichiyaPapdiCROP_1024x1024.jpg?v=1686030908",
    },
    {
      name: "",
      image:"https://i.ytimg.com/vi/hofLl_8acIw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC_55VWIL4QHsi3c7BtX1FUATV5zg",
    },
    {
      name: "Women's Fashion",
      image:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/85f6204e-767c-4fd7-8663-d7670f60f0f8.__CR0,0,1600,1600_PT0_SX300_V1___.jpg",
    },
    {
      name: "Baby & Toys",
      image:
        "https://macrameforbeginners.com/wp-content/uploads/2023/01/8-Stunning-PDF-Macrame-Wall-Hanging-Patterns-by-Cord-Quartz.jpg",
    },
  ];
  return (
    <>
      <div className="category-slider-section">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="category-slide">
                <img src={category.image} alt={category.name} />
                <p>{category.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Category;
