import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { goldStar, globe } from '../assets/index';

const FeaturedContent = ({ data }) => {

  const options = {
    type: 'fade',
    gap: '1rem',
    autoplay: true,
    rewind: true,
    pauseOnHover: false,
    resetProgress: true,
    height: 'auto',
    fixedWidth: '100%',
    speed: '1500',
    arrows: false,
    pagination: false,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    waitForTransition: true
  };

  return (
    <section className='fade-animation'>

      <Splide
        options={options}
        hasTrack={false}
      >

        <SplideTrack>
          {data.map((content, i) => (
            <SplideSlide key={i}>
              <div>
                <div className='hero'>

                  <div className="hero-image">
                    <img src={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} alt={content.title} />
                  </div>

                  <div className="hero-content">

                    <h1 className="font-semibold text-[1.5rem] ss:text-[3rem] md:text-[5rem] xl:text-[6.5rem] lg:mb-0">{content.title || content.name}</h1>

                    <p className="text-ellipsis overflow-hidden ... hidden ss:block font-normal text-[1.2rem] lg:text-[1.25rem] leading-[30.8px] lg:leading-[34px] ss:mb-4 lg:mb-4 lg:max-w-[700px]">{content.overview}</p>

                    <div className="flex flex-col ss:flex-row items-start ss:items-center">

                      <div className='flex items-center my-4 ss:mr-[3rem]'>
                        <img src={goldStar} alt="star" className="w-[2rem]" />
                        <p className="ml-2 text-[1.5rem] lg:text-[2.5rem] ">
                          {(Math.round((content?.vote_average + Number.EPSILON) * 10) / 10).toString()}
                          <span className='text-[1rem] md:text-[1rem] text-dimWhite'> / 10 </span>
                          <span className='text-[1rem] md:text-[1rem] ml-2 tracking-wide text-dimWhite '>({content.vote_count} votes)</span>
                        </p>
                      </div>

                      <a href={content.media_type === 'movie' ? `/movie/${content.id}` : `/tv-show/${content.id}`} className="flex items-center font-poppins bg-[#232325] hover:bg-[#1a1a1b] transition-all duration-[.40s] ease-in-out rounded-full py-4 px-10">
                        <img src={globe} alt="more info" />
                        <p className="ml-3 uppercase font-semibold">More Info</p>
                      </a>

                    </div>

                  </div>

                </div>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>

      </Splide>

    </section>
  )

}

export default FeaturedContent

