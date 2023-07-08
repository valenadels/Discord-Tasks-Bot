export class DBError implements Error {
    name: string;
    message: string;

    constructor(message: string) {
        this.name = "DBError";
        this.message = message;
    }
}