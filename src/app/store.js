import create from 'zustand';

const tvShowModal = create((set) => ({
  isTvShowModalOpen: false,
  openTvShowModal: () => set((state) => ({ isTvShowModalOpen: state.isTvShowModalOpen = true })),
  closeTvShowModal: () => set((state) => ({ isTvShowModalOpen: state.isTvShowModalOpen = false }))
}));

const movieModal = create((set) => ({
  isMovieModalOpen: false,
  openMovieModal: () => set((state) => ({ isMovieModalOpen: state.isMovieModalOpen = true })),
  closeMovieModal: () => set((state) => ({ isMovieModalOpen: state.isMovieModalOpen = false }))
}));

const tvShowGenreOrCategory = create((set) => ({
  tvShowGenreIdOrCategoryName: '',
  selectTvShowGenreOrCategory: (value) => set((state) => ({ tvShowGenreIdOrCategoryName: state.tvShowGenreIdOrCategoryName = value })),
}));

const movieGenreOrCategory = create((set) => ({
  movieGenreIdOrCategoryName: '',
  selectMovieGenreOrCategory: (value) => set((state) => ({ movieGenreIdOrCategoryName: state.movieGenreIdOrCategoryName = value })),
}));

const tvShowTrailer = create((set) => ({
  isTvShowTrailerOpen: false,
  openTvShowTrailer: () => set((state) => ({ isTvShowTrailerOpen: state.isTvShowTrailerOpen = true })),
  closeTvShowTrailer: () => set((state) => ({ isTvShowTrailerOpen: state.isTvShowTrailerOpen = false }))
}));

const movieTrailer = create((set) => ({
  isMovieTrailerOpen: false,
  openMovieTrailer: () => set((state) => ({ isMovieTrailerOpen: state.isMovieTrailerOpen = true })),
  closeMovieTrailer: () => set((state) => ({ isMovieTrailerOpen: state.isMovieTrailerOpen = false }))
}));

export { tvShowModal, movieModal, tvShowGenreOrCategory, movieGenreOrCategory, tvShowTrailer, movieTrailer };