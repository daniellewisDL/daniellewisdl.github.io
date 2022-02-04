

///////////////////////////////////////////////////////////////////////////////
///////////// SKETCH 1 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const s1 = ( sketch1 ) => {

    let cs = 20;
    let x = 0-cs;
    let y;
    let offset=0;

    sketch1.setup = () => {
        sketch1.createCanvas(document.getElementById('first-sketch').offsetWidth, 100);
        y = sketch1.height/2;
        sketch1.background(255,255,255);
      };
      
    sketch1.draw = () => {
      sketch1.noLoop();
      while (offset <= 1) {

        sketch1.fill(255,255,255,10);
        sketch1.noStroke();

        if (x>(sketch1.width+cs)) { x = 0-cs; offset+=1;} else {x+=2;}
        x_prime = sketch1.map(x,0-cs,sketch1.width+cs,0,sketch1.TWO_PI);
        y = sketch1.map(sketch1.sin(x_prime+offset),-1,1,0+cs,sketch1.height-cs);

        sketch1.noFill();
        sketch1.stroke(0,0,0,20);
        sketch1.circle(x,y,cs);
      };    
    };
};

let sketch_1 = new p5(s1, 'first-sketch');



///////////////////////////////////////////////////////////////////////////////
///////////// SKETCH 2 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
 
const s2 = ( sketch2 ) => {

  let cs = 20;
  let x = 0-cs;
  let y;
  let offset=0;

  sketch2.setup = () => {
      sketch2.createCanvas(document.getElementById('second-sketch').offsetWidth, 100);
      y = sketch2.height/2;
      sketch2.background(255,255,255);
    };
    
  sketch2.draw = () => {
    sketch2.noLoop();
    while (offset <= 5) {

      sketch2.fill(255,255,255,10);
      sketch2.noStroke();

      if (x>(sketch2.width+cs)) { x = 0-cs; offset+=1;} else {x+=2;}
      x_prime = sketch2.map(x,0-cs,sketch2.width+cs,0,sketch2.TWO_PI);
      y = sketch2.map(sketch2.sin(x_prime+offset),-1,1,0+cs,sketch2.height-cs);

      sketch2.noFill();
      sketch2.stroke(0,0,0,20);
      sketch2.circle(x,y,cs);
    };    
  };
};

let sketch_2 = new p5(s2, 'second-sketch');



///////////////////////////////////////////////////////////////////////////////
///////////// SKETCH 3 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
 
const s3 = ( sketch3 ) => {

  let cs = 20;
  let x = 0-cs;
  let y;
  let offset=0;

  sketch3.setup = () => {
      sketch3.createCanvas(document.getElementById('third-sketch').offsetWidth, 100);
      sketch3.background(255,255,255);
    };
    
  sketch3.draw = () => {
    
    if (offset >= 10) {
      sketch3.fill(255,255,255);
      sketch3.noStroke();
      sketch3.rect(0,0,sketch3.width,sketch3.height);
      offset = 0;
      x = 0-cs;

    }

    if (x>(sketch3.width+cs)) { x = 0-cs; offset+=1;} else {x+=5;}
    x_prime = sketch3.map(x,0-cs,sketch3.width+cs,0,sketch3.TWO_PI);
    y = sketch3.map(sketch3.sin(x_prime+offset),-1,1,0+cs,sketch3.height-cs);

    sketch3.fill(0,0,0,20);
    sketch3.noStroke();
    // sketch3.noFill();
    // sketch3.stroke(0,0,0,100);
    sketch3.circle(x,y,cs);
      
  };
};

let sketch_3 = new p5(s3, 'third-sketch');



///////////////////////////////////////////////////////////////////////////////
///////////// SKETCH 4 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
 
const s4 = ( sketch4 ) => {

  let cs = 20;
  let x = 0-cs;
  let y;
  let offset=0;
  let colorChanger = [200,0,0];

  sketch4.setup = () => {
      var canvas = sketch4.createCanvas(document.getElementById('fourth-sketch').offsetWidth, 100);
      canvas.mousePressed(changeColor);
      sketch4.background(255,255,255);
    };
    
  sketch4.draw = () => {
    
    if (offset >= 10) {
      sketch4.fill(255,255,255);
      sketch4.noStroke();
      sketch4.rect(0,0,sketch4.width,sketch4.height);
      offset = 0;
      x = 0-cs;

    }

    if (x>(sketch4.width+cs)) { x = 0-cs; offset+=1;} else {x+=5;}
    x_prime = sketch4.map(x,0-cs,sketch4.width+cs,0,sketch4.TWO_PI);
    y = sketch4.map(sketch4.sin(x_prime+offset),-1,1,0+cs,sketch4.height-cs);

    sketch4.fill(colorChanger[0],colorChanger[1],colorChanger[2],100);
    sketch4.noStroke();
    // sketch4.noFill();
    // sketch4.stroke(0,0,0,100);
    sketch4.circle(x,y,cs);
      
  };

  function changeColor() {
    colorChanger[0] = sketch4.random(50,255);
    colorChanger[1] = sketch4.random(50,255);
    colorChanger[2] = sketch4.random(50,255);
  };

};

let sketch_4 = new p5(s4, 'fourth-sketch');

///////////////////////////////////////////////////////////////////////////////
///////////// SKETCH 5 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
 
const s5 = ( sketch5 ) => {

  let cs = 50;
  let x;
  let y;

  sketch5.setup = () => {
      var canvas = sketch5.createCanvas(document.getElementById('fifth-sketch').offsetWidth, 100);
      sketch5.background(255,255,255);
    };
    
  sketch5.draw = () => {
    sketch5.noLoop();


    for (i=0;i<1000;i++) {
      sketch5.noStroke();
      sketch5.fill(0,sketch5.random(100,255),sketch5.random(100,255),30);
      sketch5.circle(sketch5.random(sketch5.width),sketch5.random(sketch5.height),cs);
      sketch5.stroke(0,sketch5.random(100,255),sketch5.random(100,255),10);
      sketch5.line(0,sketch5.random(sketch5.height),sketch5.width,sketch5.random(sketch5.height))
    }

  }

};

let sketch_5 = new p5(s5, 'fifth-sketch');
