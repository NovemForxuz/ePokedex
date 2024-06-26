import { Link } from "react-router-dom";
import { usePokemonStore } from "../state/pokemonStore";
import Card from "../components/Card";
import Header from "../components/Header";
import emptyFavouritesBg from '../assets/empty-favourite-bg-image.svg';
import emptyCapturesBg from '../assets/empty-capture-bg-image.svg';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface UserPokemonListProp {
    mode: string
}

const UserPokemonList = ({ mode }: UserPokemonListProp) => {
    const { pokemons, favourites, captures, removeAllFavourite, removeAllCapture } = usePokemonStore();

    const captureRate: string = (captures.length / pokemons.length * 100).toFixed(1) + '%';

    const backgroundImg = mode === 'favourites' ? emptyFavouritesBg : emptyCapturesBg;

    return (
        <>
            <div className="flex flex-col container w-screen h-dvh">
                {mode === 'favourites' ? 
                <>
                    <Header title='PokeDex' active='favourites'/>
                    <div className="w-full h-12 bg-neutral-600 flex flex-row text-white p-2 px-6 justify-between items-center z-10">
                        <h4>Favourites</h4>
                        <div className="inline-flex flex-row gap-6 items-center">
                            <Link to='/'>
                                <ArrowBackIcon className="text-white"/>
                            </Link>
                            <div className='cursor-pointer' onClick={() => document.getElementById('fav_delete_modal')!.classList.add('modal-open')}>
                                <DeleteIcon />
                            </div>
                            <dialog id="fav_delete_modal" className="modal z-50">
                                <div className="modal-box text-left">
                                    <h3 className="font-bold text-lg text-black">Are you sure?</h3>
                                    <p className="py-4 text-gray-500">Clearing the list cannot be undone</p>
                                    <div className="modal-action">
                                        <form method="dialog" className="flex flex-row gap-3">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn" onClick={() => document.getElementById('fav_delete_modal')!.classList.remove('modal-open')}>CANCEL</button>
                                            <button className="btn" onClick={() => {document.getElementById('fav_delete_modal')!.classList.remove('modal-open');removeAllFavourite();}}>CLEAR</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                    
                    {favourites.length ? 
                    <div className="flex-auto p-2 pt-3 overflow-scroll">
                        {pokemons.filter((p) => favourites.includes(p.id) ).map(({ id, name, order, types, sprites }) => {
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
                    :
                    <>
                        <div className="w-full h-full overflow-hidden">
                            <div className="h-full flex flex-col justify-center items-center">
                                <img className="w-44" src={backgroundImg} alt="no favourites list" />
                                <p className="w-10/12 mt-2 font-medium text-lg text-gray-500">You did not mark any Pokemon as favourite...</p>
                            </div>
                        </div>
                        <div className="flex flex-row mb-6 mx-6">
                            <div className="w-[5px] bg-gray-500 h-full"></div>
                            <div className="w-full flex-flex-col pl-4">
                                <div className="flex flex-row gap-3 text-gray-500">
                                    <InfoOutlinedIcon className=""/>
                                    <span className="font-medium">Note</span>
                                </div>
                                <p className="w-11/12 mt-2 font-medium text-gray-400 text-left pl-1 leading-5 mb-1">Mark a Pokemon as favourite by tapping the star icon next to it.</p>
                            </div>
                        </div>
                    </>
                    }
                    
                </> 
                : 
                <>
                    <Header title='PokeDex' active='captured'/>
                    <div className="w-full h-12 bg-neutral-600 flex flex-row text-white p-2 px-6 justify-between items-center z-10">
                        <div className="inline-flex flex-row gap-4">
                            <span>{captureRate}</span>
                            <h4>Caught Checklist</h4>
                        </div>
                        <div className="inline-flex flex-row gap-6 items-center">
                            <Link to='/'>
                                <ArrowBackIcon className="text-white"/>
                            </Link>
                            <div className='cursor-pointer' onClick={() => document.getElementById('captured_delete_modal')!.classList.add('modal-open')}>
                                <DeleteIcon />
                            </div>
                            <dialog id="captured_delete_modal" className="modal z-50">
                                <div className="modal-box text-left">
                                    <h3 className="font-bold text-lg text-black">Are you sure?</h3>
                                    <p className="py-4 text-gray-500">Clearing the list cannot be undone</p>
                                    <div className="modal-action">
                                        <form method="dialog" className="flex flex-row gap-3">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn" onClick={() => document.getElementById('captured_delete_modal')!.classList.remove('modal-open')}>CANCEL</button>
                                            <button className="btn" onClick={() => {document.getElementById('captured_delete_modal')!.classList.remove('modal-open');removeAllCapture();}}>CLEAR</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>

                    {captures.length ? 
                    <div className="flex-auto p-2 pt-3 overflow-scroll">
                        {pokemons.filter((p) => captures.includes(p.id) ).map(({ id, name, order, types, sprites }) => {
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
                    :
                    <>
                        <div className="w-full h-full overflow-hidden">
                            <div className="h-full flex flex-col justify-center items-center">
                                <img className="w-44" src={backgroundImg} alt="no favourites list" />
                                <p className="w-10/12 mt-2 font-medium text-lg text-gray-500">You did not mark any Pokemon as caught...</p>
                            </div>
                        </div>
                        <div className="flex flex-row mb-6 mx-6">
                            <div className="w-[5px] bg-gray-500 h-full"></div>
                            <div className="w-full flex-flex-col pl-4">
                                <div className="flex flex-row gap-3 text-gray-500">
                                    <InfoOutlinedIcon className=""/>
                                    <span className="font-medium">Note</span>
                                </div>
                                <p className="w-11/12 mt-2 font-medium text-gray-400 text-left pl-1 leading-5 mb-1">Mark a Pokemon as caught by tapping the circle icon next to it.</p>
                            </div>
                        </div>
                    </>
                    }
                </>
                }
            </div>
        </>
    )
}

export default UserPokemonList