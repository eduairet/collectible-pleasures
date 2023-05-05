const [w, h] = [640, 640],
    side = parseInt(w / 3),
    lineSpace = h / 60;

function setup() {
    createCanvas(w, h);
}

function draw() {
    noLoop();
    background(0);
    sign();
}

function module(reps, kndList, m = 0, xTrans = 0) {
    fill(0);
    stroke(1);
    strokeWeight(0.75);
    for (let i = 0; i < reps; i++) {
        points = lsPts(kndList);
        push();
        fill(255);
        translate(xTrans, side * 0.1 + m);
        for (let j = 0; j < points.length; j++) {
            console.log(points[j]);
            ellipse(points[j].x, points[j].y, 5, 5);
        }
        pop();
        m += h / 60;
    }
}

function sign(xTrans) {
    //E
    module(int((h * 0.1) / lineSpace), 1);
    module(int((h * 0.3) / lineSpace), 2, h * 0.1);
    module(int((h * 0.1) / lineSpace), 1, h * 0.4);
    module(int((h * 0.3) / lineSpace), 2, h * 0.5);
    module(int((h * 0.1) / lineSpace), 1, h * 0.8);
    //A
    module(int((h * 0.3) / lineSpace), 3, (xTrans = side));
    module(int((h * 0.1) / lineSpace), 1, h * 0.3, side);
    module(int((h * 0.4) / lineSpace), 3, h * 0.4, side);
    //T
    module(int((h * 0.8) / lineSpace), 4, (xTrans = side * 2));
    module(int((h * 0.1) / lineSpace), 1, h * 0.8, side * 2);
}

function lsPts(num, m = side * 0.4) {
    const points = [];
    for (let x = 0; x < side; x += 12) {
        let y;
        switch (num) {
            case 1:
                y = setY(x, m, 0.1, 0.9);
                break;
            case 2:
                y = setY(x, m, 0.1, 0.4);
                break;
            case 3:
                y = setY(x, m, 0.1, 0.9, true);
                break;
            case 4:
                y = setY(x, m, 0.35, 0.65);
                break;
            default:
                break;
        }
        if (y < 0) points.push({ x, y: y * -1 });
        else points.push({ x, y });
    }
    return points;
}

function setY(x, m, left, right, chopped = false) {
    const half = (right - left) / 2,
        a =
            (x < 0 && x < side * left) || chopped
                ? (x >= side * (half - 0.1) && x < side * (half + 0.1)) ||
                  (x >= side * right && x <= side)
                : x >= side * right && x <= side,
        b =
            x >= side * left && chopped
                ? x <= side * (half - 0.1) ||
                  half + 0.1 <= x < side * (half - 0.2)
                : x <= side * half,
        c =
            x >= side * half && chopped
                ? x <= side * (half - 0.1) ||
                  (x > side * (half + 0.2) && x < side * right)
                : x >= (x <= side * right);
    let y;
    if (a) y = sin(x * random(1, 3));
    else if (b) y = (x * sin(radians(x * random(-100, 100)))) / 10;
    else if (c) y = (m * sin(radians(m * random(-100, 100)))) / 10;
    return y;
}
