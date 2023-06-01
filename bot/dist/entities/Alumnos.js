"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alumno = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Alumno = class Alumno {
    id;
    nombre;
    apellido;
    padron;
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Alumno.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Alumno.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Alumno.prototype, "apellido", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Alumno.prototype, "padron", void 0);
Alumno = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Alumno);
exports.Alumno = Alumno;
