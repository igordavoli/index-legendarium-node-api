import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe('User', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  // afterAll(async () => {
  //   const connection = getConnection();
  //   await connection.dropDatabase();
  //   await connection.close();
  // })

  it('Should be able to create a new user',
    async () => {
      const res = await request(app).post('/addUser')
        .send({
          email: 'user@exemple.com',
          user_name: 'userExemple',
          password: 'user123exemple'
        });

      expect(res.status).toBe(201);
    })

  it('Should not be able to create a new user When already exists a user with the same email and user name.',
    async () => {
      const res = await request(app).post('/addUser')
        .send({
          email: 'user@exemple.com',
          user_name: 'userExemple',
          password: 'user123exemple'
        });

      expect(res.status).toBe(400);
    })

  it('Should be able to create a another new user with diferent email and user name.',
    async () => {
      const res = await request(app).post('/addUser')
        .send({
          email: 'user2@exemple.com',
          user_name: 'user2Exemple',
          password: 'user123exemple'
        });

      expect(res.status).toBe(201);
    })

  it('Should not be able to create a new user when alredy exists a user with the same user name.',
    async () => {
      const res = await request(app).post('/addUser')
        .send({
          email: 'user3@exemple.com',
          user_name: 'user2Exemple',
          password: 'user123exemple'
        });

      expect(res.status).toBe(400);
    })

});
