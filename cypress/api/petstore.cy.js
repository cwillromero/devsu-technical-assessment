/**
 * PetStore API - User lifecycle tests
 *
 * Implements the following flow against the Petstore API (https://petstore.swagger.io/):
 *  - Create a user (POST /user)
 *  - Retrieve the created user (GET /user/{username})
 *  - Update user's name and email (PUT /user/{username})
 *  - Retrieve the updated user (GET /user/{username})
 *  - Delete the user (DELETE /user/{username})
 */

describe('PetStore API - User lifecycle', () => {
  let testData;
  let username;
  let initialUser;
  let updatedUser;
  let base;

  before(() => {
    // base comes from cypress.api.config.js `baseUrl`
    base = Cypress.expose('apiUrl');
    cy.fixture('petstore-data').then((data) => {
      testData = data;
      username = `testuser_${Date.now()}`;
      const id = Date.now();
      const email = `carlos.romero.${id}@example.com`;

      initialUser = {
        id,
        username,
        firstName: testData.user.firstName,
        lastName: testData.user.lastName,
        email,
        password: testData.user.password,
        phone: testData.user.phone,
        userStatus: testData.user.userStatus,
      };

      updatedUser = Object.assign({}, initialUser, {
        firstName: testData.updated.firstName,
        email: `wilfredo.maradiaga.${id}@example.com`,
      });
    });
  });

  it('Create user', () => {
    // Step 1: Send POST request to create user with initial data
    cy.request({
      method: 'POST',
      url: `${base}/user`,
      body: initialUser,
    }).then((res) => {
      // Step 2: Verify response status and message
      expect(res.status).to.be.oneOf([200, 201]);
      expect(res.body).to.have.property('message');
      cy.log(`User ${username} created successfully`);
    });
  });

  it('Get the created user', () => {
    // Step 1: Retrieve the created user by username
    cy.request({ method: 'GET', url: `${base}/user/${username}` }).then((res) => {
      // Step 2: Verify response status
      expect(res.status).to.eq(200);

      // Step 3: Verify user data matches what was created (username and email)
      expect(res.body).to.have.property('username', username);
      expect(res.body).to.have.property('email', initialUser.email);
      expect(res.body).to.have.property('firstName', initialUser.firstName);
      expect(res.body).to.have.property('lastName', initialUser.lastName);

      // Step 4: Store user data for reference in subsequent tests
      cy.wrap(res.body).as('createdUser');
      cy.log(`User ${username} retrieved successfully`);
    });
  });

  it('Update user name and email', () => {
    // Step 1: Send PUT request to update user with new firstName and email
    cy.request({ method: 'PUT', url: `${base}/user/${username}`, body: updatedUser }).then((res) => {
      // Step 2: Verify response status and message
      expect(res.status).to.be.oneOf([200, 201]);
      expect(res.body).to.have.property('message');
      cy.log(`User ${username} updated successfully`);
    });
  });

  it('Get the updated user', () => {
    // Step 1: Retrieve the updated user by username
    cy.request({ method: 'GET', url: `${base}/user/${username}` }).then((res) => {
      // Step 2: Verify response status
      expect(res.status).to.eq(200);

      // Step 3: Verify user firstName was updated
      expect(res.body).to.have.property('firstName', updatedUser.firstName);

      // Step 4: Verify user email was updated
      expect(res.body).to.have.property('email', updatedUser.email);

      // Step 5: Verify other fields remain unchanged
      expect(res.body).to.have.property('username', username);

      cy.log(`User ${username} update verified successfully`);
    });
  });

  it('Delete the user', () => {
    // Step 1: Send DELETE request to remove user
    cy.request({ method: 'DELETE', url: `${base}/user/${username}` }).then((res) => {
      // Step 2: Verify response status indicates successful deletion
      expect(res.status).to.be.oneOf([200, 204]);
      cy.log(`User ${username} deleted successfully`);
    });
  });
});
