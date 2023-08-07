import { useId } from 'react'

interface PageFilterProps {
	pageFilter: number
	maxPages: number
	updatePageFilter: ({ page }: { page: number }) => void
}

export function PageFilter({ pageFilter, maxPages, updatePageFilter }: PageFilterProps) {
	const idRange = useId()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updatePageFilter({ page: +event.target.value })
	}

	return (
		<div className='flex flex-col w-2/4'>
			<div className='flex items-center justify-between mb-2'>
				<label className='text-xs font-bold text-gray-500' htmlFor={idRange}>
					Pages:
				</label>
				<p className='bg-gray-800 rounded-full px-2 text-xs text-white font-bold'>{pageFilter}</p>
			</div>
			<input
				id={idRange}
				role='filter-page'
				type='range'
				min='1'
				max={maxPages}
				value={pageFilter}
				onChange={handleChange}
				className='h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-700'
			/>
		</div>
	)
}
