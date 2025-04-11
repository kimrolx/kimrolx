import { useState } from 'react';
import './App.css';
import TopBar from './components/top-bar/TopBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <TopBar />

      <div>zzzz</div>
    </div>
  );
}

export default App;
