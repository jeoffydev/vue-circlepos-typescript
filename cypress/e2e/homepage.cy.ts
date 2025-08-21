import { TEST_CONTENT } from '../support/constants'

describe('Jeoffys Bookshop', () => {
  beforeEach(() => {
    cy.intercept('GET', '/books', { fixture: 'books.json' }).as('getBooks')
    cy.visit('/')
  })

  it('should load and display books', () => {
    cy.wait('@getBooks')
    cy.contains(TEST_CONTENT.BOOKS.TITLE_1).should('be.visible')
    cy.contains(TEST_CONTENT.BOOKS.AUTHOR_1).should('be.visible')
    cy.contains(TEST_CONTENT.BUTTONS.VIEW_DETAILS).should('have.attr', 'id', 'book-btn-view-1')
  })

  it('should have Title Featured Books on the homepage', () => {
    cy.wait('@getBooks')
    cy.contains(TEST_CONTENT.PAGES.FEATURED_BOOKS).should('be.visible')
  })

  it('should have display 2 books', () => {
    cy.wait('@getBooks')
     cy.get('article').should('have.length', 2)
  })

  it('should have button to redirect to shop for all the books', () => {
    cy.wait('@getBooks')
    cy.contains(TEST_CONTENT.BUTTONS.SEE_ALL_BOOKS).should('be.visible')
  })

  it('should handle empty books response', () => {
    cy.intercept('GET', '**/books', { forceNetworkError: true }).as('emptyBooks')
    cy.visit('/')
    cy.wait('@emptyBooks')
    cy.contains(TEST_CONTENT.MESSAGES.NO_BOOKS).should('be.visible')
  })

})