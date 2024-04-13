import { api } from "../service/Api";
import { PokemonProps } from "../shared/models";

export const sortCards = (unsorted: PokemonProps[]): PokemonProps[] => {
    const sorted = unsorted.sort((a,b) => a.order - b.order);
    return sorted;
}

const fetchPokemon = (id: number) => Promise.resolve(api<PokemonProps>(`https://pokeapi.co/api/v2/pokemon/${id}/`))

export const isPokemonExists = (id: number, pokemons: PokemonProps[]): PokemonProps => {
    const result = pokemons.filter((pokemon) => pokemon.id === id)[0];
    console.log("Pokemon", id, result);
    return result;
}

type loadPokemonsProps = {
    pokemons: PokemonProps[], 
    setPokemons: (pokemon: PokemonProps) => void
}

export const loadPokemons = async({pokemons, setPokemons}: loadPokemonsProps) => {
    const count = 100;
    console.log("set pokemons:", setPokemons)
    console.log("pokemons:", pokemons.length)
    for (let i = 1; i < count; i++) {
        if(!isPokemonExists(i, pokemons)) {
            await fetchPokemon(i)
                .then(({ id, name, order, types, sprites }) => {
                    setPokemons({ id, name, order, types, sprites })
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }
}

