import FeedContent from "./FeedContent"

const Feed = ({ data, numberOfContent, exclude, movieLink, tvShowLink, movieAndTvShowLink }) => {

  const startFrom = exclude ? 6 : 0;

  return (
    <div className='flex flex-col justify-center'>
      <div className='ss:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {data.results.slice(startFrom, numberOfContent).map((content, i) => (
          <FeedContent key={i} content={content} i={i} movieLink={movieLink} tvShowLink={tvShowLink} movieAndTvShowLink={movieAndTvShowLink} />
        ))}
      </div>
    </div>
  )

}

export default Feed
