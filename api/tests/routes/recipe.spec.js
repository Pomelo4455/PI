/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Diet, conn } = require('../../src/db.js');

const agent = session(app);

const diet = {
  name: "Vegan"
}

describe('Diet route', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Diet.sync({ force: true })
    .then(() => Diet.create(diet)));
  describe('GET /diets', () => {
    it('Estado 200', () =>
      agent.get('/diets').expect(200)
    );
  });
});


describe('GET /recipes/:id', () => {
  it('Estado 200', () => {
    return agent.get('/recipes/715594')
      .then(res => {
        expect(res.status).to.equal(200)
      })
  });
  it('Espera el nombre de la receta buscada por ID', () => {
    return agent.get("/recipes/715594")
      .then(res => {
        expect(res.body.name).to.equal("Homemade Garlic and Basil French Fries")
      })
  })
});