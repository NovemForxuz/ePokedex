import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import { PokemonProps } from '../shared/models';
import { api } from '../service/Api';

const PokemonDetail = () => {
    const initialized = useRef(false);
    const { id = 1 } = useParams();
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
        if (!initialized.current) {
            initialized.current = true;

            const abortController = new AbortController();
            fetchPokemon;

            return () => abortController.abort();
        }
    }, []);

    const bgColour = 'bg-teal-400';
    const classNames = 'flex flex-col container w-screen h-dvh p-2 ' + bgColour;
    return (
        <div className={classNames}>
            <Card pokemon={pokemon} isBig={true} />
        </div>
    )
}

export default PokemonDetail;