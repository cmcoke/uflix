import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchTvShow } from '../services/TMDBApi';
import { tvShowTrailer } from '../app/store';
import { closeWhite } from '../assets/index';


const TvShowTrailer = () => {

  const currentLocation = useLocation();
  let arr = currentLocation.pathname.split('/');
  let id = arr[arr.length - 1];
  const { data: tvShowData } = useQuery(['tv-show-trailer', id], () => fetchTvShow(id));
  const closeTvShowTrailer = tvShowTrailer(state => state.closeTvShowTrailer);

  // closes the movie trailer overlay by using the 'ESC' 
  const keyPressHandler = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        closeTvShowTrailer()
      }
    },
    [closeTvShowTrailer],
  )

  useEffect(() => {
    document.addEventListener('keyup', keyPressHandler);
    return () => document.removeEventListener('keyup', keyPressHandler);
  }, [keyPressHandler])



  return (
    <div className='overlay overflow-scroll sm:overflow-auto'>

      <img src={closeWhite} alt="close button" className='cursor-pointer absolute top-[54px] right-[45px]' onClick={closeTvShowTrailer} />

      <div className='relative top-[20%] xl:top-[10%] w-[80%] xl:w-[70%] text-center mt-[30px] m-auto'>

        {tvShowData?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className='w-[100%] h-[70vw] sm:h-[38vw]'
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${tvShowData.videos.results[0].key}`}
          />
        )}

      </div>

    </div>
  )
}

export default TvShowTrailer