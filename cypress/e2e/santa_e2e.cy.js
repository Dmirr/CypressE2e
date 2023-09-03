const users = require("../fixtures/users.json");
const loginPage = require("../fixtures/pages/loginPage.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

describe("can create a box", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun(5);
  let wishes = faker.word.noun() + faker.word.adjective();
  let maxAmount = 100;
  let currency = "Евро";
  let inviteLink;
  it("user logins and can create a box", () => {
    cy.visit("/login");
    cy.get(loginPage.loginField).type(users.userMain.email);
    cy.get(loginPage.passField).type(users.userMain.password);
    cy.get(generalElements.submitButton).click({ force: true });
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.log(newBoxName);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.icon7).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAmount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click({ force: true });
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });
  it("add participance", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
        cy.clearCookies();
      });
  });
  it("approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.logining(users.user1.email, users.user1.password); //2 вариант см. commands.js
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });
  after(() => {
    cy.visit("/login");
    cy.login(users.userMain.email, users.userMain.password);
    cy.get(
      '.layout-1__header-wrapper-fixed [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    ).click();
    cy.get(":nth-child(1) > a.base--clickable > .user-card").click();
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(":nth-child(2) > > .frm-wrapper > .frm").type("Удалить коробку");
    cy.get(".btn-service").click();
  });
});

// Cypress._.times(5, () => {
//   describe("delete box", () => {
//     it.only("delete boxes", () => {
//       cy.visit("/login");
//       cy.login(users.userMain.email, users.userMain.password);
//       cy.get(
//         '.layout-1__header-wrapper-fixed [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
//       ).click();
//       cy.get(":nth-child(1) > a.base--clickable > .user-card").click();
//       cy.contains("Архивация и удаление").click({ force: true });
//       cy.get(":nth-child(2) > > .frm-wrapper > .frm").type("Удалить коробку");
//       cy.get(".btn-service").click();
//     });
//   });
