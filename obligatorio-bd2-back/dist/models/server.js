"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_conn_1 = __importDefault(require("../db/db.conn"));
const cors_1 = __importDefault(require("cors"));
const participante_routes_1 = __importDefault(require("../routes/participante.routes"));
const partido_routes_1 = __importDefault(require("../routes/partido.routes"));
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
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
        db_conn_1.default.connect((err) => {
            if (err) {
                console.log('Error connecting to Db');
                console.error(err);
                return;
            }
            console.log('Connection established');
        });
    }
    routes() {
        this.app.use('/participante', participante_routes_1.default);
        this.app.use('/partido', partido_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map