import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import locationIcon from '../assets/icons/mdi_location.png';
import swordIcon from '../assets/icons/mdi_sword.png';

const Sidebar = () => {
    return (
        <div className="drawer-side z-20">
            <label htmlFor="my-drawer-3" aria-label='close sidebar' className="drawer-overlay"></label>
            <ul className='menu p-4 w-80 min-h-full bg-base-200'>
                {/* Sidebar content */}
                <li><h1 className='mx-auto px-auto'><span className='text-red-600'>e</span><span className='text-neutral-600'>Pokedex</span></h1></li>
                <li><div className="divider m-0"></div> </li>
                <li>
                    <a href="">
                        <CatchingPokemonTwoToneIcon />
                        Pokedex
                    </a>
                </li>
                <li>
                    <a href="">
                        <img src={swordIcon} alt="" />
                        Move Dex
                    </a>
                </li>
                <li>
                    <a href="">
                        <AutoAwesomeIcon />
                        Ability Dex
                    </a>
                </li>
                <li>
                    <a href="">
                        <img src={locationIcon} alt="" />
                        Ability Dex
                    </a>
                </li>
                <li>
                    <a href="">
                        <LocalOfferIcon />
                        Type Dex
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;