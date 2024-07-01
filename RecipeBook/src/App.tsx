import './App.scss'
import Navbar from './components/Navbar'
import RecipeList from './components/RecipeList'

function App() {

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className=''>
        <RecipeList />
      </main>
    </>
  )
}

export default App
