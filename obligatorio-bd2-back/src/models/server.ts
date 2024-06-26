import express from 'express';
import connection from '../db/db.conn';
import cors from 'cors';
import participanteRoutes from '../routes/participante.routes';
import partidoRoutes from '../routes/partido.routes';
import carreraRoutes from '../routes/carrera.routes';
import path from 'path';

class Server {
    private app: express.Application;
    private port: number;
    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.start();
        this.middlewares();
        this.connectdb();
        this.routes();

    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    connectdb() {
        connection.connect((err) => {
            if (err) {
                console.log('Error connecting to Db');
                console.error(err);
                return;
            }
            console.log('Connection established');
        });
    }

    routes() {
        this.app.use('/api/participante', participanteRoutes);
        this.app.use('/api/partido', partidoRoutes);
        this.app.use('/api/carrera', carreraRoutes);
    }

    middlewares() {
        //this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static("public"));
        this.app.get(/^\/(?!api).*/, (req, res) => {
            const indexPath = path.join(
              __dirname + `../../../public/browser/index.html`
            );
            res.sendFile(indexPath);
          });
        this.app.use(express.json());
        this.app.use(cors());
    }

}

export default Server;