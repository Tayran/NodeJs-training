import * as express from 'express';

import db from '../infra/models/index';
import { ProdutosInstance } from '../infra/models/ProdutosModels';

export = (app: express.Application) => {
    app.get('/produtos', (req: express.Request, res: express.Response): void => {
        
        db.Produtos.findAll({}).then((produtos: ProdutosInstance[]) => {
            res.format({
                html: () => {
                    res.render('produtos/lista', {lista: produtos})
                },
                json: () => {
                    res.json(produtos);
                }
            });
        })
        .catch((err) => {console.log(err)});
    });
    
    app.get("/produtos/form", (req: express.Request, res: express.Response): void => {
        res.render('produtos/form', {errosValidacao: {}, produto: {}});
    });
    
    app.post("/produtos", (req: express.Request, res: express.Response): void => {
        
        const produto = req.body;
        
        req.assert('titulo', 'Titulo deve ser preenchido.').notEmpty();
        req.assert('preco', 'Preco deve ser preenchido.').isFloat();
        req.assert('descricao', 'Descricao deve ser preenchido.').notEmpty();
        
        const erros = req.validationErrors();
        
        if (erros) {
            res.format({
                html: () => {
                    res.status(400).render('produtos/form', {errosValidacao : erros, produto: produto});
                },
                
                json: () => {
                    res.status(400).json(erros);
                }
            });
            return;
        }
        
        db.Produtos.create(produto)
        .then((produto: ProdutosInstance) => {
            res.redirect('/produtos');
        })
        .catch((err) => console.log(err));
    });
}
