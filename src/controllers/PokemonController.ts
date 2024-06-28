import { api } from "../service/commonService";
import { PokemonProps } from "../shared/models";

export const sortCards = (unsorted: PokemonProps[]): PokemonProps[] => {
    const sorted = unsorted.sort((a,b) => a.order - b.order);
    return sorted;
};

const fetchPokemon = (id: number) => Promise.resolve(api<PokemonProps>(`https://pokeapi.co/api/v2/pokemon/${id}/`))

export const isPokemonExists = (id: number, pokemons: PokemonProps[]): PokemonProps => {
    return pokemons.filter((pokemon) => pokemon.id === id)[0];
};

type loadPokemonsProps = {
    pokemons: PokemonProps[];
    setPokemons: (pokemon: PokemonProps) => void;
};

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
};

type loadCPokemonProps = {
    id: string | number;
    setCurrentPokemon: (id: number) => void;
};

export const loadCurrentPokemon = ({ id, setCurrentPokemon }: loadCPokemonProps) => {
    setCurrentPokemon(Number(id));
};

export const isFavourite = (id: number, favourites: number[]) => {
    return favourites.filter((pid) => pid === id)[0] ? true : false;
};

export const isCaptured = (id: number, captures: number[]) => {
    return captures.filter((pid) => pid === id)[0] ? true : false;
};

export const toggleButton = (isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (isActive) {
        setIsActive(false);
    } else {
        setIsActive(true);
    }
};

export type statsProps = {
    hp: number,
    attack: number,
    defense: number,
    spAttack: number,
    spDefense: number,
    speed: number,
    total?: number
};

export const convertStatRatio = (stats: statsProps): statsProps => {
    const max = findMax(stats);
    const statRatio: statsProps = {
        hp: stats.hp/max *100,
        attack: stats.attack/max *100,
        defense: stats.defense/max *100,
        spAttack: stats.spAttack/max *100,
        spDefense: stats.spDefense/max *100,
        speed: stats.speed/max *100,
        total: stats.total
    }
    console.log("max:", max);
    return statRatio;
}

const findMax = (iterable: statsProps): number => {
    let max = 0;
    Object.values(iterable).map((prop, i) => {
        if(i < Object.keys(iterable).length-1){
            if(max < prop) {
                max = prop;
            }
        }
    });
    return max;
}

export const formatedWidth = (stat: number): string => {
    console.log("rounded",stat,Math.round(stat));
    
    return Math.round(stat) + '%';
}

