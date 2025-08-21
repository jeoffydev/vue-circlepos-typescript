import { TEST_CONTENT } from "../support/constants"

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
  it('should redirect to shop page See all books  button is clicked', () => {
    cy.wait('@getBooks')
    cy.contains(TEST_CONTENT.BUTTONS.SEE_ALL_BOOKS).should('be.visible').click()

    cy.url().should('include', '/shops')
    cy.contains(TEST_CONTENT.PAGES.BOOK_SHOP, { timeout: 10000 }).should('be.visible')
    cy.get('article').should('have.length', 2)
  })

  it('should handle empty books response', () => {
    cy.intercept('GET', '**/books', { forceNetworkError: true }).as('emptyBooks')
    cy.visit('/shops')
    cy.wait('@emptyBooks')
    cy.contains(TEST_CONTENT.MESSAGES.NO_BOOKS).should('be.visible')
  })
  
})