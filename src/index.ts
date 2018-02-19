import app from './config/Express';
import db from './app/infra/models';
import * as http from 'http';
import * as socket from 'socket.io';

var server = new http.Server(app);
var io = socket(server);

app.set('io', io);

io.on('connection', function(socket){
    console.log('Opa, usuário conectado!');
    socket.on('disconnect', function(){
        console.log('Usuário desconectado :(');
    });
});

const port  = process.env.port || 3000;
const host = process.env.host || '127.0.0.1';

db.sequelize.sync()
    .then(() => {
        server.listen(port);
        console.log('Server on listening on port : ' + port);
}); 