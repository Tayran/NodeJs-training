import { app, db, handleError } from "./test-utils";

import * as request from 'supertest';

const http = request(app);

describe('#ProdutosConstroller', () => {

    beforeEach((done) => {
        db.Produtos.destroy({where: {}}).then((rows: number) => {
            done();
        });
    });

    it('#Listagem json', (done) => {

        http
        .get('/produtos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('#Cadastro de novo produto com dados inválidos', (done) => {
        http.post('/produtos')
            .send({titulo: "", descricao: 'produto de teste'})
            .expect(400, done);
    });

    it('#Cadastro de novo produto com dados válidos', (done) => {
        http.post('/produtos')
            .send({titulo: "Teste", descricao: 'produto de teste', preco: 20.50})
            .expect(302, done);
    });
});