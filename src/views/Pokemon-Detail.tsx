import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from '../components/Card';
import { usePokemonStore } from '../state/pokemonStore';
import { loadCurrentPokemon, statsProps, toggleButton, convertStatRatio, formatedWidth } from '../controllers/PokemonController';
import { speciesDescription, speciesHeight, speciesWeight } from '../shared/constants';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import SettingsIcon from '@mui/icons-material/Settings';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

    /*-- Variables --*/
    const stats: statsProps = {
        hp: 45,
        attack: 0,
        defense: 49,
        spAttack: 65,
        spDefense: 95,
        speed: 45,
        total: 318
    }


    /*-- Button Controls */
    const isVoiceActive = true;
    const isCryActive = true;

    /*-- ClassNames Variables --*/
    const bgColour = 'bg-teal-400';
    const bgStyles = 'flex flex-col container w-screen p-2 ' + bgColour;
    const voiceIcon = isVoiceActive ? 'text-teal-400' : 'text-slate-300';
    const cryIconColour = isCryActive ? 'text-teal-400' : 'text-slate-300';
    //TODO: make icon colour dynamic using bgColour 

    /*-- Conditional Rendering --*/
    const [isVoicePlaying, setIsVoicePlaying] = useState(false);
    const [isCryPlaying, setIsCryPlaying] = useState(false);
    //create useState for stats
    const [statsWidth, setStatsWidth] = useState(stats);
    const loadStats = useMemo(() => {
        setStatsWidth(s => convertStatRatio(s));
    }, [setStatsWidth]);

    loadStats;
    
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
            <section id='species-container' className='mb-4'>
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
            <section id='abilities-container' className='mb-4'>
                <span className='text-slate-600 font-semibold'>Abilities</span>
                <div className="card card-side !p-0 bg-white shadow text-black overflow-hidden mt-2">
                    <div className="card-body flex flex-col gap-4 py-4 px-4 text-slate-500">
                        <div className='btn btn-block h-[32px] min-h-0 rounded-lg bg-teal-500 border-teal-500 relative'>
                            <span className='inline-block align-middle text-teal-700'>Overgrown</span>
                            <InfoOutlinedIcon className='absolute right-3 text-teal-700'/>
                        </div>
                        <div className='btn btn-block h-[32px] min-h-0 rounded-lg border-teal-500 bg-teal-50 relative overflow-hidden'>
                            <span className='inline-block align-middle text-teal-500'>
                                Chlorophyll
                            </span>
                            <InfoOutlinedIcon className='absolute right-3 text-teal-500'/>
                            <span className='absolute left-0 inline-block align-middle bg-teal-500 text-slate-600 p-4'>Hidden</span>
                        </div>
                    </div>
                </div>
            </section>
            <section id='base-stats-container' className='mb-4'>
            <span className='text-slate-600 font-semibold'>Base Stats</span>
                <div className="card card-side !p-0 bg-white shadow text-black overflow-hidden mt-2">
                    <div className="card-body flex flex-col gap-4 py-4 px-4 text-slate-500">
                        <div id='base-stats-nav' role='tablist' className='flex flex-row justify-between gap-4'>
                            <a role='tab' className='btn h-[32px] min-h-0 flex-1 rounded-lg bg-teal-600 border-teal-600 relative'>
                                <span className='text-teal-900'>Base Stats</span>
                            </a>
                            <a role='tab' className='btn h-[32px] min-h-0 flex-1 rounded-lg bg-teal-500 border-teal-500 relative'>
                                <span className='text-teal-700'>Min</span>
                            </a>
                            <a role='tab' className='btn h-[32px] min-h-0 flex-1 rounded-lg bg-teal-500 border-teal-500 relative'>
                                <span className='text-teal-700'>Max</span>
                            </a>
                        </div>
                
                        <div id='base-stats-content' className='flex flex-col gap-2'>
                            <div className="w-full rounded-lg flex flex-row relative overflow-hidden text-xs">
                                <span className='h-full w-1/3 max-w-24 left-0 inline-block align-middle bg-teal-600 text-slate-700 py-2 px-4'>Hp</span>
                                <div className='flex-1'>
                                    <div className='h-[32px] min-w-7 bg-teal-500 rounded-r-lg overflow-hidden' style={{'width': formatedWidth(statsWidth.hp)}}>
                                        <span className='float-right text-slate-600 py-2 px-4'>{stats.hp}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full rounded-lg flex flex-row relative overflow-hidden text-xs">
                                <span className='h-full w-1/3 max-w-24 left-0 inline-block align-middle bg-teal-600 text-slate-700 py-2 px-4'>Attack</span>
                                <div className="flex-1">
                                    <div className='h-[32px] min-w-7 bg-teal-500 rounded-r-lg overflow-hidden' style={{'width': formatedWidth(statsWidth.attack)}}>
                                        <span className='float-right text-slate-600 py-2 px-4'>{stats.attack}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full rounded-lg flex flex-row relative overflow-hidden text-xs">
                                <span className='h-full w-1/3 max-w-24 left-0 inline-block align-middle bg-teal-600 text-slate-700 py-2 px-4'>Defense</span>
                                <div className="flex-1">
                                    <div className='h-[32px] min-w-7 bg-teal-500 rounded-r-lg overflow-hidden' style={{'width': formatedWidth(statsWidth.defense)}}>
                                        <span className='float-right text-slate-600 py-2 px-4'>{stats.defense}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full rounded-lg flex flex-row relative overflow-hidden text-xs">
                                <span className='h-full w-1/3 max-w-24 left-0 inline-block align-middle bg-teal-600 text-slate-700 py-2 px-4'>Sp. Attack</span>
                                <div className="flex-1">
                                    <div className='h-[32px] min-w-7 bg-teal-500 rounded-r-lg overflow-hidden' style={{'width': formatedWidth(statsWidth.spAttack)}}>
                                        <span className='float-right text-slate-600 py-2 px-4'>{stats.spAttack}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full rounded-lg flex flex-row relative overflow-hidden text-xs">
                                <span className='h-full w-1/3 max-w-24 left-0 inline-block align-middle bg-teal-600 text-slate-700 py-2 px-4'>Sp. Defense</span>
                                <div className="flex-1">
                                    <div className='h-[32px] min-w-7 bg-teal-500 rounded-r-lg overflow-hidden' style={{'width': formatedWidth(statsWidth.spDefense)}}>
                                        <span className='float-right text-slate-600 py-2 px-4'>{stats.spDefense}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full rounded-lg flex flex-row relative overflow-hidden text-xs">
                                <span className='h-full w-1/3 max-w-24 left-0 inline-block align-middle bg-teal-600 text-slate-700 py-2 px-4'>Speed</span>
                                <div className="flex-1">
                                    <div className='h-[32px] min-w-7 bg-teal-500 rounded-r-lg overflow-hidden' style={{'width': formatedWidth(statsWidth.speed)}}>
                                        <span className='float-right text-slate-600 py-2 px-4'>{stats.speed}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
    
}

export default PokemonDetail;