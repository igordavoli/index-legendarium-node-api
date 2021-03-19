import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe('User', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to create a new user',
    async () => {
      const res = await request(app).post('/singnUp')
        .send({
          email: 'user@exemple.com',
          user_name: 'userExemple',
          password: 'user123exemple'
        });

      expect(res.status).toBe(201);
    })

  it('Should not be able to create a new user When already exists a user with the same email and user name.',
    async () => {
      const res = await request(app).post('/singnUp')
        .send({
          email: 'user@exemple.com',
          user_name: 'userExemple',
          password: 'user123exemple'
        });

      expect(res.status).toBe(200);
    })

  it('Should be able to create a another new user with diferent email and user name.',
    async () => {
      const res = await request(app).post('/singnUp')
        .send({
          email: 'user2@exemple.com',
          user_name: 'user2Exemple',
          password: 'user123exemple'
        });

      expect(res.status).toBe(201);
    })

  it('Should not be able to create a new user when alredy exists a user with the same user name.',
    async () => {
      const res = await request(app).post('/singnUp')
        .send({
          email: 'user3@exemple.com',
          user_name: 'user2Exemple',
          password: 'user123exemple'
        });

      expect(res.status).toBe(200);
    })

  /*
    |> SINGN IN
  */

  it('Should be able to login a user when inputed a existent email e a corespondent password.',
    async () => {
      const res = await request(app).post('/singnIn')
        .send({
          email: 'user@exemple.com',
          password: 'user123exemple'
        });

      expect(res.status).toBe(200);
    }
  )

  it('Shoud be able to not permit a login when inputed a inexistent email.',
    async () => {
      const res = await request(app).post('/singnIn')
        .send({
          email: 'user@fail-exemple.com',
          password: 'user123exemple'
        });

      expect(res.status).toBe(200);
    }
  )

  it('Shoud be able to not permit a login when inputed a incorrect password.',
    async () => {
      const res = await request(app).post('/singnIn')
        .send({
          email: 'user@exemple.com',
          password: 'userExemple123'
        });

      expect(res.status).toBe(200);
    }
  )
});
