/// <reference types="cypress" />;
describe("Login sayfasını test et", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("inputunu alın ve bir isim yazın!", () => {
    cy.get('[ data-cy="newIsım"]')
      .type("meltem")
      .should("have.value", "meltem");
  });

  it("inputunu alın ve bir soyisim yazın!", () => {
    cy.get('[ data-cy="newSoyisim"]')
      .type("elgün")
      .should("have.value", "elgün");
  });

  it(" inputunu alın ve bir email adresi girin!", () => {
    cy.get('[ data-cy="newEmail"]')
      .type("meltem@gmail.com")
      .should("have.value", "meltem@gmail.com");
  });

  it(" inputunu alın ve bir şifre girin!", () => {
    cy.get('[ data-cy="newSifre"]').type("1234").should("have.value", "1234");
  });

  it("Kullanıcı kullanım koşulları kutusunu işaretledi", () => {
    cy.get('[ data-cy="newSartlar"]').click();
  });

  it(" Kullanıcının form verilerini gönderip gönderemeyeceği", () => {
    cy.get("form").submit();
  });

  it(" Bir input boş bırakılırsa form doğrulamasını test edin", () => {
    cy.get('[ data-cy="newIsım"]')
      .type("meltem")
      .should("have.value", "meltem");
    cy.get('[ data-cy="newEmail"]')
      .type("meltem@gmail.com")
      .should("have.value", "meltem@gmail.com");
    cy.get('[ data-cy="newSifre"]').type("1234").should("have.value", "1234");
    cy.get('[ data-cy="newSartlar"]').check();
    cy.get('[data-cy="newButton"]').should("be.disabled");
  });
});
