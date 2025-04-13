import { useEffect, useState } from 'react';

const titles = ['Fullstack Developer', 'Software Developer'];

export default function AnimatedTitles() {
  const [currentTitle, setCurrentTitle] = useState(titles[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTitle((prevTitle) => {
          const currentIndex = titles.indexOf(prevTitle);
          return titles[(currentIndex + 1) % titles.length];
        });
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <p
      className={`transition-opacity duration-500 text-3xl max-xs:text-2xl md:text-4xl font-bold ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } text-[#FFB22C]`}
    >
      {currentTitle}
    </p>
  );
}
