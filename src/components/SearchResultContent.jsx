import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { noImage } from '../assets/index'


const SearchResultContent = ({ content }) => {


  return (
    <div className="px-[5px] py-[17px] fade-animation">
      <Link
        className='overflow-hidden inline-block'
        to={(content.media_type === 'movie' && `/movie/${content.id}`) || (content.media_type === 'tv' && `/tv-show/${content.id}`) || (content.media_type === 'person' && `/person/${content.id}`)}>
        <img
          className="transition-all duration-[.80s] ease-in-out hover:scale-110"
          alt={content.media_type === 'movie' || content.media_type === 'tv' ? content.title : content.name}
          src={content.poster_path ? `https://image.tmdb.org/t/p/w500/${content.poster_path}` : noImage && content.profile_path ? `https://image.tmdb.org/t/p/w500/${content.profile_path}` : noImage} />
      </Link>
      <h5 className="mt-[15px] text-ellipsis text-sm">{content.title || content.name}</h5>
      <div className="flex justify-between items-center">
        {content.media_type === 'movie' || content.media_type === 'tv' ? <StarRatings rating={content.vote_average / 2} numberOfStars={5} starDimension="15px" starRatedColor="rgb(250, 175, 0)" starEmptyColor='#fff' /> : ''}
        {content.media_type === 'movie' || content.media_type === 'tv' ? <span className="text-[#80868b] text-[14px]">{content.vote_average.toFixed(1)}</span> : ''}
      </div>
    </div>
  )

}

export default SearchResultContent