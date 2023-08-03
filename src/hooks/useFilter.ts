import { useCallback } from 'react'
import { useFilterStore } from '../store/filter'

export function useFilter() {
  const {
    pageFilter,
    setPageFilter,
    titleFilter,
    setTitleFilter,
    genreFilter,
    setGenreFilter
  } = useFilterStore()

  const updatePageFilter = useCallback(
    ({ page }: { page: number }) => {
      setPageFilter(page)
    },
    [setPageFilter]
  )

  const updateTitleFilter = useCallback(
    ({ title }: { title: string }) => {
      setTitleFilter(title)
    },
    [setTitleFilter]
  )

  const updateGenreFilter = useCallback(
    ({ genre }: { genre: string }) => {
      setGenreFilter(genre)
    },
    [setGenreFilter]
  )

  return {
    pageFilter,
    titleFilter,
    genreFilter,
    updatePageFilter,
    updateTitleFilter,
    updateGenreFilter
  }
}
