import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchTvShowGenres } from '../services/TMDBApi';
import BeatLoader from "react-spinners/BeatLoader";
import { tvShowModal, tvShowGenreOrCategory } from '../app/store';
import { closeWhite } from '../assets/index';

const TvShowCategories = () => {

  const closeTvShowModal = tvShowModal(state => state.closeTvShowModal);
  const selectTvShowGenreOrCategory = tvShowGenreOrCategory(state => state.selectTvShowGenreOrCategory);
  const { data, isLoading } = useQuery('tv-show-genres', fetchTvShowGenres);

  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Currently On Air', value: 'on_the_air' }
  ]

  // closes the search overlay by using the 'ESC' key
  useEffect(() => {
    document.addEventListener('keyup', keyPressHandler);

    return () => document.removeEventListener('keyup', keyPressHandler);
  })

  const keyPressHandler = (e) => {
    if (e.keyCode === 27) {
      closeTvShowModal();
    }
  }

  return (
    <div className='overlay overflow-scroll sm:overflow-auto'>

      <div className='mt-[3rem] mb-[5rem] mx-[3rem] sm:mt-[0rem] sm:mb-[0rem] sm:mx-[0rem] sm:flex sm:flex-col sm:justify-center ss:ml-[10rem] sm:ml-[2rem] lg:ml-[7rem] xl:ml-[12rem] h-screen'>

        <img src={closeWhite} alt="close button" className='cursor-pointer absolute top-[25px] right-[30px] sm:top-[54px] sm:right-[45px]' onClick={closeTvShowModal} />

        <div className='mb-10 sm:mb-20'>
          <h1 className='font-poppins text-[1.5rem] sm:text-[2.5rem] md:text-[3rem] text-white '>Tv Show Categories :</h1>
          <div className='flex flex-col ss:flex-row'>
            {categories.map(({ label, value }) => (
              <Link key={value} className='self-start font-poppins text-[1rem] sm:text-[1.3rem] mr-9 mt-3 hover:text-blue-600 transition-all duration-[.40s] ease-in-out' to={`/tv-show/genre/${label}`}>
                <div onClick={() => {
                  selectTvShowGenreOrCategory(value)
                  closeTvShowModal()
                }}>
                  {label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className='mb-10 sm:mb-0'>
          <h1 className='font-poppins text-[1.5rem] sm:text-[2.5rem] md:text-[3rem] text-white'>Tv Show Genres :</h1>
          <div className='flex flex-col ss:flex-row flex-wrap max-w-5xl'>
            {isLoading ? (
              <div className="container mx-auto flex items-center justify-center ">
                <BeatLoader
                  size={20}
                  color={"#123abc"}
                  loading={true}
                  speedMultiplier={1.5}
                />
              </div>
            ) : data.genres.map(({ name, id }) => (
              <Link key={id} className='self-start font-poppins text-[1rem] sm:text-[1.3rem] mr-9 mt-3  hover:text-blue-600 transition-all duration-[.40s] ease-in-out' to={`/tv-show/genre/${name}`}>
                <div onClick={() => {
                  selectTvShowGenreOrCategory(id)
                  closeTvShowModal()
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

export default TvShowCategories