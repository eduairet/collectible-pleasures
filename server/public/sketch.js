const [w, h] = [640, 640], // width, height
    lw = w / 3, // letter width
    lineSpace = h / 50; // space between lines

function setup() {
    frameRate(12);
    createCanvas(w, h);
}

function draw() {
    background(0);
    nft('GHI');
}

function nft(selection) {
    for (const [i, letter] of [...selection].entries()) {
        position = lw * i;
        for (const mod of letters[letter]) module(...mod, position);
    }
}

function module(reps, kndList, wave = 0, xTrans = 0) {
    noFill();
    stroke(255);
    strokeWeight(1.5);
    for (let _ = 0; _ < reps; _++) {
        const points = lsPts(kndList);
        push();
        translate(xTrans, lw * 0.1 + wave);
        beginShape();
        for (const p of points) vertex(p.x, p.y);
        endShape();
        pop();
        wave += lineSpace;
    }
}

function lsPts(num, wave = lw * 0.4) {
    const points = [];
    for (let x = 0; x < lw; x += 10) {
        let y;
        switch (num) {
            case 1:
                y = setY(x, wave, 0.1, 0.9);
                break;
            case 2:
                y = setY(x, wave, 0.1, 0.4);
                break;
            case 3:
                y = setY(x, wave, 0.1, 0.9, true);
                break;
            case 4:
                y = setY(x, wave, 0.35, 0.65);
                break;
            case 5:
                y = setY(x, wave, 0.1, 0.7);
                break;
            case 6:
                y = setY(x, wave, 0.1, 0.9, true, { l: 0.1, r: 0.01 });
                break;
            default:
                break;
        }
        if (y < 0) points.push({ x, y: y * -1 });
        else points.push({ x, y });
    }
    return points;
}

function setY(x, wave, left, right, chopped = false, ch = { l: 0.1, r: 0.1 }) {
    const half = left + (right - left) / 2,
        [a1, a2, a3] = [
            x > 0 && x < lw * left,
            x > lw * right && x <= lw,
            x > lw * (half - ch.l) && x < lw * (half + ch.r),
        ],
        [b1, b2, b3, b4] = [
            x > lw * left,
            x <= lw * half,
            x <= lw * (half - ch.l * 2),
            x > lw * (half + ch.r) && x < lw * (half + ch.r * 2),
        ],
        [c1, c2, c3, c4] = [
            x > lw * half,
            x <= lw * right,
            x > lw * (half - ch.l * 2) && x <= lw * (half - ch.l),
            x >= lw * (half + ch.r * 2),
        ];
    let [a, b, c] = [a1 || a2, b1 && b2, c1 && c2];
    if (chopped) {
        a = a1 || a3 || a2;
        b = (b1 && b3) || b4;
        c = c3 || (c4 && c2);
    }
    let y;
    if (a) y = sin(x * random(1, 3));
    else if (b) y = (x * sin(radians(x * random(-100, 100)))) / 10;
    else if (c) y = (wave * sin(radians(wave * random(-100, 100)))) / 10;
    else y = 0;
    return y;
}

/**
 * Alphabet that will be use within the module function
 * @type {Object}
 * Each letter has an array of:
 * @type {number, number, number}
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
    I: [[(h * 0.9) / lineSpace, 4, 0, lw * 2]],
    T: [
        [(h * 0.1) / lineSpace, 1, 0, lw * 2],
        [(h * 0.8) / lineSpace, 4, h * 0.1, lw * 2],
    ],
};
