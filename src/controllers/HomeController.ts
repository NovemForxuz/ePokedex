import { api } from "../service/Api";
import { PokemonProps } from "../shared/models";

export const sortCards = (unsorted: PokemonProps[]): PokemonProps[] => {
    const sorted = unsorted.sort((a,b) => a.order - b.order);
    return sorted;
}

const fetchPokemon = (id: number) => Promise.resolve(api<PokemonProps>(`https://pokeapi.co/api/v2/pokemon/${id}/`))

export const loadPokemons = async(setPokemons: (pokemon: PokemonProps) => void) => {
    const count = 100;
    for (let i = 1; i < count; i++) {
        await fetchPokemon(i)
            .then(({ id, name, order, types, sprites }) => {
                // setPokemons(prevState => [...prevState, {
                //     id,
                //     name,
                //     order,
                //     types,
                //     sprites
                // }]);
                setPokemons({ id, name, order, types, sprites })
                // console.log("pokemons", pokemons);
            })
            .catch(error => {
                console.error(error)
            })
    }
}

