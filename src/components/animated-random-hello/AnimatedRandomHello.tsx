import { useTypewriter } from './hooks/useTypewriter';

const greetings = [
  'Kumusta?', // Filipino
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

export default function AnimatedRandomHello() {
  const animatedText = useTypewriter(greetings, {
    typingSpeed: 250,
    pauseAfterComplete: 2000,
  });

  return (
    <span className={`text-3xl md:text-5xl font-bold text-center`}>
      {animatedText} &#128075;
      <span className="border-r-2 border-current animate-pulse ml-1"></span>
    </span>
  );
}
