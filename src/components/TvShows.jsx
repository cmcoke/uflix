import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { TvShowsCategoryOrGenre } from '../services/TMDBApi';
import BeatLoader from "react-spinners/BeatLoader";
import { tvShowGenreOrCategory } from '../app/store';
import InfiniteScrollFeed from './InfiniteScrollFeed';

const TvShows = () => {

  let id = useParams();
  const tvShowGenreIdOrCategoryName = tvShowGenreOrCategory((state) => state.tvShowGenreIdOrCategoryName);
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = TvShowsCategoryOrGenre(tvShowGenreIdOrCategoryName);
  const tvShowLink = '';

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="container fetching-data">
        <BeatLoader
          size={30}
          color={"#123abc"}
          loading={true}
          speedMultiplier={1.5}
        />
      </div>
    )
  }

  if (isError) {
    return <div className="container fetching-data">There is a network error, please try again later.</div>
  }

  return (
    <div className='content'>

      <h2 className={'text-[1.5rem] sm:text-[1.7rem]'}>
        {id.name === 'Popular' || id.name === 'Top Rated' || id.name === 'Airing Today' ? `Tv Show Category : ${id.name}` : `Tv Show Genre : ${id.name}`}
      </h2>

      <div className="mb-8">
        <InfiniteScrollFeed data={data} tvShowLink={tvShowLink} />
      </div>

    </div>
  )

}

export default TvShows