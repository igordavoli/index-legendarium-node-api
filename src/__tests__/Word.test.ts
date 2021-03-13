import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe('Word', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  // afterAll(async () => {
  //   const connection = getConnection();
  //   await connection.dropDatabase();
  //   await connection.close();
  // })


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
      expect(res.body).toStrictEqual({ message: 'Word already exists!' });
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
      expect(res.body).toStrictEqual({ message: 'Word already exists!' });
    });


  /*
    |> SEARCH TEST
  */

  it('Should be able to search a word',
    async () => {
      const res = await request(app).get('/words').query({ search: 'amigo' });

      expect(res.status).toBe(200);
    });

  it('Should be not able to do a empty search',
    async () => {
      const res = await request(app).get('/words').send({ search: '' })

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({ message: 'Empty search nothing was found.' });
    });

  it('Should be able to returns a error message when search a word that not exists.',
    async () => {
      const res = await request(app).get('/words').send({ search: 'amadeus' })

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({ message: 'Word not found!' });
    });


  /* 
    |> EDIT TEST 
  */

  it('Should be able to edit a word when the vocable already exists.',
    async () => {
      const res = await request(app).post('/editWord')
        .send({
          user_id: '',
          id: '',
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