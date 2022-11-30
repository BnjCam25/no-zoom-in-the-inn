describe('Sign in page', () => {
    it('has a form', () => {
      cy.visit('/sessions/new')
      cy.get('#new-session-form').contains('Email')
    })
})
