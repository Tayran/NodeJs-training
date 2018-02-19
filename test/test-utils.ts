import * as chai from 'chai';
const chaiHttp = require('chai-http');

import app from './../src/config/Express';
import db from './../src/app/infra/models';

chai.use(chaiHttp);
const expect = chai.expect;

const handleError = error => {
    const message: string = (error.response) ? error.response.res.text : error.message || error;
    return Promise.reject(`${error.name}: ${message}`);
};

export {
    app,
    db,
    chai,
    expect,
    handleError
}