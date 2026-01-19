describe('Add Liquidity', () => {
  // Using Stratis mainnet token addresses
  // WSTRAX: 0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18
  // USDT: 0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C
  // USDC: 0xDD0C4bb4b46A1C10D36593E4FA5F76abdB583f7A

  it('loads the two correct tokens', () => {
    cy.visit('/add/0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18/0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'WSTRAX')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'USDT')
  })

  it('does not crash if WSTRAX is duplicated', () => {
    cy.visit('/add/0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18/0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'WSTRAX')
    cy.get('#add-liquidity-input-tokenb #pair').should('not.contain.text', 'WSTRAX')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/add/0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C/0xDD0C4bb4b46A1C10D36593E4FA5F76abdB583f7A')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'USDT')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'USDC')
  })

  it('single token can be selected', () => {
    cy.visit('/add/0xDD0C4bb4b46A1C10D36593E4FA5F76abdB583f7A')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'USDC')
    cy.visit('/add/0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'USDT')
  })

  it('redirects /add/token-token to add/token/token', () => {
    cy.visit('/add/0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18-0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C')
    cy.url().should(
      'contain',
      '/add/0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18/0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C'
    )
  })

  it('redirects /add/WSTRAX-token to /add/WSTRAX-address/token', () => {
    cy.visit('/add/0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18-0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C')
    cy.url().should(
      'contain',
      '/add/0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18/0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C'
    )
  })

  it('redirects /add/token-WSTRAX to /add/token/WSTRAX-address', () => {
    cy.visit('/add/0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C-0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18')
    cy.url().should(
      'contain',
      '/add/0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C/0xeA705D2DbD8DE7Dc70Db7B531D0F620d9CeE9d18'
    )
  })
})
