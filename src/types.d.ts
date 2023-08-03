import { type GENRES_ALLOWED } from '../constants'

declare global {
  interface Array<T> {
    toSpliced: (start: number, deleteCount: number, ...items: T[]) => T[]
  }
}

export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: Author
}

export interface Author {
  name: string
  otherBooks: string[]
}

export type GenreAllowed = (typeof GENRES_ALLOWED)[number]
