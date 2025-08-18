export interface IMenuState {
  isMenuOpen: boolean;
  isDropdownOpen: boolean;
}

export interface IMenuItems {
  id: number;
  label: string;
  to: string;
}