import booksMocks from '../mocks/books.json'
import { Book } from '../types'

export const bookService = async (): Promise<Book[]> => {
  const booksReponse = booksMocks.library.map(({ book }) => {
    return book
  })

  return booksReponse
}
