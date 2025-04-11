import './App.css';
import TopBar from './components/top-bar/TopBar';
import AnimatedRandomHello from './components/animated-random-hello/AnimatedRandomHello';

function App() {
  return (
    <div className="min-h-svh min-w-svw">
      <TopBar />

      <div className="mx-96 my-8 relative z-10">
        <AnimatedRandomHello />
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
