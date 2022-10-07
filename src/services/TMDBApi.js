import axios from "axios";
import { useInfiniteQuery } from "react-query";

// TMDB API Key
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

/******* For components that don't have infinite scroll *******/

// get movies & tv shows that are trending
const fetchAllTrends = async () => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${tmdbApiKey}`)
  return data;
}

// get movies that are trending
const fetchMovieTrends = async () => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${tmdbApiKey}`)
  return data;
}

// get tv shows that are trending
const fetchTvShowsTrends = async () => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${tmdbApiKey}`)
  return data;
}

// get upcoming movies
const fetchUpcomingMovies = async () => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}`)
  return data;
}

// get tv shows that are airing today
const fetchTvShowsAiringToday = async () => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${tmdbApiKey}`)
  return data;
}


/******* For components that have infinite scroll *******/

// get upcoming movies
const UpcomingMoviesFeed = () => {
  return useInfiniteQuery(
    'upcoming-movies',
    ({ pageParam = 1 }) => fetchUpcomingMoviesForInfiniteScroll(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage;
        return (page < totalPages) ? page + 1 : undefined;
      }
    }
  )
}

const fetchUpcomingMoviesForInfiniteScroll = async (pageParam) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&page=${pageParam}`)
  return data;
}


// get tv shows that are airing today
const TvShowsAiringTodayFeed = () => {
  return useInfiniteQuery(
    'tv-shows-airing-today',
    ({ pageParam = 1 }) => fetchTvShowsAiringTodayForInfiniteScroll(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage;
        return (page < totalPages) ? page + 1 : undefined;
      }
    }
  )
}

const fetchTvShowsAiringTodayForInfiniteScroll = async (pageParam) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${tmdbApiKey}&page=${pageParam}`)
  return data;
}


// get movies that are trending
const TrendingMoviesFeed = () => {
  return useInfiniteQuery(
    'trending-movies',
    ({ pageParam = 1 }) => fetchMovieTrendsForInfiniteScroll(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage;
        return (page < totalPages) ? page + 1 : undefined;
      }
    }
  )
}

const fetchMovieTrendsForInfiniteScroll = async (pageParam) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${tmdbApiKey}&page=${pageParam}`)
  return data;
}


// get tv shows that are trending
const TrendingTvShowsFeed = () => {
  return useInfiniteQuery(
    'trending-tv-shows',
    ({ pageParam = 1 }) => fetchTvShowsTrendsForInfiniteScroll(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage;
        return (page < totalPages) ? page + 1 : undefined;
      }
    }
  )
}

const fetchTvShowsTrendsForInfiniteScroll = async (pageParam) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${tmdbApiKey}&page=${pageParam}`)
  return data;
}


export {
  fetchAllTrends,
  fetchMovieTrends,
  fetchTvShowsTrends,
  fetchUpcomingMovies,
  fetchTvShowsAiringToday,
  UpcomingMoviesFeed,
  TvShowsAiringTodayFeed,
  TrendingMoviesFeed,
  TrendingTvShowsFeed
}