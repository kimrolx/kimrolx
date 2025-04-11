import './App.css';
import TopBar from './components/top-bar/TopBar';
import AnimatedRandomHello from './components/animated-random-hello/AnimatedRandomHello';
import AnimatedTitles from './components/animated-title/AnimatedTitle';

function App() {
  return (
    <div className="min-h-svh min-w-svw">
      <TopBar />

      <div className="mx-[400px] my-8 relative z-10 flex flex-col gap-16">
        <AnimatedRandomHello />

        <div className="centered flex-col gap-10">
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

          <h5>Let's work together!</h5>
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
