import { useEffect, useState } from 'react';

const greetings = [
  'Kamusta', // Filipino
  'Hello', // English
  'Bonjour', // French
  'Hola', // Spanish
  'नमस्ते', // Hindi
  'こんにちは', // Japanese
  '안녕하세요', // Korean
  '你好', // Chinese
  'שלום', // Hebrew
  'Привет', // Russian
  'สวัสดี', // Thai
];

const getRandomGreeting = (exclude: string) => {
  let newGreeting = exclude;
  while (newGreeting === exclude) {
    newGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  }
  return newGreeting;
};

export default function AnimatedRandomHello() {
  const [currentGreeting, setCurrentGreeting] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!currentGreeting) {
      setCurrentGreeting(getRandomGreeting(''));
    }
  }, [currentGreeting]);

  useEffect(() => {
    if (!currentGreeting) return;

    let letterIndex = 0;
    const typingSpeed = 250;
    const pauseAfterComplete = 2000;
    const fadeDuration = 500;

    const typeInterval = setInterval(() => {
      setDisplayedText(currentGreeting.slice(0, letterIndex + 1));
      letterIndex++;
      if (letterIndex === currentGreeting.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsVisible(false);

          setTimeout(() => {
            setDisplayedText('');
            setIsVisible(true);
            setCurrentGreeting(getRandomGreeting(currentGreeting));
          }, fadeDuration);
        }, pauseAfterComplete);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [currentGreeting]);

  return (
    <h1
      className={`text-5xl font-bold text-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {displayedText} &#128075;
      <span className="animate-pulse ml-1"></span>
    </h1>
  );
}
