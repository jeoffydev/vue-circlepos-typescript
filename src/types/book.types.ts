
export interface IBook {
  id: number;
  title: string;
  author: string;
  description?: string;
  price?: number;
  category?: string;
  isbn?: string;
  publishedYear?: number;
  imageUrl?: string;
  inStock?: boolean;
}

export interface IBookDetail {
  book: IBook;
}

export interface IBooksState {
  books: IBook[];
  selectedBook: IBook | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}