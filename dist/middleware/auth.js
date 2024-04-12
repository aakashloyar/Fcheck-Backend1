"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET || "";
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, secret, (err, payload) => {
                if (err)
                    return res.sendStatus(403);
                if (!payload)
                    return res.sendStatus(403);
                if (typeof payload === "string")
                    return res.sendStatus(403);
                req.headers["userId"] = payload.id;
                next();
            });
        }
        else
            res.sendStatus(401);
    }
};
exports.authenticate = authenticate;
