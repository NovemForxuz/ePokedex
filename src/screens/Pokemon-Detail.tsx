import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import { PokemonProps } from '../shared/models';
import { api } from '../service/Api';

const PokemonDetail = () => {
    let { id = 1 } = useParams();
    const initPokemon: PokemonProps = {
        id: +id,
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
    const [pokemon, setPokemon] = useState<PokemonProps>(initPokemon);

    const fetchPokemon = useMemo(() => {
        api<PokemonProps>(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(({ id, name, order, types, sprites }) => {
                setPokemon({
                    id,
                    name,
                    order,
                    types,
                    sprites
                })
            })
    }, []);

    useEffect(() => {
        fetchPokemon;
    },[]);

    return (
        <>
            <Card pokemon={pokemon} isBig={true} />
            <h1>PokemonDetail {id}</h1>
        </>
    )
}

export default PokemonDetail;