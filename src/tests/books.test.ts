import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBooksStore } from '../stores/books'
import axios from 'axios'
import type { IBook, IBookDetail } from '../types/book.types'

vi.mock('axios')
const mockedAxios = axios as any

describe('useBooksStore - fetch all books -> fetchBooks()', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should fetch books successfully', async () => {
    const mockBooks: IBook [] = [
      { id: 1, title: 'Book 1', author: 'Author 1', isbn:'1234', price: 10, availableStock: 10 },
      { id: 2, title: 'Book 2', author: 'Author 2', isbn: '5678', price: 15, availableStock: 15 }
    ];
    
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockBooks
    })

    const store = useBooksStore()
    await store.fetchBooks()

    expect(store.books).toEqual(mockBooks)
    expect(store.books).toHaveLength(2);
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('should handle API error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('HTTP error!'))

    const store = useBooksStore()
    await store.fetchBooks()

    expect(store.books).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('HTTP error!')
  })
})

describe('useBooksStore - fetch book by ID -> fetchBookById()', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should fetch single book successfully', async () => {
    const mockBook: IBookDetail = {
      book: { id: 2, title: 'Book 2', author: 'Author 2', isbn: '5678', price: 15, availableStock: 15 }
    };
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockBook
    })
    const store = useBooksStore()
    await store.fetchBookById(2)
    expect(store.selectedBook).toEqual(mockBook.book)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('fetachById() with book not found result', async () => {
    const notFound = {
      message: 'Book not found'
    };
    mockedAxios.get.mockResolvedValue({
      status: 404,
      data: notFound
    })
    const store = useBooksStore()
    await store.fetchBookById(1)
    expect(store.error).toEqual('HTTP error! status: 404')
  })
 
})


describe('useBooksStore - purchase book -> purchaseBookById()', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should purchase it successfully', async () => {
    const mockBookPurchased: IBookDetail = {
      message: "Purchase successful",
      book: {
              id: 2,
              title: "1984",
              author: "George Orwell",
              isbn: "9780451524935",
              price: 9.99,
              availableStock: 7
      }
    };
    
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: mockBookPurchased
    })

    const store = useBooksStore()
    await store.purchaseBookById(2)

    expect(store.purchasedBook?.book).toEqual(mockBookPurchased.book)
    expect(store.purchasedBook?.message).toEqual(mockBookPurchased.message)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })
 
})