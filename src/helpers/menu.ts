import type { IMenuState } from "../types/menu.types";

export const createMenuHelpers = (state: IMenuState) => {
  const closeMenu = () => {
    state.isMenuOpen = false;
    state.isDropdownOpen = false;
  };

  const setupClickOutside = (element: HTMLElement) => {
    const handleClick = (e: Event) => {
      if (!element.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  };

  return {
    closeMenu,
    setupClickOutside
  };
};