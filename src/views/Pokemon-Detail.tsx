import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import { usePokemonStore } from '../state/pokemonStore';
import { loadCurrentPokemon, toggleButton } from '../controllers/PokemonController';
import { speciesDescription, speciesHeight, speciesWeight } from '../shared/constants';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import SettingsIcon from '@mui/icons-material/Settings';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

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

    

    /*-- Button Controls */
    const isVoiceActive = true;
    const isCryActive = true;

    /*-- ClassNames Variables --*/
    const bgColour = 'bg-teal-400';
    const bgStyles = 'flex flex-col container w-screen h-dvh p-2 ' + bgColour;
    const voiceIcon = isVoiceActive ? 'text-teal-400' : 'text-slate-300';
    const cryIconColour = isCryActive ? 'text-teal-400' : 'text-slate-300';
    //TODO: make icon colour dynamic using bgColour 

    /*-- Conditional Rendering --*/
    const [isVoicePlaying, setIsVoicePlaying] = useState(true);
    const [isCryPlaying, setIsCryPlaying] = useState(true);
    
    let cryButton;
    if (isCryPlaying) {
        cryButton = <StopCircleOutlinedIcon className={cryIconColour}/>;
    } else {
        cryButton = <MusicNoteIcon className={cryIconColour}/>;
    }
    let voiceButton;
    if (isVoicePlaying) {
        voiceButton = <StopCircleOutlinedIcon className={voiceIcon}/>;
    } else {
        voiceButton = <SpatialAudioOffIcon className={voiceIcon}/>;
    }

    return (
        <div className={bgStyles}>
            <Card pokemon={currentPokemon} isBig={true} />
            <section id='species-container'>
                <span className='text-slate-600 font-semibold'>Species</span>
                <div className="card card-side !p-0 bg-white shadow text-black overflow-hidden mt-2">
                    <div className="card-body grid grid-cols-2 gap-4 py-4 px-4 text-slate-500">
                        <div className='col-span-2'>
                            <div className="outline outline-[0.5px] rounded-md outline-black/30 px-5 py-1">
                                {speciesDescription}
                            </div>
                            <span className='text-slate-400 text-xs'>Pokedex entry (from Pokemon Scarlet)</span>
                        </div>
                        <div className='col-span-1'>
                            <div className="outline outline-[0.5px] rounded-md outline-black/30 px-5 py-1">
                                {speciesHeight}
                            </div>
                            <span className='text-slate-400 text-xs'>Height</span>
                        </div>
                        <div className='col-span-1'>
                            <div className='outline outline-[0.5px] rounded-md outline-black/30 px-5 py-1'>
                                {speciesWeight}
                            </div>
                            <span className='text-slate-400 text-xs'>Weight</span>
                        </div>
                        <div className='col-span-1'>
                            <div className='outline outline-[0.5px] rounded-md outline-black/30 flex gap-2 justify-center'>
                                <span className='btn btn-sm btn-ghost'  onClick={() => toggleButton(isVoicePlaying, setIsVoicePlaying)}>
                                    {voiceButton}
                                </span>
                                <span className='btn btn-sm btn-ghost'>
                                    <SettingsIcon className='text-slate-300'/>
                                </span>
                            </div>
                            <span className='text-slate-400 text-xs'>dataDex Voice</span>
                        </div>
                        <div className='col-span-1'>
                            <div className='outline outline-[0.5px] rounded-md outline-black/30'>
                                <span className='btn btn-sm btn-ghost flex items-center' onClick={() => toggleButton(isCryPlaying, setIsCryPlaying)}>
                                    {cryButton}
                                </span>
                            </div>
                            <span className='text-slate-400 text-xs'>Cry</span>
                        </div>
                    </div>
                
                </div>
            </section>
        </div>
    )
    
}

export default PokemonDetail;