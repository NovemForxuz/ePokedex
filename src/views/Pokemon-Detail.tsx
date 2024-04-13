import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import { usePokemonStore } from '../state/pokemonStore';

const PokemonDetail = () => {
    const initialized = useRef(false);
    const { id = 1 } = useParams();

    const { currentPokemon, setCurrentPokemon } = usePokemonStore();

    const loadPokemon = useMemo(() => {
        setCurrentPokemon(Number(id));
    },[id, setCurrentPokemon]);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const abortController = new AbortController();
            loadPokemon;

            return () => abortController.abort();
        }
    }, [loadPokemon]);

    const bgColour = 'bg-teal-400';
    const classNames = 'flex flex-col container w-screen h-dvh p-2 ' + bgColour;
    return (
        <div className={classNames}>
            <Card pokemon={currentPokemon} isBig={true} />
        </div>
    )
}

export default PokemonDetail;