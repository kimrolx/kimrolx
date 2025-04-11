import './App.css';
import TopBar from './components/top-bar/TopBar';
import AnimatedRandomHello from './components/animated-random-hello/AnimatedRandomHello';
import AnimatedTitles from './components/animated-title/AnimatedTitle';
import { Button } from './components/ui/button';

function App() {
  const onViewWorkClick = () => {
    console.log('view work clicked');
  };

  const onMoreAboutMeClick = () => {
    console.log('more about me clicked');
  };

  return (
    <div className="min-h-svh min-w-svw flex flex-col items-center">
      <TopBar />

      <div className="w-4xl my-8 relative z-10 flex flex-col gap-24">
        <AnimatedRandomHello />

        {/* Main Content */}
        <div className="w-3xl centered flex-col gap-10 m-auto">
          {/* Introduction */}
          <div className="flex flex-col gap-8">
            <div className="centered flex-col">
              <h1 className="font-bold">I'm Kim Roland Berame</h1>
              <div className="flex flex-row items-center gap-2">
                <AnimatedTitles />
                <h2 className="text-lg">from the</h2>
                <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0038A8] to-[#CE1126]">
                  Philippines
                </h2>
              </div>
            </div>

            <h5 className="text-lg text-center">
              Always eager to learn new technologies while contributing to impactful projects in a collaborative
              environment.
            </h5>

            <div className="flex flex-row items-center justify-center gap-5 mt-8">
              <Button
                onClick={onViewWorkClick}
                className=" text-inherit hover:bg-black hover:cursor-pointer transition"
              >
                View my work
              </Button>
              <Button
                onClick={onMoreAboutMeClick}
                className=" bg-transparent text-inherit hover:text-white hover:cursor-pointer hover:bg-transparent transition"
              >
                More about me
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="background">
        <span className="ball" />
        <span className="ball" />
        <span className="ball" />
        <span className="ball" />
        <span className="ball" />
        <span className="ball" />
      </div>
    </div>
  );
}

export default App;
