import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";



const slides = [
  {
    image:` https://i.ibb.co/M55KvkWR/pexels-aminulislambulbul-32628278.jpg`,
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
            <div className="absolute  inset-10 flex items-center justify-center text-center md:justify-end px-4 md:pr-14  md:py-14  z-20">
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
