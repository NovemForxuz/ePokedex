import { Link } from 'react-router-dom';
import { species } from '../assets/pokeapi_bulbasaur'
import { captitalizedFirstLetter, formatId } from '../shared/format';
import { PokemonProps } from '../shared/models';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { usePokemonStore } from '../state/pokemonStore';
import { isFavourite } from '../controllers/PokemonController';

type CardProps = {
    isBig: boolean,
    pokemon: PokemonProps,
}

const Card = ({ isBig, pokemon }: CardProps) => {
    const { id, name, types, sprites } = pokemon;
    const { favourites, setFavourite, removeFavourite } = usePokemonStore();

    type TypeBadgeProps = {
        type: string,
        textClassN?: string
        divClassN?: string
    }

    const TypeBadge = ({ type, textClassN = '', divClassN = '' }: TypeBadgeProps) => {
        const divClassName = 'badge badge-lg w-full bg-transparent border-slate-500 border-1 rounded-lg ' + divClassN;
        const txtClassName = 'text-slate-500 font-light ' + textClassN;
        return (
            <div className={divClassName}>
                <span className={txtClassName}>{type.toUpperCase()}</span>
            </div>
        )
    }

    const handleFavouriteClick = (e: React.MouseEvent<HTMLElement>) => {
        isFavourite(id, favourites) ? removeFavourite(id) : setFavourite(id);
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <>
            {isBig ?
                <div className="card card-side !p-0 bg-neutral-200 shadow text-black overflow-hidden mb-3">
                    <div className="card-body flex flex-col gap-y-2 py-2 px-3">

                        <div className="flex flex-row justify-between">
                            <span className="text-xl text-slate-600">{captitalizedFirstLetter(name)}</span>
                            <span className="font-light text-slate-600 pr-1">{formatId(id, 3)}</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="text-slate-500">
                                {species.genera.filter((type) => type.language.name === 'en')[0].genus}
                            </span>
                            <div className="flex flex-row gap-x-4 pr-1 text-slate-500">
                                <div className="flex items-center cursor-pointer" onClick={(e) => handleFavouriteClick(e)}>
                                    {isFavourite(id, favourites) ? <StarIcon /> : <StarBorderIcon />}
                                </div>    
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
                <Link to={`pokemon/${id}`}>
                    <div className="card card-side !p-0 bg-neutral-200 shadow text-black overflow-hidden mb-3">
                        <div className="card-body flex flex-col gap-y-2 py-2 px-3">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-x-5">
                                    <span className="font-light">{formatId(id, 3)}</span>
                                    <span className="text-slate-700">{captitalizedFirstLetter(name)}</span>
                                </div>
                                <div className="flex flex-row items-center gap-x-4 pr-1 text-slate-500">
                                    <div className="flex items-center cursor-pointer" onClick={(e) => handleFavouriteClick(e)}>
                                        {isFavourite(id, favourites) ? <StarIcon /> : <StarBorderIcon />}
                                    </div>
                                    <RadioButtonUncheckedIcon />
                                </div>
                            </div>
                            <div className="flex flex-row gap-x-4">
                                {types.map(({ slot, type }) => (
                                    <TypeBadge key={slot} type={type.name} divClassN='p-4' />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center content-center w-32 h-[85px] relative">
                            <div className='absolute top-0.5 left-[26px] bg-white opacity-75 w-[100px] h-[81px] rounded-2xl'></div>
                            <div className='absolute top-0.5 right-10 bg-white opacity-75 w-[85px] h-[81px] rounded-full'></div>
                            <figure className='w-20 z-10'><img src={sprites.other['official-artwork'].front_default} alt={name + "'s image"} /></figure>
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}

export default Card;