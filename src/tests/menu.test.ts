import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createMenuHelpers } from '../helpers/menu'
import type { IMenuState } from '../types/menu.types'

interface MockMenuState extends IMenuState {
  isMenuOpen: boolean
  isDropdownOpen: boolean
}

describe('createMenuHelpers', () => {
  let menuElement: HTMLElement
  let outsideElement: HTMLElement

  beforeEach(() => {

    // Create mock DOM elements
    menuElement = document.createElement('div')
    menuElement.id = 'menu'
    menuElement.innerHTML = '<button>Menu Button</button>'
    
    outsideElement = document.createElement('div')
    outsideElement.id = 'outside'
    outsideElement.innerHTML = '<p>Outside content</p>'

    // Add elements to document body
    document.body.appendChild(menuElement)
    document.body.appendChild(outsideElement)

    // Clear any existing event listeners
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = ''
    
    // Remove all event listeners
    const events = ['click', 'mousedown', 'keydown']
    events.forEach(event => {
      document.removeEventListener(event, vi.fn() as any)
    })
  })

  describe('integration tests for menu helper', () => {
    it('should create multiple helpers with different states', () => {
      // Arrange: Create two different states
      const state1: MockMenuState = { isMenuOpen: true, isDropdownOpen: true }
      const state2: MockMenuState = { isMenuOpen: false, isDropdownOpen: true }
      
      const helpers1 = createMenuHelpers(state1)
      const helpers2 = createMenuHelpers(state2)

      // Act: Close both menus
      helpers1.closeMenu()
      helpers2.closeMenu()

      // Assert: Both states should be closed
      expect(state1.isMenuOpen).toBe(false)
      expect(state1.isDropdownOpen).toBe(false)
      expect(state2.isMenuOpen).toBe(false)
      expect(state2.isDropdownOpen).toBe(false)
    })
  })
})