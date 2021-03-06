import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Word', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  /*
   |> SEARCH TEST
 */

  it('Should be able to search a word',
    async () => {
      const res = await request(app).get('/words').send('amigo')

      expect(res.status).toBe(200);
    });

  it('Should be not able to do a empty search',
    async () => {
      const res = await request(app).get('/words').send('')

      expect(res.status).toBe(400);
    });
  it('Should be able to returns a error message when search a word that not exists.',
    async () => {
      const res = await request(app).get('/words').send('amadeus')

      expect(res.status).toBe(400);
    });

  /*
    |> ADD TEST
  */

  it('Should be able to add a new word',
    async () => {
      const res = await request(app).post('/addWord')
        .send({
          vocable: "amigo dos elfos",
          language: "Westron",
          type: "person",
          meaning: "Epíteto aplicado a Aragorn",
          about: "Tres casa amigas.",
          pages: "200, 350, 1000",
          see_too: "Aragorn, Frodo, Tres casas amigas"
        })
      expect(res.status).toBe(201);
    });

  it('Should not be able to add a new word when the vocable already exists.',
    async () => {
      const res = await request(app).post('/addWord')
        .send({
          vocable: "amigo dos elfos",
          language: "Westron",
          type: "person",
          meaning: "Epíteto aplicado a Aragorn",
          about: "Tres casa amigas.",
          pages: "200, 350, 1000",
          see_too: "Aragorn, Frodo, Tres casas amigas"
        })

      expect(res.status).toBe(400);
    });

  it('Should not be able to add a new word when the vocable already exists (with case insensitive).',
    async () => {
      const res = await request(app).post('/addWord')
        .send({
          vocable: "Amigo dos Elfos",
          language: "Westron",
          type: "person",
          meaning: "Epíteto aplicado a Aragorn",
          about: "Tres casa amigas.",
          pages: "200, 350, 1000",
          see_too: "Aragorn, Frodo, Tres casas amigas"
        })

      expect(res.status).toBe(400);
    });

  /* 
    |> EDIT TEST
  */

  it('Should be able to edit a word when the vocable already exists.',
    async () => {
      const res = await request(app).post('/editWord')
        .send({
          vocable: "Amigo dos elfos",
          language: "Westron",
          type: "person",
          meaning: "Epíteto aplicado a Aragorn",
          about: "Três casa amigas.",
          pages: "200, 350, 1000, 1500",
          see_too: "Aragorn, Frodo, Tres casas amigas"
        })

      expect(res.status).toBe(201);
    });
});