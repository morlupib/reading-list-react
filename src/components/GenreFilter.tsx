import { GENRES_ALLOWED } from '../constants'
import { useBook, useFilter } from '../hooks'
import { type GenreAllowed } from '../types'
import { Badge } from './Badge'

interface Props {
  genre: GenreAllowed
}

function ButtonGenre({ genre }: Props) {
  const { genreFilter, updateGenreFilter } = useFilter()
  const { filteredBooks } = useBook()

  const isActive = genreFilter === genre

  return (
    <button
      className={`flex relative justify-center items-center rounded-full border border-gray-200 font-semibold h-9 py-3 px-4 whitespace-nowrap
        ${isActive ? 'text-white bg-gray-800' : 'text-gray-800'}
      `}
      onClick={() => updateGenreFilter({ genre })}
    >
      {genre === '' ? 'All' : genre}
      {isActive && <Badge value={filteredBooks.length} />}
    </button>
  )
}

export function GenreFilter() {
  return (
    <div className='flex justify-start items-center gap-4 pt-2 overflow-hidden overflow-x-auto w-full'>
      <ButtonGenre genre='' />
      {Object.entries(GENRES_ALLOWED).map(([key, value]) => (
        <ButtonGenre key={key} genre={value} />
      ))}
    </div>
  )
}
