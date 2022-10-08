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

// get geners for movies
const fetchMovieGenres = async () => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}`)
  return data;
}

// get geners for tv shows
const fetchTvShowGenres = async () => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${tmdbApiKey}`)
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


// get tv shows by type (categories or genres)
const TvShowsCategoryOrGenre = (tvShowGenreIdOrCategoryName) => {
  return useInfiniteQuery(
    ['tv-shows', tvShowGenreIdOrCategoryName],
    ({ pageParam = 1 }) => fetchTvShows(tvShowGenreIdOrCategoryName, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage;
        return (page < totalPages) ? page + 1 : undefined;
      }
    }
  )
}

const fetchTvShows = async (tvShowGenreIdOrCategoryName, pageParam) => {

  // get tv shows by category
  if (tvShowGenreIdOrCategoryName && typeof tvShowGenreIdOrCategoryName === 'string') {
    const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowGenreIdOrCategoryName}?page=${pageParam}&api_key=${tmdbApiKey}`)
    return data;
  }

  // get tv shows by genre
  if (tvShowGenreIdOrCategoryName && typeof tvShowGenreIdOrCategoryName === 'number') {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?with_genres=${tvShowGenreIdOrCategoryName}&page=${pageParam}&api_key=${tmdbApiKey}`)
    return data;
  }

}


// get movies by type (categories or genres)
const MoviesCategoryOrGenre = (movieGenreIdOrCategoryName) => {
  return useInfiniteQuery(
    ['movies', movieGenreIdOrCategoryName],
    ({ pageParam = 1 }) => fetchMovies(movieGenreIdOrCategoryName, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage;
        return (page < totalPages) ? page + 1 : undefined;
      }
    }
  )
}

const fetchMovies = async (movieGenreIdOrCategoryName, pageParam) => {

  // get tv shows by category
  if (movieGenreIdOrCategoryName && typeof movieGenreIdOrCategoryName === 'string') {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieGenreIdOrCategoryName}?page=${pageParam}&api_key=${tmdbApiKey}`)
    return data;
  }

  // get tv shows by genre
  if (movieGenreIdOrCategoryName && typeof movieGenreIdOrCategoryName === 'number') {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${movieGenreIdOrCategoryName}&page=${pageParam}&api_key=${tmdbApiKey}`)
    return data;
  }

}


export {
  fetchAllTrends,
  fetchMovieTrends,
  fetchTvShowsTrends,
  fetchUpcomingMovies,
  fetchTvShowsAiringToday,
  fetchMovieGenres,
  fetchTvShowGenres,
  UpcomingMoviesFeed,
  TvShowsAiringTodayFeed,
  TrendingMoviesFeed,
  TrendingTvShowsFeed,
  TvShowsCategoryOrGenre,
  MoviesCategoryOrGenre
}

