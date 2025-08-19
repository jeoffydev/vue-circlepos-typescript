
export interface IBook {
  id: number;
  title: string;
  author: string;
  description?: string; // optional
  price?: number;
  category?: string; // optional
  isbn?: string;
  publishedYear?: number; // optional
  imageUrl?: string; //for future image 
  availableStock?: boolean;
}

export interface IBookDetail {
  book: IBook;
  message: string;
}

export interface IBooksState {
  books: IBook[];
  selectedBook: IBook | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  purchasedBook: IBookDetail | null;
}