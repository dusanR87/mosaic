describe('Homepage', () => {
    it('Should render Homepage', () => {
      cy.visit('http://localhost:3000/')
      const div = cy.get('#Mosaic')
    })
    it('Should change tile color', () => {
      cy.visit('http://localhost:3000/')
      cy.get('#00').click()
      cy.get('#00').should('have.css', 'background-color', 'rgb(170, 187, 204)')
    })
    it('Should change tile with other color', () => {
      cy.visit('http://localhost:3000/')
      cy.get('#colorPicker').click()
      cy.get('#01').click()
    })

    it('Should not change tile color on second click', () => {
      cy.visit('http://localhost:3000/')
      cy.get('#02').click()
      cy.get('#colorPicker').click()
      cy.get('#02').click()
    })
    
})