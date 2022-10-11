import { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { SideBar, Home, Trending, TvShows, TvShowInformation, Movies, MovieInformation, UpcomingMovies, TvShowsAiringToday, TrendingMovies, TrendingTvShows, TvShowCategories, MovieCategories, TvShowTrailer, MovieTrailer, Person, SearchForm, SearchResults } from './';
import { menu, closeBlack } from '../assets/index';
import { CSSTransition } from "react-transition-group";
import { tvShowModal, movieModal, tvShowTrailer, movieTrailer, searchQuery } from '../app/store';


const App = () => {

  const [toggle, setToggle] = useState(false);
  const isTvShowModalOpen = tvShowModal((state) => state.isTvShowModalOpen);
  const isMovieModalOpen = movieModal((state) => state.isMovieModalOpen);
  const isTvShowTrailerOpen = tvShowTrailer((state) => state.isTvShowTrailerOpen);
  const isMovieTrailerOpen = movieTrailer((state) => state.isMovieTrailerOpen);
  const isSearchModalOpen = searchQuery((state) => state.isSearchModalOpen);
  const userSearchQuery = searchQuery(state => state.userSearchQuery);
  const tvShowNodeRef = useRef(null);
  const movieNodeRef = useRef(null);
  const tvShowTrailerNodeRef = useRef(null);
  const movieTrailerNodeRef = useRef(null);
  const searchNodeRef = useRef(null);



  const handleClick = () => {
    setToggle(prevState => !prevState);
    document.querySelector("body").classList.toggle("active");
  }


  return (
    <div className="bg-black font-poppins text-white flex w-full min-h-screen overflow-hidden">

      <aside className={`border-r border-neutral-900 bg-black transform top-0 left-0 sm:left-[120px] w-[120px] fixed h-full overflow-auto ease-in-out transition-all duration-300 z-10 ${toggle ? 'translate-x-0' : '-translate-x-full'} ${isTvShowModalOpen || isMovieModalOpen || isSearchModalOpen ? 'modal-active' : ''} `}>
        <SideBar />
      </aside>

      <main className="flex-1 relative z-0 sm:pl-[7rem]">

        {/* shows the hamburger menu icon only on mobile screens */}
        <div className="ss:hidden absolute right-7 top-4 bg-white p-2 rounded-full">
          <img src={toggle ? closeBlack : menu} alt={toggle ? 'close button' : 'menu button'} onClick={handleClick} />
        </div>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trending-now' element={<Trending />} />
          <Route path='/trending/movies' element={<TrendingMovies />} />
          <Route path='/trending/tv-shows' element={<TrendingTvShows />} />
          <Route path='/tv-show/genre/:name' element={<TvShows />} />
          <Route path='/tv-show/:id' element={<TvShowInformation />} />
          <Route path='/movie/genre/:name' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path='/movie/upcoming-movies' element={<UpcomingMovies />} />
          <Route path='/tv/tv-shows-airing-today' element={<TvShowsAiringToday />} />
          <Route path='/person/:id' element={<Person />} />
          <Route path='/search/:query' element={<SearchResults userSearchQuery={userSearchQuery} />} />
        </Routes>

      </main>

      {/* shows the tv show categories component when clicking on the tv icon */}
      <CSSTransition timeout={330} in={isTvShowModalOpen} nodeRef={tvShowNodeRef} classNames='overlay' unmountOnExit>
        <div ref={tvShowNodeRef}>
          <TvShowCategories />
        </div>
      </CSSTransition>

      {/* shows the movie categories component when clicking on the film icon */}
      <CSSTransition timeout={330} in={isMovieModalOpen} nodeRef={movieNodeRef} classNames='overlay' unmountOnExit>
        <div ref={movieNodeRef}>
          <MovieCategories />
        </div>
      </CSSTransition>

      {/* shows a tv show's trailer */}
      <CSSTransition timeout={330} in={isTvShowTrailerOpen} nodeRef={tvShowTrailerNodeRef} classNames='overlay' unmountOnExit>
        <div ref={tvShowTrailerNodeRef}>
          <TvShowTrailer />
        </div>
      </CSSTransition>

      {/* shows a movies's trailer */}
      <CSSTransition timeout={330} in={isMovieTrailerOpen} nodeRef={movieTrailerNodeRef} classNames='overlay' unmountOnExit>
        <div ref={movieTrailerNodeRef}>
          <MovieTrailer />
        </div>
      </CSSTransition>

      {/* shows the search form when the search icon is clicked */}
      <CSSTransition timeout={330} in={isSearchModalOpen} nodeRef={searchNodeRef} classNames='overlay' unmountOnExit>
        <div ref={searchNodeRef}>
          <SearchForm />
        </div>
      </CSSTransition>

    </div>
  )

}

export default App