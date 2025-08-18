import { defineStore } from 'pinia'
import type { IBook, IBooksState } from '../types/book.types';

// API configuration
const API_BASE_URL = 'http://localhost:8000';


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

    // Check if currently loading
    isLoading: (state): boolean => state.loading,

    // Get book by ID
    getBookById: (state) => {
      return (id: number): IBook | undefined => 
        state.books.find(book => book.id === id);
    },

    // Get total books count
    totalBooks: (state): number => state.books.length
  },

  actions: {
    // Fetch all books
    async fetchBooks(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
         
        const response = await fetch(`${API_BASE_URL}/books`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data); // Debug log

      if (Array.isArray(data.books)) {
        console.log('Success - setting books data');
        // Assign the actual books array, not the whole response
        this.books = data.books;
        this.loading = false;
      } else if (data == null) {
        console.log('Still retrieving data, retrying...');
       this.loading = true;
      } else {
        throw new Error(`API returned: ${data}`);
      }
        console.log('Books fetched successfully:', this.books.length, 'books');
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch books';
        console.error('Error fetching books:', error);
        // if Error then set books to empty
        this.books = [];
      } finally {
        // set loading to false
        this.loading = false;
      }
    },

    // Fetch single book by ID
    async fetchBookById(id: number): Promise<IBook | null> {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`${API_BASE_URL}/books/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const book: IBook = await response.json();
        this.selectedBook = book;
        
        // Also add/update in books array if not exists
        const existingIndex = this.books.findIndex(b => b.id === id);
        if (existingIndex >= 0) {
          this.books[existingIndex] = book;
        } else {
          this.books.push(book);
        }

        return book;
        
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch book';
        console.error('Error fetching book:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },
  

    // Utility actions
    setSelectedBook(book: IBook | null): void {
      this.selectedBook = book;
    },

    clearError(): void {
      this.error = null;
    },

    // Reset store state
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