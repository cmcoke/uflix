import { Routes, Route } from "react-router-dom";
import { SideBar, Home, Trending, TvShows, TvShowInformation, Movies, MovieInformation } from './';

const App = () => {
  return (
    <div>

      <aside>
        <SideBar />
      </aside>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/tv-shows/genre/:name' element={<TvShows />} />
          <Route path='/tv/:id' element={<TvShowInformation />} />
          <Route path='/movies/genre/:name' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInformation />} />
        </Routes>
      </main>

    </div>
  )
}

export default App