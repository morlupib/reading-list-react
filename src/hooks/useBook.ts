import { useCallback, useMemo, useState } from 'react'
import { useBookStore } from '../store/book'
import { bookService } from '../services/books'
import { Book } from '../types'
import { useFilter } from './useFilter'
import { useLocalStorage } from './useLocalStorage'

export function useBook() {
	const { books, setBooks, maxPages, setMaxPages, favorites, setFavorites } = useBookStore()
	const { pageFilter, updatePageFilter, titleFilter, genreFilter } = useFilter()
	const { setToLocalStorage } = useLocalStorage()
	const [loading, setLoading] = useState(true)

	const getBooks = useCallback(async () => {
		const data: Book[] = await bookService()
		setBooks(data)

		const maxPages = Math.max(...data.map((book) => book.pages))

		updatePageFilter({ page: maxPages })
		setMaxPages(maxPages)
	}, [setBooks, setMaxPages, updatePageFilter])

	const addFavorite = ({ newFavorite }: { newFavorite: Book }) => {
		const updatedFavorites = [...favorites, newFavorite]
		setFavorites(updatedFavorites)
		setToLocalStorage(updatedFavorites)
	}

	const updateFavorites = useCallback(
		({ updatedFavorites }: { updatedFavorites: Book[] }) => {
			setFavorites(updatedFavorites)
			setToLocalStorage(updatedFavorites)
		},
		[setFavorites, setToLocalStorage]
	)

	const removeFromFavorites = useCallback(
		({ bookId }: { bookId: string }) => {
			const newFavorites = favorites.filter((favorite) => favorite.ISBN !== bookId)
			updateFavorites({ updatedFavorites: newFavorites })
		},
		[favorites, updateFavorites]
	)

	const availableBooks = useMemo(() => {
		return favorites.length !== 0
			? books.filter(
					(availableBook) => !favorites.some((favorite) => favorite.ISBN === availableBook.ISBN)
			  )
			: books
	}, [books, favorites])

	const filteredBooks = useMemo(() => {
		return availableBooks.filter((book) => {
			return (
				book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
				book.genre.toLowerCase().includes(genreFilter.toLowerCase()) &&
				book.pages < pageFilter
			)
		})
	}, [availableBooks, pageFilter, titleFilter, genreFilter])

	return {
		getBooks,
		filteredBooks,
		maxPages,
		loading,
		setLoading,
		favorites,
		addFavorite,
		removeFromFavorites,
		updateFavorites,
		availableBooks
	}
}
