import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

import bannerImg1 from "../../assets/Image/Banner/slide1.png";
import bannerImg2 from "../../assets/Image/Banner/slide2.png";
import bannerImg3 from "../../assets/Image/Banner/slide3.jpg";

const slides = [
  {
    image: bannerImg1,
    title: "Learn Smarter with BornoByte",
    subtitle: "SSC & HSC made simple.",
    btn1: "About Us",
    btn2: "Join Now",
    btn1Route: "/about",
    btn2Route: "/register",
  },
  {
    image: bannerImg2,
    title: "Master Science Easily",
    subtitle: "Math & Physics the fun way.",
    btn1: "See Courses",
    btn2: "Explore",
    btn1Route: "/courses",
    btn2Route: "/login",
  },
  {
    image: bannerImg3,
    title: "Level Up Your Learning",
    subtitle: "From SSC to University.",
    btn1: "Contact Us",
    btn2: "Go Back",
    btn1Route: "/contactUs",
    btn2Route: "/",
  },
];

export default function MySlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 50000 }}
      loop={true}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
            {/* 👇 Stretch image slightly to fill container with no crop */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100% 100%", // 💥 THIS is the magic
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 z-10" />

            {/* Content Box */}
            <div className="absolute inset-10 flex items-center justify-center text-center md:justify-end px-4 md:px-16 z-20">
              <div className="bg-black/30 backdrop-blur-sm shadow-2xl rounded-lg text-white w-full max-w-[90%] sm:max-w-[400px] h-auto p-5 sm:p-6 flex flex-col justify-center text-center items-center md:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 justify-center text-center">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-5">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
                  <Link
                    to={slide.btn1Route}
                    className="px-5 py-2 bg-white text-black rounded hover:bg-gray-200 transition text-sm sm:text-base text-center"
                  >
                    {slide.btn1}
                  </Link>

                  <Link
                    to={slide.btn2Route}
                    className="px-5 py-2 bg-transparent border border-white text-white rounded hover:bg-white hover:text-black transition text-sm sm:text-base text-center"
                  >
                    {slide.btn2}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
