import './App.css';
import TopBar from './components/top-bar/TopBar';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import AnimatedRandomHello from './components/animated-random-hello/AnimatedRandomHello';

function App() {
  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="flex flex-col my-12 relative z-10">
        {/* Landing Page */}
        <div id="home" className="min-h-screen w-full flex flex-col gap-32 max-sm:gap-10 border-b border-[#b8b8b8]">
          <AnimatedRandomHello />
          <div>
            <HomePage />
          </div>
        </div>

        <div id="experience" className="w-full">
          <ExperiencePage />
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
