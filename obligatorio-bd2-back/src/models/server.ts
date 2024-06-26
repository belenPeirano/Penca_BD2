import express from 'express';
import connection from '../db/db.conn';
import cors from 'cors';
import participanteRoutes from '../routes/participante.routes';
import partidoRoutes from '../routes/partido.routes';
import carreraRoutes from '../routes/carrera.routes';
import '../helpers/emailSender';

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
        this.app.use('/participante', participanteRoutes);
        this.app.use('/partido', partidoRoutes);
        this.app.use('/carrera', carreraRoutes);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

}

export default Server;