import { useState, useEffect, useMemo, useRef } from 'react'
import { pokemon, species } from '../assets/pokeapi_bulbasaur'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { api } from '../service/Api';
import { captitalizedFirstLetter, formatId } from '../shared/format';

const Cards = () => {
    interface PokemonProps {
        name: string,
        order: string,
        types: [{
            slot: string,
            type: {
                name: string
            }
        }],
        sprites: {
            other: {
                'official-artwork': {
                    front_default: string
                }
            }
        }
        genus?: string
    }

    const initialized = useRef(false);
    const count = 100;
    const [pokemons, setPokemons] = useState<PokemonProps[]>([])
    useEffect(() => {
        if(!initialized.current) {
            initialized.current = true;

            const abortController = new AbortController();
    
            for(let i=1; i<count; i++){
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

    // const { name, order, types, sprites } = pokemon;
    const isPokemonDetails = false;

    type TypeBadgeProps = {
        type: string,
        textClassN?: string
        divClassN?: string
    }

    const TypeBadge = ({ type, textClassN = '', divClassN = '' }: TypeBadgeProps) => {
        const divClassName = 'badge badge-lg w-full bg-transparent border-slate-500 border-1 rounded-lg ' + divClassN;
        const txtClassName = 'text-slate-500 font-light ' + textClassN;
        return <div className={divClassName}>
            <span className={txtClassName}>{type.toUpperCase()}</span>
        </div>
    }

    const Card = ({ name, order, types, sprites }: PokemonProps) => isPokemonDetails ?
        <div className="card card-side !p-0 bg-neutral-200 shadow text-black overflow-hidden mb-3">
            <div className="card-body flex flex-col gap-y-2 py-2 px-3">

                <div className="flex flex-row justify-between">
                    <span className="text-xl text-slate-600">{captitalizedFirstLetter(name)}</span>
                    <span className="font-light text-slate-600 pr-1">{formatId(order, 3)}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span className="text-slate-500">
                        {species.genera.filter((type) => type.language.name === 'en')[0].genus}
                    </span>
                    <div className="flex flex-row gap-x-4 pr-1 text-slate-500">
                        <StarBorderIcon />
                        <RadioButtonUncheckedIcon />
                    </div>
                </div>

                <div className="flex flex-row gap-x-4">
                    {types.map(({ slot, type }) => (
                        <TypeBadge key={slot} type={type.name} textClassN='text-sm' divClassN='p-2' />
                    ))}
                </div>

            </div>
            <div className="flex justify-center content-center w-28 h-28 relative">
                <div className='absolute top-0.5 left-[30px] bg-white opacity-75 w-[80px] h-[108px] rounded-l-3xl rounded-r-2xl'></div>
                <div className='absolute top-0.5 right-1 bg-white opacity-75 w-[106px] h-[108px] rounded-full'></div>
                <figure className='w-28 z-10'><img src={sprites.other['official-artwork'].front_default} alt={name + "'s image"} /></figure>
            </div>
        </div>
        :
        <div className="card card-side !p-0 bg-neutral-200 shadow text-black overflow-hidden mb-2">
            <div className="card-body flex flex-col gap-y-2 py-2 px-3">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-x-5">
                        <span className="font-light">{formatId(order, 3)}</span>
                        <span className="text-slate-700">{captitalizedFirstLetter(name)}</span>
                    </div>
                    <div className="flex flex-row gap-x-4 pr-1 text-slate-500">
                        <StarBorderIcon />
                        <RadioButtonUncheckedIcon />
                    </div>
                </div>
                <div className="flex flex-row gap-x-4">
                    {types.map(({ slot, type }) => (
                        <TypeBadge key={slot} type={type.name} divClassN='p-4' />
                    ))}
                </div>
                {/* <p>Click the button to watch on Jetflix app.</p>
    <div className="card-actions justify-end">
        <button className="btn btn-primary">Watch</button>
    </div> */}
            </div>
            <div className="flex justify-center content-center w-32 h-[85px] relative">
                <div className='absolute top-0.5 left-[26px] bg-white opacity-75 w-[100px] h-[81px] rounded-2xl'></div>
                <div className='absolute top-0.5 right-10 bg-white opacity-75 w-[85px] h-[81px] rounded-full'></div>
                <figure className='w-20 z-10'><img src={sprites.other['official-artwork'].front_default} alt={name + "'s image"} /></figure>
            </div>
        </div>

    return (
        <>
            {/* {pokemons?.map(({name, order, types, sprites}, i) => {
                <Card key={i} name={name} order={order} types={types} sprites={sprites}/>
            })} */}
            {pokemons.map(({name, order, types, sprites}) => {
                return <div key={order}>
                    <Card key={order} name={name} order={order} types={types} sprites={sprites}/>
                </div>
            })}
        </>
    )
}

export default Cards