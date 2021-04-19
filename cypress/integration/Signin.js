import env from '../fixtures/env.json'

describe('login', () => {
    it('login', () => {
        cy.visit(env.prodlink)
        cy.get('#username').type(env.SIusername)
        cy.get('#password').type(env.SIpassword)
        cy.contains('SIGN IN')
    })
})