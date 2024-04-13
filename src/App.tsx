import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import PokemonDetail from './views/Pokemon-Detail'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pokemon/:id' element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;
