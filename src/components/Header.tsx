import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarsIcon from '@mui/icons-material/Stars';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

type HeaderProps = { title: string };

const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <div className="drawer z-20 shadow-md">
        <input type="checkbox" className="drawer-toggle" id="my-drawer-3" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 text-xl font-medium">{title}</div>
            <div className="flex-none lg:block">
              <ul className='menu menu-horizontal '>
                {/* Navbar menu content */}
                <li className='my-auto'><Link to={'favourites'}><StarsIcon className='text-neutral-600' /></Link></li>
                <li className='my-auto'><Link to={'captured'}><CheckCircleIcon className='text-neutral-600' /></Link></li>
                <li>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                      <MoreVertIcon />
                    </div>
                    <ul className='dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52'>
                      <li><a href="">Item 1</a></li>
                      <li><a href="">Item 2</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Page content */}
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default Header;