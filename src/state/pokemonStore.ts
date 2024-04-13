import { create } from 'zustand';
import { PokemonProps } from '../shared/models';

const initPokemonState: PokemonProps = {
    id: 1,
    order: 0,
    name: '',
    types: [{
        slot: '',
        type: {
            name: ''
        }
    }],
    sprites: {
        other: {
            'official-artwork': {
                front_default: ''
            }
        }
    }
}

interface PokemonState {
    pokemons: PokemonProps[];
    setPokemons: (pokemon: PokemonProps) => void;
    currentPokemon: PokemonProps;
    setCurrentPokemon: (id: number) => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
    pokemons: [],
    setPokemons: (pokemon: PokemonProps) => set((state) => ({pokemons: [...state.pokemons, pokemon]})),
    currentPokemon: initPokemonState,
    setCurrentPokemon: (id: number) => set((state) => ({currentPokemon: state.pokemons.filter((pokemon) => pokemon.id === id)[0]}))
}))