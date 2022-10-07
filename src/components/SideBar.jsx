import { NavLink } from 'react-router-dom';
import { logo, home, trending, movie, tv, search } from '../assets/index';

const SideBar = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-around sm:justify-between xs:py-3 sm:py-9 md:py-11 ss:fixed top-0 left-2'>

      <img src={logo} alt="logo" />

      <ul className='flex flex-col gap-y-[3rem] ss:gap-y-[3.3rem] xs:my-11'>

        <li onClick={() => { }}>
          <NavLink to='/' end className={({ isActive }) => isActive ? 'brightness-100 transition-all duration-[.40s] ease-in-out' : 'brightness-50 transition-all duration-[.40s] ease-in-out hover:brightness-100'} >
            <img src={home} alt="home" />
          </NavLink>
        </li>

        <li onClick={() => { }}>
          <NavLink to='/trending' className={({ isActive }) => isActive ? 'brightness-100 transition-all duration-[.40s] ease-in-out' : 'brightness-50 transition-all duration-[.40s] ease-in-out hover:brightness-100'}>
            <img src={trending} alt="trending" />
          </NavLink>
        </li>

        <li onClick={() => { }}>
          <NavLink to='/tv-shows/genre/:name' className={({ isActive }) => isActive ? 'brightness-100 transition-all duration-[.40s] ease-in-out' : 'brightness-50 transition-all duration-[.40s] ease-in-out hover:brightness-100'}>
            <img src={tv} alt="tv shows" />
          </NavLink>
        </li>

        <li onClick={() => { }}>
          <NavLink to='/movies/genre/:name' className={({ isActive }) => isActive ? 'brightness-100 transition-all duration-[.40s] ease-in-out' : 'brightness-50 transition-all duration-[.40s] ease-in-out hover:brightness-100'}>
            <img src={movie} alt="movies" />
          </NavLink>
        </li>

        <li onClick={() => { }}>
          <img src={search} alt="search" className={'brightness-50 transition-all duration-[.40s] ease-in-out hover:brightness-100 cursor-pointer'} />
        </li>

      </ul>

      <p className='font-poppins text-dimWhite text-center text-sm'>Created By <a href="https://charlescoke.com/" target="_blank" rel="noreferrer" className='transition-all duration-[.40s] ease-in-out text-dimWhite hover:text-blue-600'>C.Coke</a> </p>

    </div>
  )
}

export default SideBar