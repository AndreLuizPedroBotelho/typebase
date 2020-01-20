import request from 'supertest';

import app from '../../src/app';
import { user } from '../faker/user.faker';

describe('Users', () => {
  it('should create User', async () => {
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(200);
  });

  it("should don't create User ", async () => {
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(500);
  });
});
