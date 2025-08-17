export interface IMenuState {
  isMenuOpen: boolean;
  isDropdownOpen: boolean;
}

export const createMenuHelpers = (state: IMenuState) => {
  const toggleMenu = () => {
    state.isMenuOpen = !state.isMenuOpen;
  };

  const closeMenu = () => {
    state.isMenuOpen = false;
    state.isDropdownOpen = false;
  };

  const showDropdown = () => {
    state.isDropdownOpen = true;
  };

  const hideDropdown = () => {
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
    toggleMenu,
    closeMenu,
    showDropdown,
    hideDropdown,
    setupClickOutside
  };
};