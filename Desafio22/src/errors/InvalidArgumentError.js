export class InvalidArgument extends Error {
    constructor(message) {
        super(message);
        this.type = 'INVALID_ARGUMENT';
    }
}