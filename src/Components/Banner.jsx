import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Electrician1 from "../assets/images/Electrician1.jpg";
import Electrician2 from "../assets/images/Electrician2.jpg";
import Carpainter1 from "../assets/images/Carpainter1.jpg";
import Carpainter2 from "../assets/images/Carpainter2.jpg";
import Painter1 from "../assets/images/Painter1.jpg";
import Painter2 from "../assets/images/Painter2.jpg";
import Plumber1 from "../assets/images/Plumber1.jpg";
import Plumber2 from "../assets/images/Plumber2.jpg";

const Banner = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    {
      image1: Electrician1,
      image2: Electrician2,
      title: "Electrician Services",
      description: "Reliable and affordable electrician services at your doorstep.",
    },
    {
      image1: Carpainter1,
      image2: Carpainter2,
      title: "Carpentry Services",
      description: "High-quality carpentry services tailored to your needs.",
    },
    {
      image1: Painter1,
      image2: Painter2,
      title: "Painting Services",
      description: "Transform your space with our expert painting services.",
    },
    {
      image1: Plumber1,
      image2: Plumber2,
      title: "Plumbing Services",
      description: "Experienced plumbers available for all your needs.",
    },
  ];

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <div className="w-full h-auto py-8 px-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-full"
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 bg-gray-100 p-8 md:p-14 xl:p-20 rounded-lg shadow-lg">
              {/* Text Section */}
              <motion.div
                className="text-left w-full md:max-w-sm"
                key={currentSlideIndex === index ? "current" : "hidden"}
              >
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-blue-600"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={letterAnimation}
                  transition={{
                    staggerChildren: 0.05,
                  }}
                >
                  {slide.title.split("").map((char, i) => (
                    <motion.span key={i} variants={letterAnimation}>
                      {char}
                    </motion.span>
                  ))}
                </motion.h2>
                <motion.p
                  className="text-gray-700 text-sm sm:text-base"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={letterAnimation}
                  transition={{
                    staggerChildren: 0.03,
                  }}
                >
                  {slide.description.split("").map((char, i) => (
                    <motion.span key={i} variants={letterAnimation}>
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>

              {/* Images Section */}
              <div className="flex flex-wrap gap-4 justify-center">
                {[slide.image1, slide.image2].map((image, i) => (
                  <motion.img
                    key={i}
                    src={image}
                    alt={`Slide ${index + 1} - Image ${i + 1}`}
                    className="w-44 sm:w-56 md:w-64 lg:w-72 h-44 sm:h-56 md:h-64 lg:h-72 rounded-bl-3xl rounded-tr-3xl border-l-4 border-b-4 border-blue-300 rounded-br-lg rounded-tl-lg object-cover shadow-md"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
