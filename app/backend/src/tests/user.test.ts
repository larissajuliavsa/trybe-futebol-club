import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

const mockUser = {
  id: 10,
  username: 'String',
  role: 'role',
  email: 'user@email.com',
  password: 'password123',
};

describe('Testar User', () => {
  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockUser as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  });

  it('endpoint post /login', async () => {
    const endpoint = await chai.request(app).post('/login').send(mockUser);
    expect(endpoint.status).to.be.equal(200);
  });
});
