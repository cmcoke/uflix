import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchTvShow, fetchTvShowRecommendations } from '../services/TMDBApi';
import { tvShowGenreOrCategory, tvShowTrailer } from '../app/store';
import BeatLoader from "react-spinners/BeatLoader";
import { goldStar, play, globe, unknownFemale, unknownMale } from '../assets/index';
import Feed from './Feed';

const TvShowInformation = () => {

  const { id } = useParams();
  const { data: tvShowData, isError: tvShowisError, isLoading: tvShowisLoading, refetch } = useQuery(['tv-show', id], () => fetchTvShow(id), { enabled: false });
  const { data: tvShowRecommendationData, isError: tvShowRecommendationisError, isLoading: tvShowRecommendationisLoading } = useQuery('tv-show-recommendation', () => fetchTvShowRecommendations({ list: '/recommendations', tv_id: id }));
  const selectTvShowGenreOrCategory = tvShowGenreOrCategory(state => state.selectTvShowGenreOrCategory);
  const numberOfFeedContents = 12;
  const tvShowLink = '';
  const openTvShowTrailer = tvShowTrailer(state => state.openTvShowTrailer);

  // when one of the recommended movies is clicked the fetchMovie() is refetched for the recommended movie that was clicked.
  useEffect(() => {
    refetch()
  }, [id, refetch])


  if (tvShowisLoading || tvShowRecommendationisLoading) {
    return (
      <div className="container fetching-data">
        <BeatLoader
          size={30}
          color={"#064ce3"}
          loading={true}
          speedMultiplier={1.5}
        />
      </div>
    )
  }


  if (tvShowisError || tvShowRecommendationisError) {
    return <div className="container fetching-data">There is a network error, please try again later.</div>
  }

  return (

    <div className="content-container fade-animation">

      {/* tv show backdrop image */}
      <div className="content-image">
        <div className="backdrop-image">
          <img src={`https://image.tmdb.org/t/p/original/${tvShowData?.backdrop_path}`} alt={tvShowData?.name} />
        </div>
      </div>

      <div className="content-information">

        <div className="information">

          {/* tv show image */}
          <div className="information-image">
            <img src={`https://image.tmdb.org/t/p/w500/${tvShowData?.poster_path}`} alt={tvShowData?.name} className='mx-auto w-full xl:w-fit' />
          </div>

          {/* tv show information - name, genre categories, overview .... */}
          <div className="information-text-content">

            <h3 className="font-semibold text-[1.5rem] text-center sm:text-left md:text-[1.7rem] lg:text-[2.7rem] my-6  sm:mb-5">{tvShowData?.name}</h3>

            <div className="flex flex-col justify-center sm:justify-start ss:flex-row ss:flex-wrap mb-5 sm:mb-5 md:mb-7">
              {tvShowData?.genres?.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/tv-show/genre/${genre.name}`}
                  onClick={() => selectTvShowGenreOrCategory(genre.id)}
                  className='font-semibold uppercase mb-4 text-center mr-4 py-3 px-5 bg-[#232325] hover:bg-[#1a1a1b] transition-all duration-[.40s] ease-in-out rounded-full text-[.92rem]'>
                  {genre.name}
                </Link>
              ))}
            </div>

            <p className="max-w-[600px] text-center sm:text-left font-normal text-dimWhite text-[18px] leading-[30.8px] mb-8">
              {tvShowData?.overview}
            </p>

            <div className="mb-7">

              <div className="flex  space-x-5 items-center">
                <p className="max-w-[600px] text-center sm:text-left font-normal text-[18px] leading-[30.8px] text-dimWhite">Network:</p>
                <p className="max-w-[600px] text-center sm:text-left font-normal text-[18px] leading-[30.8px]">{tvShowData?.networks ? tvShowData?.networks[0].name : 'N/A'}</p>
              </div>

              <div className="flex space-x-5 my-2 items-center">
                <p className="max-w-[600px] text-center sm:text-left font-normal text-[18px] leading-[30.8px] text-dimWhite">Number of Seasons:</p>
                <p className="max-w-[600px] text-center sm:text-left font-normal text-[18px] leading-[30.8px]">{tvShowData?.number_of_seasons ? (tvShowData?.number_of_seasons).toString() : 'N/A'} </p>
              </div>

              <div className="flex space-x-5 items-center">
                <p className="max-w-[600px] text-center sm:text-left font-normal text-[18px] leading-[30.8px] text-dimWhite">Number of Episodes:</p>
                <p className="max-w-[600px] text-center sm:text-left font-normal text-[18px] leading-[30.8px]">{tvShowData?.number_of_episodes ? (tvShowData?.number_of_episodes).toString() : 'N/A'}</p>
              </div>

            </div>

            <div className='flex items-center my-4 ss:mr-[3rem]'>
              <img src={goldStar} alt="star" className="w-[2rem]" />
              <p className="ml-2 text-[2rem] lg:text-[2.5rem] ">
                {tvShowData?.vote_average ? (Math.round((tvShowData?.vote_average + Number.EPSILON) * 10) / 10).toString() : 'N/A'}
                <span className='text-[1.3rem] md:text-[1rem] text-dimWhite'> / 10 </span>
                <span className='text-[1.3rem] md:text-[1rem] ml-2 tracking-wide text-dimWhite '>({tvShowData?.vote_count} votes)</span>
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start sm:flex-row mt-5 md:mt-11">

              {tvShowData?.videos?.results?.length > 0 ? (
                <button className="flex items-center font-poppins mb-5 md:mb-0 sm:mr-5 bg-[#4e46d8] hover:bg-[#332ea3] transition-all duration-[.40s] ease-in-out rounded-full py-3 px-11" onClick={openTvShowTrailer}>
                  <img src={play} alt="IMDb Rating" />
                  <p className="ml-2 uppercase font-semibold text-[.92rem]">Trailer</p>
                </button>
              ) : <button className="disabled flex items-center font-poppins mb-5 md:mb-0 sm:mr-5 bg-[#4e46d8] hover:bg-[#332ea3] transition-all duration-[.40s] ease-in-out rounded-full py-3 px-11">
                <img src={play} alt="IMDb Rating" />
                <p className="ml-2 uppercase font-semibold text-[.92rem]">Trailer Unavailable</p>
              </button>}

              {tvShowData?.homepage ? (
                <a href={tvShowData?.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center font-poppins bg-[#232325] hover:bg-[#1a1a1b] transition-all duration-[.40s] ease-in-out rounded-full py-3 px-11">
                  <img src={globe} alt="website" />
                  <p className="ml-3 uppercase font-semibold">Website</p>
                </a>
              ) : <a href='/' className=" disabled flex items-center font-poppins bg-[#232325] rounded-full py-3 px-11">
                <img src={globe} alt="website" />
                <p className="ml-3 uppercase font-semibold">Website Unavailable</p>
              </a>}

            </div>

          </div>

          {/* tv show cast members */}
          <div className="information-cast mb-8">

            <h2 className={tvShowData?.credits.cast < 1 ? 'hidden' : 'font-poppins text-3xl mb-11'}>Cast Members</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {tvShowData && tvShowData.credits.cast.map((character, i) => (
                // if the character profile path exist show the respected image of the character
                character.profile_path
                  ? (
                    <Link key={character.name} to={`/person/${character.id}`} className='grid grid-cols-2 items-center justify-center mb-11 sm:mr-4 lg:mr-6'>
                      <img src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} className='w-[140px] h-[140px] object-cover rounded-full' />
                      <div className="ml-2">
                        <p>{character?.name}</p>
                        <p className="text-dimWhite">{character?.character.split('/')[0]}</p>
                      </div>
                    </Link>
                  )
                  : // if the character profile path is null and the gender is a woman
                  !character.profile_path && character.gender === 1
                    ? (
                      <Link key={character.name} to={`/person/${character.id}`} className='grid grid-cols-2 items-center justify-center mb-11 sm:mr-4 lg:mr-6'>
                        <img src={unknownFemale} alt={character.name} className='w-[140px] h-[140px] object-cover rounded-full' />
                        <div className="ml-2">
                          <p>{character?.name}</p>
                          <p className="text-dimWhite">{character?.character.split('/')[0]}</p>
                        </div>
                      </Link>
                    )
                    // if the character profile path is null and the gender is a man
                    : !character.profile_path && character.gender === 2
                      ? (
                        <Link key={character.name} to={`/person/${character.id}`} className='grid grid-cols-2 items-center justify-center mb-11 sm:mr-4 lg:mr-6'>
                          <img src={unknownMale} alt={character.name} className='w-[140px] h-[140px] object-cover rounded-full' />
                          <div className="ml-2">
                            <p>{character?.name}</p>
                            <p className="text-dimWhite">{character?.character.split('/')[0]}</p>
                          </div>
                        </Link>
                      ) : ''
              )).slice(0, 8)}
            </div>

          </div>

          {/* tv show recommendations */}
          <div className="information-recommendations">

            <h2 className={tvShowRecommendationData.results.length < 1 ? 'hidden' : 'font-poppins text-3xl mb-7'}>Tv Shows You May Like</h2>

            {tvShowRecommendationData
              ? <Feed data={tvShowRecommendationData} numberOfContent={numberOfFeedContents} tvShowLink={tvShowLink} />
              : <h3 className="font-poppins text-center">Sorry, nothing was found</h3>
            }

          </div>

        </div>

      </div>


    </div>
  )
}

export default TvShowInformation