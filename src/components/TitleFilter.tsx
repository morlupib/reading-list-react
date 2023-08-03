import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks'
import { SearchIcon } from './Icons'

interface TitleFilterProps {
  updateTitleFilter: ({ title }: { title: string }) => void
}

export function TitleFilter({ updateTitleFilter }: TitleFilterProps) {
  const [title, setTitle] = useState('')
  const debonceValue = useDebounce(title, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    updateTitleFilter({ title: debonceValue })
  }, [debonceValue, updateTitleFilter])

  return (
    <div className='flex justify-start items-center bg-gray-100 rounded-lg py-2 px-4 text-sm gap-2 w-full'>
      <SearchIcon />
      <input
        type='text'
        value={title}
        onChange={handleChange}
        placeholder='Search book titles...'
        className='focus:outline-none bg-transparent'
      />
    </div>
  )
}
