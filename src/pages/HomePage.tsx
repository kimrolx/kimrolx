import AnimatedTitles from '@/components/animated-title/AnimatedTitle';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const onViewWorkClick = () => {
    console.log('view work clicked');
  };

  const onLearnMoreClick = () => {
    window.open('https://github.com/kimrolx', '_blank', 'noopen,noreferrer');
  };

  return (
    <div className="max-w-3xl m-auto centered flex-col gap-10 ">
      {/* Introduction */}
      <div className="w-full flex flex-col gap-8 max-xs:gap-14 max-xs:p-8">
        <div className="centered flex-col">
          <h1 className="break-words whitespace-break-spaces text-center">I'm Kim Roland Berame</h1>
          <div className="flex flex-col md:flex-row items-center gap-0 md:gap-2 text-wrap break-words whitespace-break-spaces text-center">
            <AnimatedTitles />
            <div className="flex flex-row items-center gap-2">
              <h2>from the</h2>
              <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-[#0038A8] to-[#CE1126]">
                Philippines
              </h2>
            </div>
          </div>
        </div>

        <h5 className="text-center">
          Eager to learn new technologies while contributing to impactful projects in a collaborative environment.
        </h5>

        <div className="flex flex-row items-center justify-center gap-5 mt-10">
          <Button
            onClick={onViewWorkClick}
            className="max-xs:text-xs max-xs:p-3 text-inherit hover:bg-black hover:cursor-pointer transition"
          >
            View my work
          </Button>
          <Button
            onClick={onLearnMoreClick}
            className="max-xs:text-xs bg-transparent text-inherit hover:text-white hover:cursor-pointer hover:bg-transparent transition"
          >
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}
