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
        },
      }
    }).as('getBook1') 

    cy.intercept('POST', '/books/1/purchase', {
      body: { 
        book: {
          id: 1, 
          title: "Test Book 1", 
          author: "Author 1", 
          isbn: "1234", 
          price: 10, 
          availableStock: 10
        },
        message:"Purchase successful"
      }
    }).as('postBook') 
    
    cy.visit('/')
  })

  it('should redirect to book detail page Test Book 1 when View Details is clicked', () => {
    cy.wait('@getBooks')
    cy.contains(TEST_CONTENT.BOOKS.TITLE_1).should('be.visible')
    cy.get('#book-btn-view-1').click()
    
    cy.url().should('include', '/book/1')
    cy.wait('@getBook1')

    cy.contains(TEST_CONTENT.BOOKS.TITLE_1).should('be.visible')
    cy.contains(TEST_CONTENT.BUTTONS.BUY_NOW).should('be.visible').click()
    cy.wait('@postBook')

    cy.contains(TEST_CONTENT.MESSAGES.PURCHASE_SUCCESS).should('be.visible')
    cy.contains(TEST_CONTENT.BOOKS.TITLE_1).should('be.visible')
    cy.contains(TEST_CONTENT.BUTTONS.CONTINUE_SHOPPING).should('be.visible')
  })
  
})