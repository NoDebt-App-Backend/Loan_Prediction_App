class BadUserRequestError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.errorType = "BadUserRequestError";
    }
}

// class NotFoundError extends Error {
//     constructor(message) {
//         super(message);
//         this.status = 404;
//         this.errorType = "NotFoundError";
//     }
// }

export { BadUserRequestError };