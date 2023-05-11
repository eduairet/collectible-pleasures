const [w, h] = [640, 640], // width, height
    lw = w / 3, // letter width
    lineSpace = h / 50; // space between lines
let nft; // NFT text to be defined during setup

/**
 * The p5 setup function sets the canvas and the frame rate
 * @returns {void} to 12 frames per second
 * this way we'll have a smooth animation,
 * it also sets the width and heihgt of the canvas to 640px
 * a great size for the nft gif
 */
function setup() {
    frameRate(12);
    createCanvas(w, h);
    nft = getURLParams().nft;
}
/**
 * The p5 draw function
 * runst the nft function with the selected string
 * @returns {void}
 * and it generates the art
 */
function draw() {
    background(0);
    createNft(nft || '');
}

/**
 * This function runs the module function over every letter in the selection
 * @param {*} selection
 * @type {string} Taken from the url nft query
 */
function createNft(nft) {
    // Base cases that can make an error: lowercase, less than 3 letters, more than 3 letters
    nft = nft.toUpperCase();
    if (nft.length < 3) nft = nft.padEnd(3, ' ');
    else if (nft.length > 3) nft = nft.slice(0, 3);
    for (const [i, letter] of [...nft].entries()) {
        position = lw * i;
        for (const mod of letters[letter]) module(...mod, position);
    }
}

/**
 * This function creates every modules of waves
 * the movement is determined by the lsPts function
 * @param {*} reps @type {number} Number of repetitions of the waves
 * @param {*} kndList @type {number} Kind of list to use
 * @param {*} wave @type {number} Wave height
 * @param {*} xTrans @type {number} X translation
 */
function module(reps, kndList, wave = 0, xTrans = 0) {
    noFill();
    stroke(255);
    strokeWeight(1);
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

/**
 * This function sets the movement of the waves across their width
 * @param {*} num @type {number} Kind of list to use
 * @param {*} wave @type {number} Wave height
 * @returns {array} Array of points
 */
function lsPts(num, wave = lw * 0.5) {
    const points = [];
    // Different kind of shapes used across the alphabet
    for (let x = 0; x < lw; x += 4) {
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
                y = setY(x, wave, 0.1, 0.9, true, 2, { l: 0.1, r: 0.01 });
                break;
            case 7:
                y = setY(x, wave, 0.6, 0.9);
                break;
            case 8:
                y = setY(x, wave, 0.1, 0.9, true, 3);
                break;
            case 9:
                y = setY(x, wave, 0.1, 1);
                break;
            default:
                break;
        }
        if (y < 0) points.push({ x, y: y * -1 });
        else points.push({ x, y });
    }
    return points;
}

/**
 * This function sets the random y coordinate
 * of a point with deterministic x coordinate
 * @param {*} x Current advance over the width of the letter
 * @param {*} wave Current wave
 * @param {*} left Left bound of the letter
 * @param {*} right Right bound of the letter
 * @param {*} chopped Indicates if the letter drawing is chopped
 * @param {*} chops Number of chops
 * @param {*} ch {x, y} offsets of the chops
 * @returns {number} the coordinate of the y point
 */
function setY(
    x,
    wave,
    left,
    right,
    chopped = false,
    chops = 2,
    ch = { l: 0.1, r: 0.1 }
) {
    // All possibilities to determine the y coordinate variations
    const half = left + (right - left) / 2,
        third = left + (right - left) / 3,
        [a1, a2, a3, a4] = [
            x > 0 && x < lw * left,
            x > lw * right && x <= lw,
            x > lw * (half - ch.l) && x < lw * (half + ch.r),
            x > lw * third && x < lw * (third + ch.r),
        ],
        [b1, b2, b3, b4, b5] = [
            x > lw * left,
            x <= lw * half,
            x <= lw * (half - ch.l * 2),
            x > lw * (half + ch.r) && x < lw * (half + ch.r * 2),
            x > lw * (third + ch.r) && x < lw * (third + ch.r * 2),
        ],
        [c1, c2, c3, c4, c5] = [
            x > lw * half,
            x <= lw * right,
            x > lw * (half - ch.l * 2) && x <= lw * (half - ch.l),
            x >= lw * (half + ch.r * 2),
            x >= lw * (third + ch.r * 3),
        ];
    let [a, b, c] = [a1 || a2, b1 && b2, c1 && c2];
    if (chopped && chops === 2) {
        a = a1 || a3 || a2;
        b = (b1 && b3) || b4;
        c = c3 || (c4 && c2);
    }
    if (chopped && chops === 3) {
        a = a4;
        b = (b1 && b3) || b5;
        c = c3 || (c5 && c2);
    }
    // Set the y variation depending on the condition achieved by the parameters provided
    let y;
    if (a) y = sin(x * random(1, 3));
    else if (b) y = (x * sin(radians(x * random(-100, 100)))) / 10;
    else if (c) y = (wave * sin(radians(wave * random(-100, 100)))) / 10;
    else y = 0;
    return y;
}
