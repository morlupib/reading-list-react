import { useBook } from '../hooks'
import { Badge } from './Badge'
import { FavoriteList } from './FavoriteList'

export function Favorites() {
	const { favorites } = useBook()
	return (
		<div className='bg-gray-200 p-4 rounded-tl-2xl items-center overflow-hidden overflow-y-auto h-full lg:h-full w-96'>
			<div className='flex justify-start items-center gap-4 mb-8'>
				<h2 className='text-lg font-bold'>My reading list</h2>
				<Badge className='text-xs h-6 w-6' value={favorites.length} />
			</div>
			<FavoriteList favorites={favorites} />
		</div>
	)
}
