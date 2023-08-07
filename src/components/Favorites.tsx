import { DeleteIcon } from './Icons'
import { useBook } from '../hooks'
import { useMenu } from '../store'
import { Badge } from './Badge'
import { FavoriteList } from './FavoriteList'

export function Favorites() {
	const { favorites } = useBook()
	const { onClose } = useMenu()

	if (favorites.length <= 0) {
		return null
	}

	return (
		<section className='hidden lg:flex'>
			<div className='bg-gray-200 p-4 rounded-tl-2xl items-center overflow-hidden overflow-y-auto h-full lg:h-full w-96'>
				<div className='flex justify-between items-center gap-4 mb-8'>
					<div className='flex items-center gap-4'>
						<h2 className='text-lg font-bold'>My reading list</h2>
						<Badge className='text-xs h-6 w-6' value={favorites.length} />
					</div>
					<button className='lg:hidden' onClick={() => onClose()}>
						<DeleteIcon />
					</button>
				</div>
				<FavoriteList favorites={favorites} />
			</div>
		</section>
	)
}
