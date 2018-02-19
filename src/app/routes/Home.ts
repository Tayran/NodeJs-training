import * as express from 'express';

import db from '../infra/models/index';
import { ProdutosInstance } from '../infra/models/ProdutosModels';

export = (app: express.Application) => {
    app.get('/', (req: express.Request, res: express.Response): void => {
        
        db.Produtos.findAll({}).then((produtos: ProdutosInstance[]) => {
            res.render('home/index', {livros: produtos})
        })
        .catch((err) => {console.log(err)});
    });
}

