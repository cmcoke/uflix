import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { PersonAppearanceFeed } from '../services/TMDBApi';
import BeatLoader from "react-spinners/BeatLoader";
import PersonAppearanceContent from './PersonAppearanceContent'

const PersonAppearance = () => {

  const { id } = useParams();
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = PersonAppearanceFeed({ person_id: id });
  const movieAndTvShowLink = '';

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 6) {
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
    <div>

      <h2 className={data.pages[0].cast.length < 1 ? 'hidden' : 'font-poppins text-3xl mb-7'}>Appearances</h2>

      <div className="mb-8">
        <PersonAppearanceContent data={data} movieAndTvShowLink={movieAndTvShowLink} />
      </div>


    </div>
  )
}

export default PersonAppearance