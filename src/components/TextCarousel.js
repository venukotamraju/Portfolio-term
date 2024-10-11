import { useEffect, useState } from "react";

const carouselBits = [
  {
    text: "Venu Kotamraju",
    color: "white",
  },
  {
    text: "A Software Developer",
    color: "orange",
  },
  {
    text: "A Philanthropist",
    color: "green",
  },
  {
    text: "A Creator & Innovator",
    color: "red",
  },
  {
    text: "A Visionary",
    color: "yellow",
  },
  {
    text: "A Normal Guy!",
    color: "cyan",
  },
];

function TextCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("slide-out");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselBits.length);
        setDirection("slide-in");
      }, 1000); // match the duration with the css transition duration
    }, 2000); // change every two seconds

    // cleanup on mount
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className="text-[50px] font-semibold"
      style={{ fontVariant: "small-caps" }}
    >
      I am{" "}
      <p
        className={`inline-block transition-transform duration-1000 ${
          direction === "slide-in"
            ? `translate-y-0 ease-in`
            : `-translate-y-1 ease-out`
        } `}
        style={{ color: carouselBits[currentIndex].color }}
      >
        {carouselBits[currentIndex].text}
      </p>
    </h1>
  );
}

export default TextCarousel;
