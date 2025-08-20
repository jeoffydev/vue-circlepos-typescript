import {
  defineStore
} from 'pinia'
import type {
  IBook,
  IBookDetail,
  IBooksState
} from '../types/book.types';
import axios from "axios";

const API_BASE_URL = 'https://circlesoftware-be-4104a8d601d4.herokuapp.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const useBooksStore = defineStore('books', {
  state: (): IBooksState => ({
    books: [],
    selectedBook: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    purchasedBook: null
  }),

  getters: {
    isLoading: (state): boolean => state.loading,
  },

  actions: {
    async fetchBooks(): Promise < void > {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get('/books');
        const data = response.data;
    
        if (data && Array.isArray(data.books)) {
          this.books = data.books;
        } 
      } catch (error) {
        if (axios.isAxiosError(error)) {
            this.error = `Cannot connect to server ${error}`;
        } else {
          this.error = error instanceof Error ? error.message : 'Failed to fetch books';
        }
        this.books = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchBookById(id: number): Promise < IBookDetail | null > {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiClient.get(`/books/${id}`);
        const data: IBookDetail = response.data;
        this.selectedBook = data.book;
        return data;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch book';
        return null;
      } finally {
        this.loading = false;
      }
    },
    async purchaseBookById(id: number): Promise < IBookDetail | null > {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiClient.post(`/books/${id}/purchase`);
        const data: IBookDetail = response.data;
        this.purchasedBook = data;
        return data;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to purchase book';
        return null;
      } finally {
        this.loading = false;
      }
    },
    clearSelectedBook() {
      this.selectedBook = null;
    },
    clearPurchasedBook() {
      this.purchasedBook = null;
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
      this.purchasedBook = null;
    }
  }
});