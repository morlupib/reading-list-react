import { type Book } from '../types'
import { BookItem } from './BookItem'

interface Props {
	books: Book[]
}

export function BookList({ books }: Props) {
	if (books.length === 0) {
		return <div>No books</div>
	}

	return (
		<ul className='grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5 w-full overflow-hidden overflow-y-auto'>
			{books.map((book) => (
				<BookItem key={book.title} book={book} />
			))}
		</ul>
	)
}
