import { useCallback } from 'react'
import { type Book } from '../types'

const BOOK_LOCAL_STORE_NAME = 'favorites'

export function useLocalStorage() {
  const setToLocalStorage = useCallback((favorites: Book[]) => {
    window.localStorage.setItem(
      BOOK_LOCAL_STORE_NAME,
      JSON.stringify(favorites)
    )
  }, [])

  const getFromLocalStorage = useCallback(() => {
    const favorites = window.localStorage.getItem(BOOK_LOCAL_STORE_NAME)

    if (favorites == null) return []

    try {
      return JSON.parse(favorites)
    } catch (error) {
      console.error(error)
      return []
    }
  }, [])

  return {
    setToLocalStorage,
    getFromLocalStorage
  }
}
