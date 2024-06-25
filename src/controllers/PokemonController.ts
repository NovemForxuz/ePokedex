import { api } from "../service/Api";
import { PokemonProps } from "../shared/models";

export const sortCards = (unsorted: PokemonProps[]): PokemonProps[] => {
    const sorted = unsorted.sort((a,b) => a.order - b.order);
    return sorted;
}

const fetchPokemon = (id: number) => Promise.resolve(api<PokemonProps>(`https://pokeapi.co/api/v2/pokemon/${id}/`))

export const isPokemonExists = (id: number, pokemons: PokemonProps[]): PokemonProps => {
    return pokemons.filter((pokemon) => pokemon.id === id)[0];
}

type loadPokemonsProps = {
    pokemons: PokemonProps[];
    setPokemons: (pokemon: PokemonProps) => void;
}

export const loadPokemons = async({pokemons, setPokemons}: loadPokemonsProps) => {
    const count = 100;
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

type loadCPokemonProps = {
    id: string | number;
    setCurrentPokemon: (id: number) => void;
}

export const loadCurrentPokemon = ({ id, setCurrentPokemon }: loadCPokemonProps) => {
    setCurrentPokemon(Number(id));
};

export const isFavourite = (id: number, favourites: number[]) => {
    return favourites.filter((pid) => pid === id)[0] ? true : false;
}

export const isCaptured = (id: number, captures: number[]) => {
    return captures.filter((pid) => pid === id)[0] ? true : false;
}

export const toggleButton = (isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (isActive) {
        setIsActive(false);
    } else {
        setIsActive(true);
    }
}

