import { Badge } from '.'
import { useBook, useFilter } from '../hooks'
import { GenreFilter } from './GenreFilter'
import { SideMenuButton } from './Icons'
import { PageFilter } from './PageFilter'
import { TitleFilter } from './TitleFilter'

export function Header() {
	const { maxPages, favorites } = useBook()
	const { pageFilter, updatePageFilter, updateTitleFilter } = useFilter()

	return (
		<header className='flex flex-col items-center justify-between gap-4'>
			<div className='flex flex-col lg:flex-row items-center justify-between w-full gap-4'>
				<div className='flex justify-between items-center w-full h-12'>
					<h1 className='text-2xl font-bold w-full'>Bookshelf Pro</h1>
					<button className='lg:hidden relative'>
						<SideMenuButton />
						<Badge
							className='absolute top-[-8px] right-[-8px] h-4 w-4 text-sm'
							value={favorites.length}
						/>
					</button>
				</div>

				<div className='flex items-center justify-center gap-6 w-full'>
					<TitleFilter updateTitleFilter={updateTitleFilter} />
					<PageFilter
						pageFilter={pageFilter}
						maxPages={maxPages}
						updatePageFilter={updatePageFilter}
					/>
				</div>
			</div>
			<GenreFilter />
		</header>
	)
}
