import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchPersonDetail } from "../services/TMDBApi";
import BeatLoader from "react-spinners/BeatLoader";
import { facebook, twitter, instagram, noImage, unknownFemale, unknownMale } from '../assets/index';
import PersonAppearance from './PersonAppearance';

const Person = () => {

  const { id } = useParams();
  const { data, isError, isLoading, refetch } = useQuery(['person', id], () => fetchPersonDetail({ person_id: id }), { enabled: false });

  useEffect(() => {
    refetch()
  }, [id, refetch])

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

  return (
    <div className="content fade-animation mt-[5rem]">

      <div className="information">

        {/* image of person */}
        <div className="information-image">
          <img src={

            data?.profile_path ? `https://image.tmdb.org/t/p/w500/${data?.profile_path}`

              : !data?.profile_path && data?.gender === 1 ? unknownFemale

                : !data?.profile_path && data?.gender === 2 ? unknownMale

                  : noImage

          }
            alt={data?.name} className='mx-auto w-full xl:w-fit' />
        </div>

        {/* information about the person */}
        <div className="information-text-content">

          {/* the person' name */}
          <h3 className="font-semibold text-[1.5rem] text-center sm:text-left md:text-[1.7rem] lg:text-[2.7rem] my-6 sm:mb-5">{data?.name}</h3>

          {/* the person' bio */}
          <p className="max-w-[900px] text-center sm:text-left font-normal text-dimWhite text-[18px] leading-[30.8px] mb-8">
            {data?.biography}
          </p>

          {/* known for, born, place of birth */}
          <div>
            <p className="sm:text-left font-normal text-[18px] leading-[30.8px] mb-3">Known For: {data?.known_for_department ? <span className="ml-3">{data?.known_for_department}</span> : <span className="ml-3">N/A</span>}  </p>

            <p className="sm:text-left font-normal text-[18px] leading-[30.8px] mb-3">Born: {new Date(data?.birthday) ? <span className="ml-3">{new Date(data?.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> : <span className="ml-3">N/A</span>} </p>

            {!data?.deathday && (
              <p className="sm:text-left font-normal text-[18px] leading-[30.8px] mb-3">Age: {new Date(data?.birthday).getFullYear() ? <span className="ml-3">{new Date().getFullYear() - new Date(data?.birthday).getFullYear()}</span> : <span className="ml-3">N/A</span>}  </p>
            )}

            <p className="sm:text-left font-normal text-[18px] leading-[30.8px] mb-3">Place of Birth: {data?.place_of_birth ? <span className="ml-3">{data?.place_of_birth}</span> : <span className="ml-3">N/A</span>} </p>

            {data?.deathday && (
              <p className="sm:text-left font-normal text-[18px] leading-[30.8px] mb-3">Died: {new Date(data?.deathday) ? <span className="ml-3">{new Date(data?.deathday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} ( at the age of {new Date(data?.deathday).getYear() - new Date(data?.birthday).getYear()} ) </span> : <span className="ml-3">N/A</span>} </p>
            )}
          </div>

          {/* person' social media links */}
          <div className="flex mt-7">

            {data?.external_ids?.facebook_id && (
              <a href={`https://www.facebook.com/${data?.external_ids?.facebook_id}`} target="_blank" rel="noopener noreferrer" className="mr-4">
                <img src={facebook} alt="facebook" />
              </a>
            )}

            {data?.external_ids?.twitter_id && (
              <a href={`https://www.twitter.com/${data?.external_ids?.twitter_id}`} target="_blank" rel="noopener noreferrer" className="mr-4">
                <img src={twitter} alt="twitter" />
              </a>
            )}

            {data?.external_ids?.instagram_id && (
              <a href={`https://www.instagram.com/${data?.external_ids?.instagram_id}`} target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="instagram" />
              </a>
            )}

          </div>

        </div>

        {/* appearances */}
        <div className="information-recommendations mt-[2rem] sm:mt-[3rem] md:mt-[8rem]">
          <PersonAppearance />
        </div>

      </div>

    </div>
  )
}

export default Person