// let g = 900.81;

// // parameters
// let L1 = 150;
// let L2 = 150;
// let m1 = 1;
// let m2 = 1;

// // state
// let theta1 = Math.PI / 2;
// let theta2 = Math.PI / 2;
// let omega1 = 0;
// let omega2 = 0;

// let dt = 0.02;
// let trail = [];

// // UI
// let t1S, t2S, L1S, L2S, m1S, m2S;
// let startB, stopB, resetB;

// let state = "preview"; // preview | running | stopped

// function setup() {
//   createCanvas(600, 600);
//   pixelDensity(2);

//   t1S = createSlider(0, 2*PI, PI / 2, 0.01);
//   t2S = createSlider(0, 2*PI, PI / 2 + 0.01, 0.01);
//   L1S = createSlider(50, 250, 150, 1);
//   L2S = createSlider(50, 250, 150, 1);
//   m1S = createSlider(0.1, 5, 1, 0.1);
//   m2S = createSlider(0.1, 5, 1, 0.1);

//   startB = createButton("Start");
//   stopB = createButton("Stop");
//   resetB = createButton("Reset");

//   startB.mousePressed(() => state = "running");
//   stopB.mousePressed(() => state = "stopped");
//   resetB.mousePressed(resetSim);

//   layoutUI();
//   resetSim();
// }

// function layoutUI() {
//   let y = 20;
//   createP("θ₁").position(20, y); t1S.position(80, y); y += 30;
//   createP("θ₂").position(20, y); t2S.position(80, y); y += 30;
//   createP("L₁").position(20, y); L1S.position(80, y); y += 30;
//   createP("L₂").position(20, y); L2S.position(80, y); y += 30;
//   createP("m₁").position(20, y); m1S.position(80, y); y += 30;
//   createP("m₂").position(20, y); m2S.position(80, y); y += 40;

//   startB.position(20, y);
//   stopB.position(80, y);
//   resetB.position(140, y);
// }

// function resetSim() {
//   state = "preview";

//   theta1 = t1S.value();
//   theta2 = t2S.value();
//   omega1 = 0;
//   omega2 = 0;

//   L1 = L1S.value();
//   L2 = L2S.value();
//   m1 = m1S.value();
//   m2 = m2S.value();

//   trail = [];
// }

// function draw() {
//   background(0);

//   let originX = width / 2;
//   let originY = 150;

//   if (state === "preview") {
//     theta1 = t1S.value();
//     theta2 = t2S.value();
//     L1 = L1S.value();
//     L2 = L2S.value();
//     m1 = m1S.value();
//     m2 = m2S.value();
//   }

//   if (state === "running") {
//     stepPhysics();
//   }

//   // positions
//   let x1 = originX + L1 * sin(theta1);
//   let y1 = originY + L1 * cos(theta1);
//   let x2 = x1 + L2 * sin(theta2);
//   let y2 = y1 + L2 * cos(theta2);

//   // trail
//   trail.push({ x: x2, y: y2 });
//   if (trail.length > 2000) trail.shift();

//   stroke(255, 100, 100);
//   noFill();
//   beginShape();
//   for (let p of trail) vertex(p.x, p.y);
//   endShape();

//   stroke(255);
//   strokeWeight(2);
//   line(originX, originY, x1, y1);
//   line(x1, y1, x2, y2);

//   fill(255);
//   circle(x1, y1, 10);
//   circle(x2, y2, 10);
// }

// function stepPhysics() {
//   let delta = theta2 - theta1;

//   let denom1 = (m1 + m2) * L1 - m2 * L1 * cos(delta) * cos(delta);
//   let denom2 = (L2 / L1) * denom1;

//   let a1 = (
//     m2 * L1 * omega1 * omega1 * sin(delta) * cos(delta) +
//     m2 * g * sin(theta2) * cos(delta) +
//     m2 * L2 * omega2 * omega2 * sin(delta) -
//     (m1 + m2) * g * sin(theta1)
//   ) / denom1;

//   let a2 = (
//     -m2 * L2 * omega2 * omega2 * sin(delta) * cos(delta) +
//     (m1 + m2) * g * sin(theta1) * cos(delta) -
//     (m1 + m2) * L1 * omega1 * omega1 * sin(delta) -
//     (m1 + m2) * g * sin(theta2)
//   ) / denom2;

//   omega1 += a1 * dt;
//   omega2 += a2 * dt;

//   theta1 += omega1 * dt;
//   theta2 += omega2 * dt;
// }





// ===============================
// Double Pendulum Chaos Ensemble
// ===============================

// =======================================
// Double Pendulum Chaos Ensemble (FINAL)
// =======================================

let g = 2000;
let dt = 0.005;

// UI
let t1S, t2S, L1S, L2S, m1S, m2S;
let copiesS, devS;
let startB, stopB, resetB;

let state = "preview"; // preview | running | stopped

let ensemble = [];
let original = null;
let previewPendulum = null;

// =======================================
// Pendulum Class
// =======================================

class Pendulum {
  constructor(theta1, theta2, L1, L2, m1, m2, col, alpha) {
    this.theta1 = theta1;
    this.theta2 = theta2;
    this.omega1 = 0;
    this.omega2 = 0;

    this.L1 = L1;
    this.L2 = L2;
    this.m1 = m1;
    this.m2 = m2;

    this.trail = [];
    this.trailMax = 600;

    this.col = col;
    this.alpha = alpha;
  }

  step() {
    let delta = this.theta2 - this.theta1;

    let denom1 =
      (this.m1 + this.m2) * this.L1 -
      this.m2 * this.L1 * cos(delta) * cos(delta);
    let denom2 = (this.L2 / this.L1) * denom1;

    let a1 =
      (this.m2 * this.L1 * this.omega1 ** 2 * sin(delta) * cos(delta) +
        this.m2 * g * sin(this.theta2) * cos(delta) +
        this.m2 * this.L2 * this.omega2 ** 2 * sin(delta) -
        (this.m1 + this.m2) * g * sin(this.theta1)) /
      denom1;

    let a2 =
      (-this.m2 * this.L2 * this.omega2 ** 2 * sin(delta) * cos(delta) +
        (this.m1 + this.m2) * g * sin(this.theta1) * cos(delta) -
        (this.m1 + this.m2) * this.L1 * this.omega1 ** 2 * sin(delta) -
        (this.m1 + this.m2) * g * sin(this.theta2)) /
      denom2;

    this.omega1 += a1 * dt;
    this.omega2 += a2 * dt;

    this.theta1 += this.omega1 * dt;
    this.theta2 += this.omega2 * dt;
  }

  updateTrail(x, y) {
    this.trail.push({ x, y });
    if (this.trail.length > this.trailMax) this.trail.shift();
  }

  draw(originX, originY, drawRod = true) {
  push(); // FIX: isolate styles
  let r1 = 10 * sqrt(this.m1);
  let r2 = 10 * sqrt(this.m2);

  let x1 = originX + this.L1 * sin(this.theta1);
  let y1 = originY + this.L1 * cos(this.theta1);
  let x2 = x1 + this.L2 * sin(this.theta2);
  let y2 = y1 + this.L2 * cos(this.theta2);

  // ---- trail ----
  stroke(
    red(this.col),
    green(this.col),
    blue(this.col),
    this.alpha
  );
  strokeWeight(1);
  noFill();

  beginShape();
  for (let p of this.trail) vertex(p.x, p.y);
  endShape();

  // ---- rods & masses ----
  if (drawRod) {
    stroke(255, 255);          // FIX: force white
    strokeWeight(1.5);

    line(originX, originY, x1, y1);
    line(x1, y1, x2, y2);

    fill(255, 255);
    noStroke();
    circle(x1, y1, r1);
    circle(x2, y2, r2);
  }

  pop(); // FIX: restore styles

  if (state === "running") {
  this.updateTrail(x2, y2);
  }
    }

}

// =======================================
// Setup
// =======================================

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  angleMode(RADIANS);
  t1S = createSlider(0, 2*PI, PI / 2, 0.01);
  t2S = createSlider(0, 2*PI, PI / 2, 0.01);
  L1S = createSlider(50, 250, 150, 1);
  L2S = createSlider(50, 250, 150, 1);
  m1S = createSlider(0.1, 5, 1, 0.1);
  m2S = createSlider(0.1, 5, 1, 0.1);

  copiesS = createSlider(0, 100, 0, 10);
  devS = createSlider(0.001, 0.01, 0.003, 0.001);

  startB = createButton("Start");
  stopB = createButton("Stop");
  resetB = createButton("Reset");

  startB.mousePressed(startSim);
  stopB.mousePressed(() => (state = "stopped"));
  resetB.mousePressed(resetSim);
  
  t1Val = createSpan("");
  t2Val = createSpan("");
  L1Val = createSpan("");
  L2Val = createSpan("");
  m1Val = createSpan("");
  m2Val = createSpan("");
  copiesVal = createSpan("");
  devVal = createSpan("");


  layoutUI();
  resetSim();
}

function layoutUI() {
  let y = 20;
  createP("θ₁").position(20, y); t1S.position(80, y); t1Val.position(300, y); y += 25;
  createP("θ₂").position(20, y); t2S.position(80, y); t2Val.position(300, y); y += 25;
  createP("L₁").position(20, y); L1S.position(80, y); L1Val.position(300, y); y += 25;
  createP("L₂").position(20, y); L2S.position(80, y); L2Val.position(300, y); y += 25;
  createP("m₁").position(20, y); m1S.position(80, y); m1Val.position(300, y); y += 25;
  createP("m₂").position(20, y); m2S.position(80, y); m2Val.position(300, y); y += 25;
  createP("Copies").position(20, y); copiesS.position(80, y); copiesVal.position(300, y); y += 25;
  createP("Deviation").position(20, y); devS.position(80, y); devVal.position(300, y); y += 40;

  startB.position(20, y);
  stopB.position(80, y);
  resetB.position(140, y);
}

// =======================================
// Control Logic
// =======================================

function resetSim() {
  state = "preview";
  ensemble = [];
  original = null;

  previewPendulum = new Pendulum(
    t1S.value(),
    t2S.value(),
    L1S.value(),
    L2S.value(),
    m1S.value(),
    m2S.value(),
    color(200),
    255
  );
}

function startSim() {
  ensemble = [];

  let t1 = t1S.value();
  let t2 = t2S.value();
  let L1 = L1S.value();
  let L2 = L2S.value();
  let m1 = m1S.value();
  let m2 = m2S.value();

  let N = copiesS.value();
  let D = devS.value();

  if (N > 0) {
    for (let i = 0; i < N; i++) {
      let frac = map(i, 0, N - 1, -1, 1);
      let d = frac * D;

    //   let col = lerpColor(
    //     color(0, 100, 255),
    //     color(255, 50, 50),
    //     (frac + 1) / 2
    //   );
    let t = (frac + 1) / 2;
    let col = rainbow(t);

      ensemble.push(
        new Pendulum(t1 + d, t2 + d, L1, L2, m1, m2, col, 255)
      );
    }
  }

  original = new Pendulum(
    t1,
    t2,
    L1,
    L2,
    m1,
    m2,
    color(255),
    255
  );

  state = "running";
}

// =======================================
// Draw Loop
// =======================================

function draw() {
  background(0);

//   let originX = width * (window.innerWidth < 768 ? 0.65 : 0.5);
  let originX = width * 0.5;
  let originY = height * (window.innerWidth < 768 ? 0.35 : 0.42);
  t1Val.html(t1S.value()*180/PI.toFixed(2));
  t2Val.html(t2S.value()*180/PI.toFixed(2));
  L1Val.html(L1S.value());
  L2Val.html(L2S.value());
  m1Val.html(m1S.value().toFixed(2));
  m2Val.html(m2S.value().toFixed(2));
  copiesVal.html(copiesS.value());
  devVal.html(devS.value().toFixed(4));


  if (state === "preview") {
    previewPendulum.theta1 = t1S.value();
    previewPendulum.theta2 = t2S.value();
    previewPendulum.L1 = L1S.value();
    previewPendulum.L2 = L2S.value();
    previewPendulum.m1 = m1S.value();
    previewPendulum.m2 = m2S.value();

    previewPendulum.draw(originX, originY, true);
    return;
  }

  if (state === "running") {
    for (let p of ensemble) p.step();
    original.step();
  }

  // draw copies first
  for (let p of ensemble) {
    p.draw(originX, originY, false);
  }

  // draw original on top
  if (original) {
    original.draw(originX, originY, true);
  }
}


function setVh() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
}

window.addEventListener("resize", setVh);
setVh();


function turbo(t) {
  // clamp to [0,1]
  t = constrain(t, 0, 1);

  // Turbo colormap polynomial (official approximation)
  let r = 34.61
        + t * (1172.33
        + t * (-10793.56
        + t * (33300.12
        + t * (-38394.49
        + t * 14825.05))));

  let g = 23.31
        + t * (557.33
        + t * (1225.33
        + t * (-3574.96
        + t * (2220.70
        + t * (-414.13)))));

  let b = 27.20
        + t * (3211.10
        + t * (-15327.97
        + t * (27814.00
        + t * (-22569.18
        + t * 6838.66))));

  return color(
    constrain(r, 0, 255),
    constrain(g, 0, 255),
    constrain(b, 0, 255)
  );
}

function rainbow(t) {
  // clamp
  t = pow(t, 0.9)

  // smooth full-spectrum rainbow (HSV-style, but manual RGB)
  let r = 0, g = 0, b = 0;

  let h = t * 6;        // 0 → 6
  let i = floor(h);
  let f = h - i;

  let q = 1 - f;

  switch (i % 6) {
    case 0: r = 1; g = f; b = 0; break;   // red → yellow
    case 1: r = q; g = 1; b = 0; break;   // yellow → green
    case 2: r = 0; g = 1; b = f; break;   // green → cyan
    case 3: r = 0; g = q; b = 1; break;   // cyan → blue
    case 4: r = f; g = 0; b = 1; break;   // blue → magenta
    case 5: r = 1; g = 0; b = q; break;   // magenta → red
  }

  return color(
    255 * r,
    255 * g,
    255 * b
  );
}
