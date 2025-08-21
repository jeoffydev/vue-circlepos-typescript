import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useMenu } from '../composables/useMenu'

describe('useMenu', () => {
  let menuElement: HTMLElement

  beforeEach(() => {
    menuElement = document.createElement('div')
    document.body.appendChild(menuElement)
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('should initialize with menu closed', () => {
    const { isMenuOpen } = useMenu()
    expect(isMenuOpen.value).toBe(false)
  })

  it('should open menu', () => {
    const { isMenuOpen, openMenu } = useMenu()
    openMenu()
    expect(isMenuOpen.value).toBe(true)
  })

  it('should close menu', () => {
    const { isMenuOpen, openMenu, closeMenu } = useMenu()
    openMenu()
    expect(isMenuOpen.value).toBe(true)
    closeMenu()
    expect(isMenuOpen.value).toBe(false)
  })
})