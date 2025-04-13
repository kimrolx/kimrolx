import './App.css';
import TopBar from './components/top-bar/TopBar';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import AnimatedRandomHello from './components/animated-random-hello/AnimatedRandomHello';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="flex flex-col relative z-10">
        {/* Landing Page */}
        <div
          id="home"
          className="min-h-screen w-full flex flex-col px-6 mt-30 max-sm:mt-20 gap-16 max-sm:gap-20 border-b border-[#b8b8b8]"
        >
          <AnimatedRandomHello />
          <div>
            <HomePage />
          </div>
        </div>

        <div id="experience" className="w-full border-b border-[#b8b8b8]">
          <div className="my-16">
            <ExperiencePage />
          </div>
        </div>

        <div id="projects" className="w-full border-b border-[#b8b8b8]">
          <div className="my-16">
            <ProjectsPage />
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
