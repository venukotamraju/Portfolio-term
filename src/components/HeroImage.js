"use client";
import TextCarousel from "./TextCarousel";
function HeroImage() {
  return (
    <div className="hero_image bg-[url('/venu_pic_hero-min.png')] bg-cover bg-no-repeat bg-center h-screen">
      <div className="hero-text absolute text-center top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <TextCarousel />
        <a href="#terminal">
          <button
            className="cursor-pointer border-2 border-[#b00020] rounded-3xl m-[10px] outline-0 inline-block pt-[10px] pb-[10px] pl-[25px] pr-[25px] bg-white text-[#b00020] font-sans font-bold text-[17px] hover:duration-[300ms] hover:bg-[#555] hover:text-white"
            style={{ fontVariant: "small-caps" }}
          >
            Use my terminal !
          </button>
        </a>
      </div>
    </div>
  );
}

export default HeroImage;
