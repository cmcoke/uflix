import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchMovieGenres } from '../services/TMDBApi';
import BeatLoader from "react-spinners/BeatLoader";
import { movieModal, movieGenreOrCategory } from '../app/store';
import { closeWhite } from '../assets/index';

const MovieCategories = () => {

  const closeMovieModal = movieModal(state => state.closeMovieModal);
  const selectMovieGenreOrCategory = movieGenreOrCategory(state => state.selectMovieGenreOrCategory);
  const { data, isLoading } = useQuery('movie-genre', fetchMovieGenres);

  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'In Theaters', value: 'now_playing' }
  ]

  // closes the search overlay by using the 'ESC' key
  useEffect(() => {
    document.addEventListener('keyup', keyPressHandler);

    return () => document.removeEventListener('keyup', keyPressHandler);
  })

  const keyPressHandler = (e) => {
    if (e.keyCode === 27) {
      closeMovieModal();
    }
  }

  return (
    <div className='overlay overflow-scroll sm:overflow-auto'>

      <div className='mt-[5rem] mb-[5rem] mx-[3rem] sm:mt-[0rem] sm:mb-[0rem] sm:mx-[0rem] sm:flex sm:flex-col sm:justify-center ss:ml-[10rem] sm:ml-[2rem] lg:ml-[7rem] xl:ml-[12rem] h-screen'>

        <img src={closeWhite} alt="close button" className='cursor-pointer absolute top-[25px] right-[30px] sm:top-[54px] sm:right-[45px]' onClick={closeMovieModal} />

        <div className='mb-10 sm:mb-20'>
          <h1 className='font-poppins text-[1.5rem] sm:text-[2.5rem] md:text-[3rem] text-white '>Movie Categories :</h1>
          <div className='flex flex-col ss:flex-row'>
            {categories.map(({ label, value }) => (
              <Link key={value} className='self-start font-poppins text-[1rem] sm:text-[1.3rem] mr-9 mt-3 hover:text-blue-600 transition-all duration-[.40s] ease-in-out' to={`/movie/genre/${label}`}>
                <div onClick={() => {
                  selectMovieGenreOrCategory(value)
                  closeMovieModal()
                }}>
                  {label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className='mb-10 sm:mb-0'>
          <h1 className='font-poppins text-[1.5rem] sm:text-[2.5rem] md:text-[3rem] text-white'>Movie Genres :</h1>
          <div className='flex flex-col ss:flex-row flex-wrap max-w-5xl'>
            {isLoading ? (
              <div className="container mx-auto flex items-center justify-center ">
                <BeatLoader
                  size={20}
                  color={"#064ce3"}
                  loading={true}
                  speedMultiplier={1.5}
                />
              </div>
            ) : data.genres.map(({ name, id }) => (
              <Link key={id} className='self-start font-poppins text-[1rem] sm:text-[1.3rem] mr-9 mt-3  hover:text-blue-600 transition-all duration-[.40s] ease-in-out' to={`/movie/genre/${name}`}>
                <div onClick={() => {
                  selectMovieGenreOrCategory(id)
                  closeMovieModal()
                }}>
                  {name}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  )

}

export default MovieCategories