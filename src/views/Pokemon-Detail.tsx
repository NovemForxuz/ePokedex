import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import { usePokemonStore } from '../state/pokemonStore';
import { loadCurrentPokemon } from '../controllers/PokemonController';

const PokemonDetail = () => {
    const initialized = useRef(false);
    const { id = 1 } = useParams();

    const { currentPokemon, setCurrentPokemon } = usePokemonStore();

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const abortController = new AbortController();
            loadCurrentPokemon({id, setCurrentPokemon});

            return () => abortController.abort();
        }
    }, [id, setCurrentPokemon]);

    const bgColour = 'bg-teal-400';
    const classNames = 'flex flex-col container w-screen h-dvh p-2 ' + bgColour;
    return (
        <div className={classNames}>
            <Card pokemon={currentPokemon} isBig={true} />
        </div>
    )
}

export default PokemonDetail;