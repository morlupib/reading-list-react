import { useState } from 'react'
import { Book } from '../types'
import { FavoriteItem } from './FavoriteItem'
import { DRAG_EVENTS } from '../constants'
import { useBook } from '../hooks'

interface Props {
	favorites: Book[]
}

export function FavoriteList({ favorites }: Props) {
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
	const { updateFavorites, availableBooks } = useBook()

	const reorderFavorites = ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
		setDragOverIndex(null)

		const itemToDelete = favorites[fromIndex]
		const updatedFavorites = favorites.toSpliced(fromIndex, 1).toSpliced(toIndex, 0, itemToDelete)

		updateFavorites({ updatedFavorites })
	}

	const handleDropItemPosition = ({ fromIndex }: { fromIndex: number }) => {
		if (dragOverIndex === null || dragOverIndex === fromIndex) return setDragOverIndex(null)

		reorderFavorites({ fromIndex, toIndex: dragOverIndex })
	}

	const addToFavorites = ({ bookId }: { bookId: string }) => {
		const bookToAdd = availableBooks.find((book) => book.ISBN === bookId)

		if (!bookToAdd) return

		const updatedFavorites = favorites.toSpliced(dragOverIndex ?? 0, 0, bookToAdd)
		updateFavorites({ updatedFavorites })
		setDragOverIndex(null)
	}

	const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
		const fromIndex = e.dataTransfer.getData(DRAG_EVENTS.FROM_SORTED_INDEX)
		const bookToAdd = e.dataTransfer.getData(DRAG_EVENTS.ADD_FAVORITES)

		if (fromIndex !== '') {
			handleDropItemPosition({ fromIndex: +fromIndex })
		}

		if (bookToAdd !== '') {
			addToFavorites({ bookId: bookToAdd })
		}
	}

	const currentDragOverIndex = (index: number) => {
		setDragOverIndex(index)
	}

	return (
		<ul
			className='flex flex-col w-full gap-3 h-full'
			onDrop={handleDrop}
			onDragOver={(e) => e.preventDefault()}
		>
			{favorites.map((book, index) => (
				<FavoriteItem
					key={book.ISBN}
					index={index}
					favorite={book}
					currentDragOverIndex={currentDragOverIndex}
					dragOverIndex={dragOverIndex}
				/>
			))}
		</ul>
	)
}
