import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import { Recipes } from './pages/Recipes';

function App() {
  return (
    <Router>
      <div>
        <header className='w-full h-[7svh] min-h-10'>
          <Navbar />
        </header>

        <main className='w-[90svw] m-auto'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
