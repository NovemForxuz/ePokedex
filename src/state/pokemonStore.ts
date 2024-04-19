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
    favourites: number[];
    setFavourite: (id: number) => void;
    removeFavourite: (id: number) => void;
    removeAllFavourite: () => void;
    captures: number[];
    setCapture: (id: number) => void;
    setAllCapture: () => void;
    removeCapture: (id: number) => void;
    removeAllCapture: () => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
    pokemons: [],
    setPokemons: (pokemon: PokemonProps) => set((state) => ({pokemons: [...state.pokemons, pokemon]})),
    currentPokemon: initPokemonState,
    setCurrentPokemon: (id: number) => set((state) => ({currentPokemon: state.pokemons.filter((pokemon) => pokemon.id === id)[0]})),
    favourites: [],
    setFavourite: (id: number) => set((state) => ({favourites: [...state.favourites, id]})),
    removeFavourite: (id: number) => set((state) => ({favourites: state.favourites.filter((pid) => pid !== id)})),
    removeAllFavourite: () => set(() => ({favourites: []})),
    captures: [],
    setCapture: (id: number) => set((state) => ({captures: [...state.captures, id]})),
    setAllCapture: () => set((state) => ({captures: state.pokemons.map(({id}) => id)})),
    removeCapture: (id: number) => set((state) => ({captures: state.captures.filter((pid) => pid !== id)})),
    removeAllCapture: () => set(() => ({captures: []}))
}))