import React from 'react'

const Sidebar = () => {
    return (
        <div className="drawer-side z-20">
            <label htmlFor="my-drawer-3" aria-label='close sidebar' className="drawer-overlay"></label>
            <ul className='menu p-4 w-80 min-h-full bg-base-200'>
                {/* Sidebar content */}
                <li><h1 className='mx-auto px-auto'><span className='text-red-600'>e</span><span className='text-neutral-600'>Pokedex</span></h1></li>
                <li><div className="divider m-0"></div> </li>
                <li><a href="">Pokedex</a></li>
                <li><a href="">Move Dex</a></li>
                <li><a href="">Ability Dex</a></li>
            </ul>
        </div>
    )
}

export default Sidebar