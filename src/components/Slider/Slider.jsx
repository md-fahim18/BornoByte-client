import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bannerImg1 from "../../assets/Image/Banner/slide1.png";
import bannerImg2 from "../../assets/Image/Banner/slide2.png";

const slides = [
  {
    image: bannerImg1,
    title: "Welcome to Slide One",
    subtitle: "Learn smarter, not harder with BornoByte.",
    btn1: "Learn More",
    btn2: "Get Started",
  },
  {
    image: bannerImg2,
    title: "Explore Slide Two",
    subtitle: "Master Math & Physics the fun way.",
    btn1: "See Features",
    btn2: "Try Now",
  },
  {
    image:
      "https://prezibase.com/free/preview/edtech-educational-technology-school-teaching-ipad-prezi-presentation-template.jpg",
    title: "Final Slide",
    subtitle: "Your SSC/HSC success starts here.",
    btn1: "Back to Home",
    btn2: "Contact Us",
  },
];

export default function MySlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-[60vh] sm:h-[70vh] md:h-[85vh] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Dark overlay with light transparency */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Content Box */}
            <div className="absolute inset-0 flex items-center justify-center md:justify-end px-4 md:px-16">
              <div className="bg-black/25 backdrop-blur-sm shadow-xl rounded-lg text-white w-full max-w-[500px] h-[250px] sm:h-[280px] md:h-[300px] p-5 sm:p-6 flex flex-col justify-center">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-4">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-5 py-2 bg-white text-black rounded hover:bg-gray-200 transition text-sm sm:text-base">
                    {slide.btn1}
                  </button>
                  <button className="px-5 py-2 bg-transparent border border-white text-white rounded hover:bg-white hover:text-black transition text-sm sm:text-base">
                    {slide.btn2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
