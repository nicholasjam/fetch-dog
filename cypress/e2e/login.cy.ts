/// <reference types="cypress" />

describe('Login Page Test', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should render the login form properly', () => {
    cy.get('.bg-white').within(() => {
      cy.get('h1').should('be.visible').and('contain', 'Welcome Dog Lover!');
      cy.get('input[name="name"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible').and('contain', 'Login');
    });
  });

  it('should show validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-500').should('have.length', 2);
    cy.get('.text-red-500').first().should('contain', 'Name is required');
    cy.get('.text-red-500').last().should('contain', 'Email is required');
  });

  it('should show an error for invalid email format', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-500').should('contain', 'Invalid email');
  });

  it('should submit the form with valid inputs', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/search', { timeout: 10000 });
  });

  it('should display the loading state while submitting', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('button[type="submit"]').click();

    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('contain', 'Logging in...');
  });
});
