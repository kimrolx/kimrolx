import AnimatedTitles from '@/components/animated-title/AnimatedTitle';

export default function HomePage() {
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

        <div className="flex flex-row items-center justify-center gap-6 mt-10">
          <a
            href="#projects"
            className="text-sm max-xs:text-xs max-xs:p-3 text-inherit bg-accent-foreground px-3 py-2 rounded hover:bg-black hover:cursor-pointer transition-all duration-200"
          >
            View my work
          </a>
          <a
            href="https://github.com/kimrolx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm max-xs:text-xs bg-transparent text-inherit hover:text-white hover:cursor-pointer hover:bg-transparent transition"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
