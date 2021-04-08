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
      const res = await request(app).post('/signUp')
        .send({
          newUser: {
            email: 'user@exemple.com',
            userName: 'userExemple',
            password: 'user123exemple',
          }
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('userNameDB');

    })

  it('Should NOT be able to create a new user when already exists a user with the same email and user name.',
    async () => {
      const res = await request(app).post('/signUp')
        .send({
          newUser: {
            email: 'user@exemple.com',
            userName: 'userExemple',
            password: 'user123exemple',
          }
        });

      expect(res.status).toBe(409);
      expect(res.body).toMatchObject({ message: 'Email already registered!' })
    })

  it('Should be able to create a another new user with diferent email and user name.',
    async () => {
      const res = await request(app).post('/signUp')
        .send({
          newUser: {
            email: 'user2@exemple.com',
            userName: 'user2Exemple',
            password: 'user123exemple',
          }
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('userNameDB');

    })

  it('Should NOT be able to create a new user when alredy exists a user with the same user name.',
    async () => {
      const res = await request(app).post('/signUp')
        .send({
          newUser: {
            email: 'user3@exemple.com',
            userName: 'user2Exemple',
            password: 'user123exemple',
          }
        });

      expect(res.status).toBe(409);
      expect(res.body).toMatchObject({ message: 'User name already exists!' })
    })

  /*
    |> SINGN IN
  */

  it('Should be able to login a user when inputed a existent email and a corespondent password.',
    async () => {
      const res = await request(app).post('/signIn')
        .send({
          email: 'user@exemple.com',
          password: 'user123exemple',
        });

      expect(res.status).toBe(200);
    }
  )

  it('Shoud be able to NOT permit a login when inputed a inexistent email.',
    async () => {
      const res = await request(app).post('/signIn')
        .send({
          email: 'user@fail-exemple.com',
          password: 'user123exemple',
        });

      expect(res.status).toBe(422);
      expect(res.body).toMatchObject({ message: 'User not finded!' })
    }
  )

  it('Shoud be able to NOT permit a login when inputed a incorrect password.',
    async () => {
      const res = await request(app).post('/signIn')
        .send({
          email: 'user@exemple.com',
          password: 'userExemple123',
        });

      expect(res.status).toBe(401);
      expect(res.body).toMatchObject({ message: 'Wrong password!' })
    }
  )
});
