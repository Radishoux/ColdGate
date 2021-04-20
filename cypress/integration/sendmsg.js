import env from '../fixtures/env.json'

describe('login', () => {
    it('login', () => {
        cy.visit(env.prodlink)
        cy.get('#msg', { timeout: 100000 }).type(env.test_text1).type('{enter}')
        // cy.get('#username', { timeout: 100000 }).type(env.test_text1).type('{enter}')
    })
})