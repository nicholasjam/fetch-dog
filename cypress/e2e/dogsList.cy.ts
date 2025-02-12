/// <reference types="cypress" />

describe('Dogs List Page Test', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('.bg-white', { timeout: 10000 }).should('be.visible');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/search', { timeout: 10000 });
    cy.get('.bg-white').should('be.visible');
  });

  it('should render the dogs list page properly', () => {
    cy.wait(1000);
    cy.get('h1').should('be.visible').and('contain', 'Find Your Furry Friend!');
    cy.get('.cursor-pointer').should('be.visible').and('contain', 'Logout');
  });

  it('should display dog cards after loading', () => {
    cy.wait(1000);
    cy.get('.grid')
      .find('[data-testid="dog-card"]')
      .should('have.length.at.least', 1);
  });

  it('should show total results', () => {
    cy.wait(1000);
    cy.contains('Total Results:').should('be.visible');
  });

  it('should handle favorite dogs functionality', () => {
    cy.wait(1000);
    cy.get('[data-testid="dog-card"]').first()
      .find('[data-testid="favorite-button"]')
      .click();

    cy.get('.fixed.bottom-8.right-8')
      .should('be.visible')
      .and('contain', 'Generate Match');
  });

  it('should handle match generation', () => {
    cy.wait(1000);
    cy.get('[data-testid="dog-card"]').first()
      .find('[data-testid="favorite-button"]')
      .click();
    cy.get('.fixed.bottom-8.right-8').click();

    cy.get('.fixed.bottom-20.right-10')
      .should('be.visible')
      .and('contain', 'Your Perfect Match!');
  });

  it('should handle logout functionality', () => {
    cy.wait(1000);
    cy.get('.cursor-pointer').click();
    cy.url().should('include', '/login');
  });
});
