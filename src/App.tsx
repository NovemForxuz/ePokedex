import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import PokemonDetail from './views/Pokemon-Detail'

import './App.css'
import UserPokemonList from './views/UserPokemonList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favourites' element={<UserPokemonList mode='favourites'/>}/>
      <Route path='/captured' element={<UserPokemonList mode='captured'/>}/>
      <Route path='/pokemon/:id' element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;
