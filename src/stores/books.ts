import { defineStore } from 'pinia'
import type { IBook, IBookDetail, IBooksState } from '../types/book.types';
import axios from "axios";

// API configuration in Heruko
const API_BASE_URL = 'https://circlesoftware-be-4104a8d601d4.herokuapp.com';

export const useBooksStore = defineStore('books', {
  state: (): IBooksState => ({
    books: [],
    selectedBook: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1
  }),

  getters: {
    isLoading: (state): boolean => state.loading,
    getBookById: (state) => {
      return (id: number): IBook | undefined => 
        state.books.find(book => book.id === id);
    },
    totalBooks: (state): number => state.books.length
  },

  actions: {
    // Fetch all books
    async fetchBooks(): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_BASE_URL}/books`);
        
        if (!response || response.status !== 200) {
          throw new Error(`HTTP error! status: ${response?.status || 'unknown'}`);
        }

        const data = response.data;
        console.log("DATA ", data)
        if (Array.isArray(data)) {
          this.books = data;
        } else if (data && Array.isArray(data.data)) {
          this.books = data.data;
        } else if (data && Array.isArray(data.books)) {
          this.books = data.books;
        } else {
          if (data && typeof data === 'object') {
            const arrayKeys = Object.keys(data).filter(key => Array.isArray(data[key]));
            if (arrayKeys.length > 0) {
              console.log(`📋 STORE: Using first array key: ${arrayKeys[0]}`);
              this.books = data[arrayKeys[0]];
            } else {
              this.books = [];
            }
          } else {
            this.books = [];
          }
        }

      } catch (error) {
        
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            this.error = `Cannot connect to server. Is the API running on ${API_BASE_URL}`;
          } else if (error.response?.status === 404) {
            this.error = 'Status 404';
          } else {
            this.error = `API Error: ${error.message}`;
          }
        } else {
          this.error = error instanceof Error ? error.message : 'Failed to fetch books';
        }
        
        this.books = [];
      } finally {
        this.loading = false;
      }
    },

    // Fetch book by ID
    async fetchBookById(id: number): Promise<IBookDetail | null> {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`${API_BASE_URL}/books/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IBookDetail = await response.json();
        console.log("GET THIS ID BOOK ", data)
        this.selectedBook = data.book;

        return data;
        
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch book';
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    setSelectedBook(book: IBook | null): void {
      this.selectedBook = book;
    },
    clearError(): void {
      this.error = null;
    },
    resetStore(): void {
      this.books = [];
      this.selectedBook = null;
      this.loading = false;
      this.error = null;
      this.currentPage = 1;
      this.totalPages = 1;
    }
  }
});