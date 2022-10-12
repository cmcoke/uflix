import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import { fetchMovieTrends, fetchTvShowsTrends } from '../services/TMDBApi';
import BeatLoader from "react-spinners/BeatLoader";
import Feed from './Feed';

const Trending = () => {

  const { data: movieTrendsData, isError: movieTrendsIsError, isLoading: movieTrendsIsLoading } = useQuery('movie-trends', fetchMovieTrends);
  const { data: tvShowTrendsData, isError: tvShowTrendsIsError, isLoading: tvShowTrendsIsLoading } = useQuery('tv-trends', fetchTvShowsTrends);
  const numberOfFeedContents = 12;
  const movieLink = '';
  const tvShowLink = '';


  if (movieTrendsIsLoading || tvShowTrendsIsLoading) {
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

  if (movieTrendsIsError || tvShowTrendsIsError) {
    return <div className="container fetching-data">There is a network error, please try again later.</div>
  }

  return (
    <div className='content card'>

      <div className="mb-8">
        <div className='flex flex-col ss:flex-row items-baseline'>
          <h2 className='text-[1.5rem] sm:text-[1.7rem]'>Trending Movies</h2>
          <Link to={'/trending/movies'} className='text-blue-500 transition-all duration-[.40s] ease-in-out hover:text-blue-600 sm:ml-5 text-[15px]'>View More</Link>
        </div>
        <Feed data={movieTrendsData} numberOfContent={numberOfFeedContents} movieLink={movieLink} />
      </div>

      <div className="mb-8">
        <div className='flex flex-col ss:flex-row items-baseline'>
          <h2 className='text-[1.5rem] sm:text-[1.7rem]'>Trending Tv Shows</h2>
          <Link to={'/trending/tv-shows'} className='text-blue-500 transition-all duration-[.40s] ease-in-out hover:text-blue-600 sm:ml-5 text-[15px]'>View More</Link>
        </div>
        <Feed data={tvShowTrendsData} numberOfContent={numberOfFeedContents} tvShowLink={tvShowLink} />
      </div>

    </div>
  )

}

export default Trending