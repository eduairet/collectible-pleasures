/**
 * Alphabet will be used within the module function
 * @type {Object}
 * Each letter has an array of numbers
 * these values will be passed to the function module()
 * and the position will be defined by the function nft()
 */
var letters = {
    A: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.4) / lineSpace, 3, h * 0.1],
        [(h * 0.1) / lineSpace, 1, h * 0.5],
        [(h * 0.3) / lineSpace, 3, h * 0.6],
    ],
    B: [
        [(h * 0.1) / lineSpace, 5, 0],
        [(h * 0.3) / lineSpace, 3, h * 0.1],
        [(h * 0.1) / lineSpace, 5, h * 0.4],
        [(h * 0.3) / lineSpace, 3, h * 0.5],
        [(h * 0.1) / lineSpace, 5, h * 0.8],
    ],
    C: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.1) / lineSpace, 3, h * 0.1],
        [(h * 0.5) / lineSpace, 2, h * 0.2],
        [(h * 0.1) / lineSpace, 3, h * 0.7],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    D: [
        [(h * 0.1) / lineSpace, 5, 0],
        [(h * 0.7) / lineSpace, 3, h * 0.1],
        [(h * 0.1) / lineSpace, 5, h * 0.8],
    ],
    E: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.3) / lineSpace, 2, h * 0.1],
        [(h * 0.1) / lineSpace, 1, h * 0.4],
        [(h * 0.3) / lineSpace, 2, h * 0.5],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    F: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.3) / lineSpace, 2, h * 0.1],
        [(h * 0.1) / lineSpace, 1, h * 0.4],
        [(h * 0.4) / lineSpace, 2, h * 0.5],
    ],
    G: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.1) / lineSpace, 3, h * 0.1],
        [(h * 0.2) / lineSpace, 2, h * 0.2],
        [(h * 0.1) / lineSpace, 6, h * 0.4],
        [(h * 0.3) / lineSpace, 3, h * 0.5],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    H: [
        [(h * 0.4) / lineSpace, 3, 0],
        [(h * 0.1) / lineSpace, 1, h * 0.4],
        [(h * 0.4) / lineSpace, 3, h * 0.5],
    ],
    I: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.7) / lineSpace, 4, h * 0.1],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    J: [
        [(h * 0.5) / lineSpace, 7, 0],
        [(h * 0.3) / lineSpace, 3, h * 0.5],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    K: [
        [(h * 0.4) / lineSpace, 3, 0],
        [(h * 0.1) / lineSpace, 5, h * 0.4],
        [(h * 0.4) / lineSpace, 3, h * 0.5],
    ],
    L: [
        [(h * 0.8) / lineSpace, 2, 0],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    M: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.8) / lineSpace, 8, h * 0.1],
    ],
    N: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.8) / lineSpace, 3, h * 0.1],
    ],
    O: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.7) / lineSpace, 3, h * 0.1],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    P: [
        [(h * 0.1) / lineSpace, 5, 0],
        [(h * 0.4) / lineSpace, 3, h * 0.1],
        [(h * 0.1) / lineSpace, 5, h * 0.5],
        [(h * 0.3) / lineSpace, 2, h * 0.6],
    ],
    Q: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.7) / lineSpace, 3, h * 0.1],
        [(h * 0.1) / lineSpace, 9, h * 0.8],
    ],
    R: [
        [(h * 0.1) / lineSpace, 5, 0],
        [(h * 0.3) / lineSpace, 3, h * 0.1],
        [(h * 0.1) / lineSpace, 5, h * 0.4],
        [(h * 0.4) / lineSpace, 3, h * 0.5],
    ],
    S: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.2) / lineSpace, 3, h * 0.1],
        [(h * 0.1) / lineSpace, 2, h * 0.3],
        [(h * 0.1) / lineSpace, 1, h * 0.4],
        [(h * 0.1) / lineSpace, 7, h * 0.5],
        [(h * 0.2) / lineSpace, 3, h * 0.6],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    T: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.8) / lineSpace, 4, h * 0.1],
    ],
    U: [
        [(h * 0.8) / lineSpace, 3, 0],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    V: [
        [(h * 0.8) / lineSpace, 3, 0],
        [(h * 0.1) / lineSpace, 4, h * 0.8],
    ],
    W: [
        [(h * 0.8) / lineSpace, 8, 0],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    X: [
        [(h * 0.4) / lineSpace, 3, 0],
        [(h * 0.1) / lineSpace, 4, h * 0.4],
        [(h * 0.4) / lineSpace, 3, h * 0.5],
    ],
    Y: [
        [(h * 0.5) / lineSpace, 3, 0],
        [(h * 0.4) / lineSpace, 4, h * 0.5],
    ],
    Z: [
        [(h * 0.1) / lineSpace, 1, 0],
        [(h * 0.2) / lineSpace, 7, h * 0.1],
        [(h * 0.2) / lineSpace, 4, h * 0.3],
        [(h * 0.3) / lineSpace, 2, h * 0.5],
        [(h * 0.1) / lineSpace, 1, h * 0.8],
    ],
    ' ': [[(h * 0.9) / lineSpace, 1, 0]],
};
