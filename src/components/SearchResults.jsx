import { UserSerchResults } from '../services/TMDBApi'
import BeatLoader from "react-spinners/BeatLoader";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SearchResultContent from './SearchResultContent';

const SearchResults = ({ userSearchQuery }) => {

  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch } = UserSerchResults(userSearchQuery);
  const id = useParams();
  const movieAndTvShowLink = '';

  useEffect(() => {
    refetch()
  }, [id, refetch])

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
          color={"#064ce3"}
          loading={true}
          speedMultiplier={1.5}
        />
      </div>
    )
  }

  if (isError) {
    return <div className="container fetching-data">There is a network error, please try again later.</div>
  }

  if (data.pages[0].total_results < 1) {
    return (
      <div className="container fetching-data">
        <h4 className="text-2xl">No Matches Were Found. Please search again</h4>
      </div>
    )
  }


  return (
    <div className='content'>

      <h2 className='text-[1.5rem] sm:text-[1.7rem]'>
        {`Search Results For: ${userSearchQuery}`}
      </h2>

      <div className='ss:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {data.pages.map((page) =>
          page.results.map((content, i) =>
            <SearchResultContent key={i} content={content} i={i} movieAndTvShowLink={movieAndTvShowLink} />
          ))}
      </div>

    </div>
  )

}

export default SearchResults