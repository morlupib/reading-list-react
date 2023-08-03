import { useBook } from '../hooks'
import { Header } from './Header'
import { BookList } from './BookList'
import { DRAG_EVENTS } from '../constants'

export function Books() {
	const { filteredBooks, removeFromFavorites } = useBook()

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		const bookId = e.dataTransfer.getData(DRAG_EVENTS.REMOVE_FAVORITES)
		removeFromFavorites({ bookId })
	}

	return (
		<section
			className='flex flex-col px-4 gap-4 w-full overflow-hidden'
			onDrop={handleDrop}
			onDragOver={(e) => e.preventDefault()}
		>
			<Header />
			<BookList books={filteredBooks} />
		</section>
	)
}
