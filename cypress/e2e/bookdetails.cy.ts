import { TEST_CONTENT } from '../support/constants'

describe('Jeoffys Bookshop', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/books', { fixture: 'books.json' }).as('getBooks')

    cy.intercept('GET', '/books/1', {
      body: { 
        book: {
          id: 1, 
          title: "Test Book 1", 
          author: "Author 1", 
          isbn: "1234", 
          price: 10, 
          availableStock: 10
        }
      }
    }).as('getBook1') 
    
    cy.visit('/')
  })

  it('should load and display books', () => {
    cy.wait('@getBooks')
    cy.contains(TEST_CONTENT.BOOKS.TITLE_1).should('be.visible')
    cy.contains(TEST_CONTENT.BOOKS.AUTHOR_1).should('be.visible')
    cy.contains(TEST_CONTENT.BUTTONS.VIEW_DETAILS).should('have.attr', 'id', 'book-btn-view-1')
  })


  it('should redirect to book detail page Test Book 1 when View Details is clicked', () => {
    cy.wait('@getBooks')
    cy.get('#book-btn-view-1').click()
    
    cy.url().should('include', '/book/1')
    cy.wait('@getBook1')

    cy.contains(TEST_CONTENT.BOOKS.TITLE_1).should('be.visible')
    cy.contains(TEST_CONTENT.BOOKS.AUTHOR_1).should('be.visible')
    cy.contains(TEST_CONTENT.BOOK_DETAILS.ISBN).should('be.visible')
    cy.contains(TEST_CONTENT.BOOK_DETAILS.PRICE).should('be.visible')
    cy.contains(TEST_CONTENT.BOOK_DETAILS.AVAILABILITY).should('be.visible')
  })

  it('should handle empty book details response', () => {
    cy.intercept('GET', '**/books/1', { forceNetworkError: true }).as('emptyBook')
    cy.wait('@getBooks')
    cy.get('#book-btn-view-1').click()
    cy.url().should('include', '/book/1')
    cy.wait('@emptyBook')
    cy.contains(TEST_CONTENT.MESSAGES.NO_BOOKS).should('be.visible')
  })
  
})