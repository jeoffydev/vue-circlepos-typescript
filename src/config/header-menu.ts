import type { IMenuItems } from "../types/menu.types";

export const menuItems: IMenuItems[]  = [
  {
    id: 1,
    label: 'Home',
    to: '/',
  },
  {
    id: 2,
    label: 'Bookshop',
    to: '/shops',
  },
  {
    id: 3,
    label: 'About',
    to: '/about',
  }
]