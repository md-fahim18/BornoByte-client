import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const slides = [
  {
    image: ` https://i.ibb.co/M55KvkWR/pexels-aminulislambulbul-32628278.jpg`,
    title: "শুধু ভালো না, এক্সেলেন্স-এর জন্য প্রস্তুত করো নিজেকে",
    subtitle: "ভবিষ্যতের জন্য প্রস্তুত হও আজ থেকেই",
    btn1: "See Courses",
    btn2: "Explore",
    btn1Route: "/courses",
    btn2Route: "/login",
  },
  {
    image: `https://i.ibb.co/qMYzbQJk/Borno-Byte.png`,
    title: "Learn Smarter with BornoByte",
    subtitle: "Brainstorm. Compete. Win. All from One",
    btn1: "About Us",
    btn2: "Join Now",
    btn1Route: "/about",
    btn2Route: "/register",
  },

  {
    image: `https://i.ibb.co/9kKNgCHC/pexels-karolina-grabowska-7285165.jpg`,
    title: " From SSC to University 🎓",
    subtitle: " ভিডিও ক্লাস + কুইজ + অ্যাসাইনমেন্ট = সম্পূর্ণ প্রস্তুতি ",
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
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
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
            {/* Content Box */}
            <div className="absolute inset-0 flex items-center justify-center md:justify-end px-4 md:pr-14 py-10 md:py-14 z-20">
              <div className="bg-black/40 backdrop-blur-md shadow-xl rounded-2xl text-white w-full max-w-[95%] sm:max-w-[380px] p-4 sm:p-6 flex flex-col justify-center items-center text-center md:text-left md:items-start">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-4 leading-snug">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Link
                    to={slide.btn1Route}
                    className="w-full sm:w-auto px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition text-sm sm:text-base text-center"
                  >
                    {slide.btn1}
                  </Link>
                  <Link
                    to={slide.btn2Route}
                    className="w-full sm:w-auto px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition text-sm sm:text-base text-center"
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
