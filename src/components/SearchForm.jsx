import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { closeWhite } from '../assets/index';
import { searchQuery } from '../app/store';

const SearchForm = () => {

  const [query, setQuery] = useState('');
  const closeSearchModal = searchQuery(state => state.closeSearchModal);
  const userSearch = searchQuery(state => state.userSearch);
  const navigate = useNavigate();

  const handleSubmit = e => {

    e.preventDefault();

    userSearch(query);

    if (query.toString().trim().length === 0) {
      return
    } else {
      navigate(`/search/${query}`);
      setQuery('');
      closeSearchModal();
    }

  }

  // closes the search overlay by using the 'ESC' key
  useEffect(() => {
    document.addEventListener('keyup', keyPressHandler)

    return () => document.removeEventListener('keyup', keyPressHandler)
  })

  const keyPressHandler = (e) => {
    if (e.keyCode === 27) {
      closeSearchModal();
    }
  }


  return (
    <div className='overlay overflow-scroll sm:overflow-auto'>

      <img src={closeWhite} alt="close button" className='cursor-pointer absolute top-[54px] right-[45px]' onClick={closeSearchModal} />

      <div className='relative top-[46%] w-[80%] text-center mt-[30px] m-auto'>

        <form onSubmit={handleSubmit} >
          <input
            type="text"
            autoFocus
            autoComplete='off'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search for movies, tv shows or people'
            className='w-[100%] md:w-[80%] lg:w-[70%] xl:w-[60%] bg-transparent border-0 border-b-[1px] p-t-[1em] pr-0 pb-[0.8em] pl-0 text-[13px] sm:text-[1.5rem] lg:text-[2rem] text-white placeholder:text-dimWhite font-poppins outline-none'
          />
        </form>

      </div>

    </div>
  )

}

export default SearchForm