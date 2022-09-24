// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const handlers = [
  // Handles a POST /login request
  rest.post('http://localhost:3000/users/create', (req, res, ctx) => res(
    ctx.json({
      id: 2, name: 'test', created_at: '2022-09-15T15:53:34.780Z', updated_at: '2022-09-15T15:53:34.780Z',
    }),
  )),

];

export default handlers;
