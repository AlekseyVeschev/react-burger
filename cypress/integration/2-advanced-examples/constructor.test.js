describe('service is available', () => {
   it('should be available on localhost:3000', () => {
      cy.visit('http://localhost:3000')
   })
   it("should add bun", () => {
      cy.get("#bun")
      cy.get("[class^=ingredient_root__]").first().as("firstBun")
      cy.get("[class^=burger-constructor_root__]").as("constructor")
      cy.get("@firstBun").should("exist")

      cy.get("@firstBun")
         .find("[class^=ingredient_image__]")
         .should("be.visible")
         .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0)
         })
      cy.get("@constructor").should("exist")

      cy.get("@firstBun").trigger("dragstart")
      cy.get("@constructor").trigger("drop")
   })

   it("should add first souce", () => {
      cy.get("#sauce")
         .find("[class^=ingredients-group_content__]")
         .find("[class^=ingredient_root__]")
         .first()
         .as("firstSauce")
      cy.get("[class^=burger-constructor_root__]").as("constructor")
      cy.get("@firstSauce").trigger("dragstart")
      cy.get("@constructor").trigger("drop")
   })
   it("should add last souce", () => {
      cy.get("#sauce")
         .find("[class^=ingredients-group_content__]")
         .find("[class^=ingredient_root__]")
         .last()
         .as("lastSauce")
      cy.get("[class^=burger-constructor_root__]").as("constructor")
      cy.get("@lastSauce").trigger("dragstart")
      cy.get("@constructor").trigger("drop")
   })
   it("should add last main", () => {
      cy.get("#main")
         .find("[class^=ingredients-group_content__]")
         .find("[class^=ingredient_root__]")
         .last()
         .as("lastMain")
      cy.get("[class^=burger-constructor_root__]").as("constructor")
      cy.get("@lastMain").trigger("dragstart")
      cy.get("@constructor").trigger("drop")
   })
})