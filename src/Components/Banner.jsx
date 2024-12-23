import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState("");

  const slides = [
    {
      image: "https://pbs.twimg.com/media/GdyX3P3a8AAghJq?format=jpg&name=large",
      trailer: "https://www.youtube.com/embed/1FwI5RMbIcI?si=8WBEP0aT48PsT0sY",
    },
    {
      image: "https://i.ytimg.com/vi/tPlRgVCeBT8/maxresdefault.jpg",
      trailer: "https://www.youtube.com/embed/Zm3_ymWT-Rc?si=1o9AZsZCJ_1n5ViY",
    },
    {
      image: "https://i.ytimg.com/vi/sGWlxJD0teY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCuGe2Z18LJSGwHn2vbamFbUwhPwQ",
      trailer: "https://www.youtube.com/embed/sGWlxJD0teY",
    },
    {
      image: "https://live.staticflickr.com/276/32066676951_a984e3f67c_b.jpg",
      trailer: "https://www.youtube.com/embed/udAlOSn4yFo?si=7wxPl5MNSX-RRdDh",
    },
  ];

  const handleWatchTrailer = (trailer) => {
    setCurrentTrailer(trailer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTrailer("");
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div className="w-full h-[210px] md:h-[300px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] relative">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-[210px] md:h-[300px] lg:h-[450px] xl:h-[500px] 2xl:h-[700px]"
              />
              <div className="absolute bottom-4 lg:bottom-10 2xl:bottom-36 left-4 lg:left-10 text-white z-50">
                <button
                  onClick={() => handleWatchTrailer(slide.trailer)}
                  className="bg-red-600 px-5 py-2 md:py-3 rounded-md flex items-center font-medium gap-1 shadow-lg hover:bg-red-700 transition-all"
                >
                  <MdOutlinePlayCircleFilled className="text-xl md:text-3xl" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={currentTrailer}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                title="Trailer"
              ></iframe>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
            >
              <AiOutlineClose className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
