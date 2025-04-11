import { useState, useEffect } from 'react';

interface TypewriterOptions {
  typingSpeed?: number; // Milliseconds delay per character.
  pauseAfterComplete?: number; // Milliseconds pause after a string finishes typing.
}

export function useTypewriter(strings: string[], options?: TypewriterOptions): string {
  const { typingSpeed = 250, pauseAfterComplete = 2000 } = options || {};

  const [currentText, setCurrentText] = useState('');
  const [currentString, setCurrentString] = useState('');

  useEffect(() => {
    if (!currentString && strings.length) {
      const randomString = strings[Math.floor(Math.random() * strings.length)];
      setCurrentString(randomString);
    }
  }, [strings, currentString]);

  useEffect(() => {
    if (!currentString) return;

    let letterIndex = 0;
    const typeInterval = setInterval(() => {
      setCurrentText(currentString.slice(0, letterIndex + 1));
      letterIndex++;

      if (letterIndex === currentString.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentText('');

          let newString = currentString;
          while (newString === currentString && strings.length > 1) {
            newString = strings[Math.floor(Math.random() * strings.length)];
          }
          setCurrentString(newString);
        }, pauseAfterComplete);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [currentString, typingSpeed, pauseAfterComplete, strings]);

  return currentText;
}
