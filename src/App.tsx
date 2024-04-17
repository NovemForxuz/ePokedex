import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import PokemonDetail from './views/Pokemon-Detail'

import './App.css'
import CustomPokemonList from './views/CustomPokemonList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favourites' element={<CustomPokemonList mode='favourites'/>}/>
      <Route path='/captured' element={<CustomPokemonList mode='captured'/>}/>
      <Route path='/pokemon/:id' element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;
