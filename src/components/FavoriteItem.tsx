import { DRAG_EVENTS } from '../constants'
import { useBook } from '../hooks'
import { Book } from '../types'
import { DeleteIcon } from './Icons'

interface Props {
	favorite: Book
	index: number
	currentDragOverIndex: (index: number) => void
	dragOverIndex: number | null
}

export function FavoriteItem({ favorite, index, currentDragOverIndex, dragOverIndex }: Props) {
	const { removeFromFavorites } = useBook()

	const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
		e.dataTransfer.setData(DRAG_EVENTS.FROM_SORTED_INDEX, String(index))
		e.dataTransfer.setData(DRAG_EVENTS.REMOVE_FAVORITES, favorite.ISBN)
	}

	const handleDragEnter = () => {
		currentDragOverIndex(index)
	}

	const handleRemoveFromFavorites = () => {
		removeFromFavorites({ bookId: favorite.ISBN })
	}

	const isDraggedOver = dragOverIndex === index

	return (
		<li
			key={favorite.ISBN}
			className={`bg-gray-50 relative rounded-2xl border border-gray-200 p-2 flex justify-between items-center h-44 ${
				isDraggedOver ? 'mt-4' : 'mt-0'
			}`}
			draggable
			onDragStart={handleDragStart}
			onDragEnter={handleDragEnter}
			onDragOver={(e) => e.preventDefault()}
		>
			<div className='w-2/3 flex flex-col justify-between items-start h-full px-2'>
				<div className='flex justify-between items-center w-full'>
					<p className='bg-gray-200 rounded-full whitespace-nowrap py-1 px-2 border border-gray-300 text-xs font-bold text-gray-400'>
						{favorite.genre}
					</p>
				</div>
				<div className='flex flex-col'>
					<p className='text-lg font-bold'>{favorite.title}</p>
					<p className='text-gray-400 text-xs font-semibold'>
						{favorite.author.name} - {favorite.year}
					</p>
				</div>
				<div className='flex justify-between items-center w-full'>
					<p className='text-gray-500 text-sm font-medium'>{favorite.pages} pages</p>
				</div>
			</div>
			<div className='w-1/3 h-full rounded-xl overflow-hidden bg-white shadow-md'>
				<img className='object-cover w-full h-full' src={favorite.cover} alt={favorite.title} />
			</div>
			<div className='absolute top-[-8px] right-[-8px]'>
				<button onClick={handleRemoveFromFavorites}>
					<DeleteIcon />
				</button>
			</div>
		</li>
	)
}
