import { useCallback, useEffect } from 'react'
import { Books, Favorites } from './components'
import { useBook, useLocalStorage } from './hooks'
import { useMenu } from './store'
import SideMenu from './components/SideMenu'

export function App() {
	const { getBooks, loading, setLoading, updateFavorites } = useBook()
	const { getFromLocalStorage } = useLocalStorage()
	const { isOpen } = useMenu()

	const handleGetBooks = useCallback(async () => {
		setLoading(true)

		try {
			await getBooks()
			updateFavorites({ updatedFavorites: getFromLocalStorage() })
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}, [getBooks, setLoading, updateFavorites, getFromLocalStorage])

	useEffect(() => {
		handleGetBooks()
	}, [handleGetBooks])

	if (loading) return <div>Loading...</div>

	return (
		<main className='flex pt-4 h-screen'>
			<Books />
			<Favorites />
			{isOpen && <SideMenu />}
		</main>
	)
}
