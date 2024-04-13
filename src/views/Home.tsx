import { useEffect, useRef } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
// import { PokemonProps } from '../shared/models'
import { loadPokemons } from '../controllers/HomeController'
import { usePokemonStore } from '../state/pokemonStore'

const Home = () => {
    const initialized = useRef(false);
    // const [pokemons, setPokemons] = useState<PokemonProps[]>([])
    const { pokemons, setPokemons } = usePokemonStore();
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const abortController = new AbortController();
            loadPokemons(setPokemons)
            
            return () => abortController.abort();
        }
    }, [])
    
    return (
        <div className="flex flex-col container w-screen h-dvh">
            <Header title='PokeDex' />
            <div className="flex-auto p-2 pt-3 overflow-scroll">
                {pokemons.map(({ id, name, order, types, sprites }) => {
                    const pokemonProps = {
                        id,
                        name,
                        order,
                        types,
                        sprites
                    }
                    return <div key={order}>
                        <Card key={order} isBig={false} pokemon={pokemonProps}/>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home;