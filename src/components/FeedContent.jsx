import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { noImage } from '../assets/index'

const FeedContent = ({ content, i, movieLink, tvShowLink, movieAndTvShowLink }) => {

  // a switch statement is used to determine the type of url for a movie or tv show
  let url = ''

  switch (url) {
    case movieLink:
      url = `/movie/${content.id}`;
      break;
    case tvShowLink:
      url = `/tv-show/${content.id}`;
      break;
    case movieAndTvShowLink:
      url = content.media_type === 'movie' ? `/movie/${content.id}` : `/tv-show/${content.id}`;
      break;
    default:
      break;
  }

  return (
    <div className="px-[5px] py-[17px]">
      <Link to={url} className='overflow-hidden inline-block'>
        <img alt={content.title} src={content.poster_path ? `https://image.tmdb.org/t/p/w500/${content.poster_path}` : noImage} className="transition-all duration-[.80s] ease-in-out hover:scale-110" />
      </Link>
      <h5 className="mt-[15px] mb-2 text-ellipsis text-[1rem] text-center">{content.title || content.name}</h5>
      <div className="flex justify-evenly items-end">
        <StarRatings rating={content.vote_average / 2} numberOfStars={5} starDimension="15px" starRatedColor="rgb(250, 175, 0)" starEmptyColor='#fff' /> {' '}
        <span className="text-[#80868b] text-[14px]">{content.vote_average.toFixed(1)}</span>
      </div>
    </div>
  )
}

export default FeedContent
