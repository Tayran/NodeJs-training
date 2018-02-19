import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as validator from 'express-validator';
import * as consign from 'consign';

import Produtos from '../app/routes/Produtos';
import Home from '../app/routes/Home';
import Promocoes from '../app/routes/Promocoes';

class Express {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.rotas();
        this.handleErros();
    }

    private middlewares(): void {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '/../app/views'));
        this.app.use(express.static(path.join(__dirname, '/../app/public')));  
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(validator());
    }
 
    private rotas(): void {
        consign()
        .include('/dist/app/routes')
        .into(this.app);
    }

    private handleErros() {
        this.app.use((req, res, next) => {
            res.status(404).render('erros/404');
            next();
        });
        
        this.app.use((error, req, res, next) => {
            if(process.env.NODE_ENV == 'production') {
                res.status(500).render('error/500');
                return;
            }
            next(error);        
        });
    }
}

export default new Express().app;