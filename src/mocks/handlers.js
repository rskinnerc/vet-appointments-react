// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const handlers = [
  // Handles a POST /login request
  rest.post(`${process.env.REACT_APP_API_HOST}/users/create`, (req, res, ctx) => res(
    ctx.json({
      id: 2, name: 'test', created_at: '2022-09-15T15:53:34.780Z', updated_at: '2022-09-15T15:53:34.780Z',
    }),
  )),

  rest.get(`${process.env.REACT_APP_API_HOST}/doctors/index`, (req, res, ctx) => res(
    ctx.json([
      {
        id: 1,
        name: 'John Doe',
        experience: 5,
        specialization: 'Ophtalmology',
        price: 50,
        description: 'John description text',
      },
      {
        id: 2,
        name: 'Jane Doe',
        experience: 10,
        specialization: 'Cardiology',
        price: 100,
        description: 'Jane description text',
      },
    ]),
  )),

  rest.get(`${process.env.REACT_APP_API_HOST}/users/2/appointments`, (req, res, ctx) => res(
    ctx.json([
      {
        id: 1,
        doctor_id: 1,
        user_id: 2,
        city: 'Minsk',
        date: '2022-03-25T08:00:00Z',
      },

      {
        id: 2,
        doctor_id: 2,
        user_id: 2,
        city: 'Prague',
        date: '2022-08-16T14:00:00Z',
      },
    ]),
  )),

];

export default handlers;
