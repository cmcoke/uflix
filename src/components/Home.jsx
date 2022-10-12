import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import { fetchAllTrends, fetchUpcomingMovies, fetchTvShowsAiringToday } from '../services/TMDBApi';
import BeatLoader from "react-spinners/BeatLoader";
import Feed from './Feed'
import FeaturedContent from './FeaturedContent';

const Home = () => {

  const { data: trendsData, isError: trendsIsError, isFetching: trendsIsLoading } = useQuery('trends', fetchAllTrends);
  const { data: upcomingMoviesData, isError: upcomingMoviesIsError, isFetching: upcomingMoviesIsLoading } = useQuery('upcoming-movies', fetchUpcomingMovies);
  const { data: tvShowsAiringTodayData, isError: tvShowsAiringTodayIsError, isFetching: tvShowsAiringTodayIsLoading } = useQuery('tv-shows-airing-today', fetchTvShowsAiringToday);
  const numberOfFeedContents = 6;
  const movieLink = '';
  const tvShowLink = '';
  const movieAndTvShowLink = '';

  if (trendsIsLoading || upcomingMoviesIsLoading || tvShowsAiringTodayIsLoading) {
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

  if (trendsIsError || upcomingMoviesIsError || tvShowsAiringTodayIsError) {
    return <div className="container fetching-data">There is a network error, please try again later.</div>
  }

  const featuredContents = trendsData.results.slice(1, 6);

  return (

    <>

      <FeaturedContent data={featuredContents} />

      <div className='content'>
        <div className="mb-8">
          <div className='flex flex-col ss:flex-row items-baseline'>
            <h2 className='text-[1.5rem] sm:text-[1.7rem]'>Trending Now</h2>
            <Link to={'/trending-now'} className='text-blue-500 transition-all duration-[.40s] ease-in-out hover:text-blue-600 sm:ml-5 text-[15px]'>View More</Link>
          </div>
          <Feed data={trendsData} numberOfContent={12} movieAndTvShowLink={movieAndTvShowLink} exclude />
        </div>

        <div className="mb-8">
          <div className='flex flex-col ss:flex-row items-baseline'>
            <h2 className='text-[1.5rem] sm:text-[1.7rem]'>Upcoming Movies</h2>
            <Link to={'/movie/upcoming-movies'} className='text-blue-500 transition-all duration-[.40s] ease-in-out hover:text-blue-600 sm:ml-5 text-[15px]'>View More</Link>
          </div>
          <Feed data={upcomingMoviesData} numberOfContent={numberOfFeedContents} movieLink={movieLink} />
        </div>

        <div className="mb-8">
          <div className='flex flex-col ss:flex-row items-baseline'>
            <h2 className='text-[1.5rem] sm:text-[1.7rem]'>Tv Shows Airing Today</h2>
            <Link to={'/tv/tv-shows-airing-today'} className='text-blue-500 transition-all duration-[.40s] ease-in-out hover:text-blue-600 sm:ml-5 text-[15px]'>View More</Link>
          </div>
          <Feed data={tvShowsAiringTodayData} numberOfContent={numberOfFeedContents} tvShowLink={tvShowLink} />
        </div>
      </div>

    </>


  )

}

export default Home