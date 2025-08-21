import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBooksStore } from '../stores/books'

const mockBooksResponse = {
  data: {
    books: [
      {
        id: 1,
        title: 'Test Book 1',
        author: 'Author 1',
        isbn: '1234',
        availableStock: 10,
        price: 10
      },
      {
        id: 2,
        title: 'Test Book 2',
        author: 'Author 2',
        isbn: '4567',
        availableStock: 15,
        price: 15
      }
    ]
  }
}

const mockBookResponse = {
  data: {
    book: {
      id: 1,
      title: 'Test Book 1',
      author: 'Author 1',
      isbn: '1234',
      availableStock: 10,
      price: 10
    }
  }
}

vi.mock('axios', () => {
  const mockGet = vi.fn()
  const mockAxiosInstance = {
    get: mockGet
  }

  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      isAxiosError: vi.fn()
    },
    mockGet,
    mockAxiosInstance
  }
})

const { mockGet } = (await import('axios')) as any

describe('useBooksStore - fetchBooks()', () => {
  let store: ReturnType<typeof useBooksStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    mockGet.mockClear()
    store = useBooksStore()
  })

  describe('Successful API calls', () => {
    it('should fetch books successfully and update state', async () => {
      mockGet.mockResolvedValueOnce(mockBooksResponse)

      await store.fetchBooks()

      expect(mockGet).toHaveBeenCalledWith('/books')
      expect(mockGet).toHaveBeenCalledTimes(1)
      expect(store.books).toEqual(mockBooksResponse.data.books)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should fetch book by id successfully', async () => {
      mockGet.mockResolvedValueOnce(mockBookResponse)

      await store.fetchBookById(1)

      expect(mockGet).toHaveBeenCalledWith('/books/1')
      expect(mockGet).toHaveBeenCalledTimes(1)
      expect(store.selectedBook).toEqual(mockBookResponse.data.book)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })
  })
}) 