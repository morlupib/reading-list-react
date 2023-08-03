import { create } from 'zustand'

interface FilterStore {
  pageFilter: number
  setPageFilter: (pageFilter: number) => void
  titleFilter: string
  setTitleFilter: (titleFilter: string) => void
  genreFilter: string
  setGenreFilter: (setGenreFilter: string) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  pageFilter: 1,
  setPageFilter: (pageFilter) => set(() => ({ pageFilter })),
  titleFilter: '',
  setTitleFilter: (titleFilter) => set(() => ({ titleFilter })),
  genreFilter: '',
  setGenreFilter: (genreFilter) => set(() => ({ genreFilter }))
}))
