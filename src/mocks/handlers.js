/* eslint-disable import/no-extraneous-dependencies */
// src/mocks/handlers.js
import { rest } from 'msw';

const handlers = [
  // Handles a POST /login request
  rest.post('/login', null),
];

export default handlers;
