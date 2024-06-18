import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarsIcon from '@mui/icons-material/Stars';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { usePokemonStore } from '../state/pokemonStore';

type HeaderProps = { title: string, active?: string };

const Header = ({ title, active }: HeaderProps) => {
  const { setAllCapture } = usePokemonStore();
  
  const navIconColour = !active ? 
  { fav: 'text-neutral-600', caught: 'text-neutral-600'} 
    : active === 'favourites' ?
      { fav: 'text-amber-500', caught: 'text-neutral-600'} 
      : { fav: 'text-neutral-600', caught:'text-green-600'};

  return (
    <>
      <div className="drawer shadow-md">
        <input type="checkbox" className="drawer-toggle" id="my-drawer-3" />
        <div className="drawer-content flex flex-col bg-base-300 pb-4">
          {/* Navbar */}
          <div className="navbar pb-0">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 text-xl font-medium">{title}</div>
            <div className="flex-none lg:block">
              <ul className='menu menu-horizontal '>
                {/* Navbar menu content */}
                <li className='my-auto'><Link to={'/favourites'}><StarsIcon className={navIconColour.fav} /></Link></li>
                <li className='my-auto'><Link to={'/captured'}><CheckCircleIcon className={navIconColour.caught} /></Link></li>
                <li>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                      <MoreVertIcon />
                    </div>
                    <ul id="menu_dropdown" tabIndex={0} className='dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52'>
                      <li><span className='px-4 py-2' onClick={() => {document.getElementById('capture_all_modal')!.classList.add('modal-open');document.getElementById('menu_dropdown')!.blur()}}>Mark all as caught</span></li>
                      <li><a href="/">Settings</a></li>
                    </ul>
                    <dialog id="capture_all_modal" className="modal z-50">
                        <div className="modal-box text-left">
                            <h3 className="font-bold text-lg text-black">Are you sure?</h3>
                            <p className="py-4 text-gray-500">This action will mark all Pokemon as caught. This can be undone by tapping the trash can icon in Checklist.</p>
                            <div className="modal-action">
                                <form method="dialog" className="flex flex-row gap-3">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn" onClick={() => document.getElementById('capture_all_modal')!.classList.remove('modal-open')}>CANCEL</button>
                                    <button className="btn" onClick={() => {document.getElementById('capture_all_modal')!.classList.remove('modal-open');setAllCapture();}}>MARK</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex flex-row w-full justify-between px-5'>
            <button className='btn btn-sm'>ALL GAME VERSION</button>
            <button className='btn btn-sm'>ALL GENS</button>
            <button className='btn btn-sm'>ALL TYPES</button>
          </div>
          {/* Page content */}
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Header;