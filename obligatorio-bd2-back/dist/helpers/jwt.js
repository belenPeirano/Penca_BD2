"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETKEY || 'ESTODEBERIAESTARENUNDOTENVPEROESTAMOSHACIENDOTODOMAL', {
            expiresIn: '1h',
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('Could not generate the JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=jwt.js.map