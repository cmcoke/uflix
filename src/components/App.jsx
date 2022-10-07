import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SideBar, Home, Trending, TvShows, TvShowInformation, Movies, MovieInformation, UpcomingMovies, TvShowsAiringToday, TrendingMovies, TrendingTvShows } from './';
import { menu, closeBlack } from '../assets/index';

const App = () => {

  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(prevState => !prevState);
    document.querySelector("body").classList.toggle("active");
  }

  return (
    <div className="bg-black font-poppins text-white flex w-full min-h-screen overflow-hidden">

      <aside className={`border-r border-neutral-900 bg-black transform top-0 left-0 sm:left-[120px] w-[120px] fixed h-full overflow-auto ease-in-out transition-all duration-300 z-10 ${toggle ? 'translate-x-0' : '-translate-x-full'}`}>
        <SideBar />
      </aside>

      <main className="flex-1 relative z-0 sm:pl-[7rem]">

        {/* shows the hamburger menu icon only on mobile screens */}
        <div className="ss:hidden absolute right-7 top-4 bg-white p-2 rounded-full">
          <img src={toggle ? closeBlack : menu} alt={toggle ? 'close button' : 'menu button'} onClick={handleClick} />
        </div>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/trending-now' element={<Trending />} />
          <Route exact path='/trending/movies' element={<TrendingMovies />} />
          <Route exact path='/trending/tv-shows' element={<TrendingTvShows />} />
          <Route exact path='/tv-show/genre/:name' element={<TvShows />} />
          <Route exact path='/tv-show/:id' element={<TvShowInformation />} />
          <Route exact path='/movie/genre/:name' element={<Movies />} />
          <Route exact path='/movie/:id' element={<MovieInformation />} />
          <Route exact path='/movie/upcoming-movies' element={<UpcomingMovies />} />
          <Route exact path='/tv/tv-shows-airing-today' element={<TvShowsAiringToday />} />
        </Routes>
      </main>

    </div>
  )
}

export default App