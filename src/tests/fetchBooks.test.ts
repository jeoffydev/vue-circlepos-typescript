import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBooksStore } from '../stores/books'
import axios from 'axios'

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn()
    })),
    isAxiosError: vi.fn()
  }
}))

const mockedAxios = axios as any

describe('fetchBooks', () => {
  let mockApiClient: any

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockApiClient = { get: vi.fn() }
    mockedAxios.create.mockReturnValue(mockApiClient)
  })

  it('should fetch books successfully', async () => {
    const mockBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' }
    ]

    mockApiClient.get.mockResolvedValue({
      data: { books: mockBooks }
    })

    const store = useBooksStore()
    await store.fetchBooks()

    expect(store.loading).toBe(false)
  })
})