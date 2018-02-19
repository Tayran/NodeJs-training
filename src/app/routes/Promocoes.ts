import * as express from 'express';

import db from '../infra/models/index';
import { ProdutosInstance } from '../infra/models/ProdutosModels';

export = (app: express.Application) => {
    if(app === null) throw new Error('app is null');
    
    app.get('/promocoes/form', (req: express.Request, res: express.Response): void => {
        
        db.Produtos.findAll().then((produtos: ProdutosInstance[]) => {
            res.render('promocoes/form', {lista: produtos});
        })
        .catch((err) => {console.log(err)});
    });
    
    app.post("/promocoes",function(req,res){
        var promocao = req.body;
        app.get('io').emit('novaPromocao', promocao);
        res.redirect('promocoes/form');
    });
}


