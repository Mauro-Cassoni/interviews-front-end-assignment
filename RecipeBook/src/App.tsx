import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <div>
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
