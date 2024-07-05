import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import { Recipes } from './pages/Recipes';
import { Search } from './pages/Search';
import NavbarMobile from './components/NavbarMobile';
import { Account } from './pages/Account';
import NewRecipeForm from './components/NewRecipeForm';

function App() {
  return (
    <Router>
      <div>
        <header className='w-full h-[7svh] min-h-10 fixed top-0 z-10 hidden md:block'>
          <Navbar />
        </header>

        <header className='w-full h-[7svh] min-h-10 fixed bottom-0 z-10 md:hidden'>
          <NavbarMobile />
        </header>

        <main className='w-[85svw] m-auto'>
          <div className='w-full md:h-[8svh] md:min-h-10 mb-8' />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/new-recipe" element={<NewRecipeForm />} />
          </Routes>

          <div className='w-full h-[8svh] min-h-10 mt-8 md:hidden' />
        </main>
      </div>
    </Router>
  );
}

export default App;
