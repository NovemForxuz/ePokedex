import React, { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
import { PokemonProps } from '../shared/models'
import { api } from '../service/Api'

const Home = () => {
    const initialized = useRef(false);
    const count = 100;
    const [pokemons, setPokemons] = useState<PokemonProps[]>([])
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const abortController = new AbortController();

            for (let i = 1; i < count; i++) {
                // console.log("count", i)
                api<PokemonProps>(`https://pokeapi.co/api/v2/pokemon/${i}/`)
                    .then(({ name, order, types, sprites }) => {
                        // console.log(name, order, types, sprites);
                        setPokemons(prevState => [...prevState, {
                            name,
                            order,
                            types,
                            sprites
                        }]);
                    })
                    .then(() => {
                        // console.log(pokemons)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
            console.log("i fire card once")
            return () => abortController.abort();
        }
    }, [])

    return (
        <div className="flex flex-col container w-screen h-dvh">
            <Header title='PokeDex' />
            <div className="flex-auto p-2 pt-3 overflow-scroll">
                {pokemons.map(({ name, order, types, sprites }) => {
                    return <div key={order}>
                        <Card key={order} name={name} order={order} types={types} sprites={sprites} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home