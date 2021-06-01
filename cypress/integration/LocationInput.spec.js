context("Search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  // it's not anti-pattern to have all relevant checks in one test
  // https://docs.cypress.io/guides/references/best-practices#Creating-tiny-tests-with-a-single-assertion
  it("Location input", () => {
    cy.get("[data-test='AutoSuggest_LocationInput']").as("locationComponent");
    cy.get("@locationComponent").find("input").as("locationInput");

    // check input has aria-label and placeholder
    cy.get("@locationInput")
      .should("have.attr", "aria-label", "Pick-up Location")
      .should("have.attr", "placeholder", "Pick-up Location");

    // check that one char doesn't show suggestions
    cy.get("@locationInput").type("A");

    cy.get("@locationComponent")
      .find(".AutoSuggest__suggestions")
      .should("not.exist");

    // make data call and show suggestions
    cy.intercept(
      {
        method: "GET", // Route all GET requests
        url: "https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=Am",
      },
      { fixture: "suggestions" }
    ).as("fetchSuggegtion");

    cy.get("@locationInput").type("m");

    cy.wait("@fetchSuggegtion")
      .its("request.url")
      .should("include", "solrTerm=Am");

    cy.get("@locationComponent")
      .find(".AutoSuggest__suggestions")
      .find("li")
      .should("have.length", 6);

    // truncate the search term leaving only 1 characte should hide sugegstion
    cy.get("@locationInput").type("{backspace}");

    cy.get("@locationComponent")
      .find(".AutoSuggest__suggestions")
      .should("not.exist");

    // check that result not found
    cy.intercept(
      {
        method: "GET", // Route all GET requests
        url: "https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=asdf123456",
      },
      { fixture: "suggestionsNotFound" }
    ).as("fetchSuggegtion");

    cy.get("@locationInput").clear().type("asdf123456");

    cy.get("@locationComponent")
      .find(".AutoSuggest__suggestions")
      .contains("No results found");
  });
});
