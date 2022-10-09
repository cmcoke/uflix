import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchMovie } from '../services/TMDBApi';
import { movieTrailer } from '../app/store';
import { closeWhite } from '../assets/index';


const MovieTrailer = () => {

  const currentLocation = useLocation();
  let arr = currentLocation.pathname.split('/');
  let id = arr[arr.length - 1];
  const { data: movieData } = useQuery(['movie-trailer', id], () => fetchMovie(id));
  const closeMovieTrailer = movieTrailer(state => state.closeMovieTrailer);

  // closes the movie trailer overlay by using the 'ESC' 
  const keyPressHandler = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        closeMovieTrailer()
      }
    },
    [closeMovieTrailer],
  )

  useEffect(() => {
    document.addEventListener('keyup', keyPressHandler);
    return () => document.removeEventListener('keyup', keyPressHandler);
  }, [keyPressHandler])


  return (
    <div className='overlay overflow-scroll sm:overflow-auto'>

      <img src={closeWhite} alt="close button" className='cursor-pointer absolute top-[54px] right-[45px]' onClick={closeMovieTrailer} />

      <div className='relative top-[20%] xl:top-[10%] w-[80%] xl:w-[70%] text-center mt-[30px] m-auto'>

        {movieData?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className='w-[100%] h-[70vw] sm:h-[38vw]'
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${movieData.videos.results[0].key}`}
          />
        )}

      </div>

    </div>
  )
}

export default MovieTrailer