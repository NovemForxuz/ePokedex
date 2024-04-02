import { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
import { PokemonProps } from '../shared/models'
import { loadPokemons } from '../controllers/HomeController'

const Home = () => {
    const initialized = useRef(false);
    const [pokemons, setPokemons] = useState<PokemonProps[]>([])
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
                    return <div key={order}>
                        <Card key={order} id={id} name={name} order={order} types={types} sprites={sprites} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home