describe("Yaadon ka Postcard — ShipGuard Release Readiness & E2E Suite", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Category 1: Smoke Testing — Verifies app hydration and homepage CTA", () => {
    cy.contains("Yaadon ka Postcard").should("be.visible");
    cy.contains("Create a Postcard").should("be.visible");
  });

  it("Category 2: Functional & Requirement Testing — Classic Mode + Male Sign-off (Tera,)", () => {
    cy.contains("Create a Postcard").click();

    // Step 1: Address Postcard
    cy.get('input[placeholder="e.g. Rahul"]').type("Aman");
    cy.get('input[placeholder="e.g. Mumbai"]').type("Delhi");
    cy.get('input[placeholder="e.g. Best Friend, Bhai, Ma"]').type("Bhai");
    cy.get('input[placeholder="e.g. Rahul / Priya"]').type("Vikas");

    // Select Male (Tera,) sign-off
    cy.contains("Tera, (He / Male)").click();

    // Select Classic vibe
    cy.contains("Jolly").click();
    cy.contains("Choose a Surprise").click();

    // Step 2: Surprise Selection
    cy.contains("Yeh Bhi Meri Galti Hai").click();
    cy.contains("Write Message").click();

    // Step 3: Message Screen
    cy.get("textarea").type("Bhai yeh cypress se test kiya gaya message hai!");
    cy.contains("Preview Postcard").click();

    // Step 4: Preview Screen
    cy.contains("Yeh rahi teri postcard").should("be.visible");
    cy.contains("Tera,").should("be.visible");
    cy.contains("Generate Share Link").click();

    // Step 5: Share Screen
    cy.contains("Postcard Post Ho Gayi!").should("be.visible");
    cy.get('input[readonly]').should("have.value").and("include", "/p/");
  });

  it("Category 3: Requirement Testing — Rakhi Festival + Female Sign-off (Teri,) + Virtual Rakhi", () => {
    cy.contains("Create a Postcard").click();

    // Select Rakhi Theme
    cy.contains("Rakhi Festival").click();

    // Vibe selection should be hidden in Rakhi Mode
    cy.contains("Pick the vibe & celebrity mode").should("not.exist");

    cy.get('input[placeholder="e.g. Rahul"]').type("Rohan");
    cy.get('input[placeholder="e.g. Mumbai"]').type("Jaipur");
    cy.get('input[placeholder="e.g. Best Friend, Bhai, Ma"]').type("Bhaiya");
    cy.get('input[placeholder="e.g. Rahul / Priya"]').type("Priya");

    // Select Female (Teri,) sign-off
    cy.contains("Teri, (She / Female)").click();
    cy.contains("Choose a Surprise").click();

    // Surprise Screen: Virtual Rakhis displayed
    cy.contains("Virtual Rakhi Threads").should("be.visible");
    cy.contains("Golden Om Virtual Rakhi").click();
    cy.contains("Write Message").click();

    // Write message
    cy.get("textarea").type("Happy Raksha Bandhan bhaiya!");
    cy.contains("Preview Postcard").click();

    // Preview Screen: Displays "Teri," and Virtual Rakhi
    cy.contains("Teri,").should("be.visible");
    cy.contains("Virtual Rakhi Gift").should("be.visible");
  });

  it("Category 4: Requirement Testing — Ganpati Festival + Bappa Image Attachment", () => {
    cy.contains("Create a Postcard").click();

    // Select Ganpati Theme
    cy.contains("Ganpati Utsav").click();

    cy.get('input[placeholder="e.g. Rahul"]').type("Grandma");
    cy.get('input[placeholder="e.g. Mumbai"]').type("Pune");
    cy.get('input[placeholder="e.g. Best Friend, Bhai, Ma"]').type("Aaji");
    cy.get('input[placeholder="e.g. Rahul / Priya"]').type("Rahul");
    cy.contains("Choose a Surprise").click();

    // Surprise Screen: Ganpati Bappa Images displayed
    cy.contains("Ganpati Bappa's Images & Blessings").should("be.visible");
    cy.contains("Lalbaugcha Raja Portrait").click();
    cy.contains("Write Message").click();

    // Write message
    cy.get("textarea").type("Ganpati Bappa Morya!");
    cy.contains("Preview Postcard").click();

    // Preview Screen: Displays Ganpati Bappa Blessing
    cy.contains("Ganpati Bappa Blessing").should("be.visible");
  });

  it("Category 5: API & Contract Testing — POST /api/postcards & GET /api/postcards/[token]", () => {
    cy.request("POST", "/api/postcards", {
      themeId: "rakhi",
      receiverName: "Test Receiver",
      city: "Test City",
      relationship: "Friend",
      senderName: "Test Sender",
      senderGender: "female",
      vibe: "rakhi",
      surpriseId: "rakhi-dhaaga",
      message: "Cypress API contract test message",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.ok).to.be.true;
      const token = res.body.token;

      // GET API Lookup
      cy.request(`/api/postcards/${token}`).then((getRes) => {
        expect(getRes.status).to.eq(200);
        expect(getRes.body.postcard.senderGender).to.eq("female");
        expect(getRes.body.surprise.id).to.eq("rakhi-dhaaga");
      });
    });
  });
});
