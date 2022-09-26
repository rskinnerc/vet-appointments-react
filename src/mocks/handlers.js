/* eslint-disable import/no-extraneous-dependencies */
// src/mocks/handlers.js
import { rest } from 'msw';

const handlers = [
  // Handles a POST /login request
  rest.post(`${process.env.REACT_APP_API_HOST}/users/create`, async (req, res, ctx) => {
    const json = await req.json();
    return res(
      ctx.json({
        id: 1,
        name: json.user.name,
      }),
    );
  }),

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

  rest.post(`${process.env.REACT_APP_API_HOST}/doctors/create`, async (req, res, ctx) => res(
    ctx.json('Successfully created'),
  )),
];

export default handlers;
