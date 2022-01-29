
var canvas;
var x1, y1;
// let frame_rate = 3000;
var choice_of_viz;
var choice_of_color;
var theta;

function windowResized() {
    resizeCanvas(windowWidth-20, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth-20, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '0');
    // frameRate(frame_rate);
    background(255);
    fill(255);
    noStroke();
    x1 = width/2;
    y1 = height/2;
    choice_of_viz = int(random(3));
    choice_of_color = int(random(3));
    theta=0;
  }
  
function draw() {

    if ( choice_of_viz == 0) {
        wiener_circles();
    } else if ( choice_of_viz == 1) {
        fader();
    } else if ( choice_of_viz == 2) {
        rippler();
    }

}

function wiener_circles() {
    noStroke();

    for (i=0;i<10;i++) {
        if ( choice_of_color == 0) {
            fill(random(255),255,255,80);
        } else if ( choice_of_color == 1) {
            fill(255,random(255),255,80);
        } else if ( choice_of_color == 2) {
            fill(255,255,random(255),80);
        }

        let r = 100;
        ellipse(x1, y1, r, r);
        if ( x1 > width + 50 || y1 > height + 50 || x1 < -50 || y1 < -50) {
            x1 = width/2;
            y1 = height/2;
        } else {
            x1 = x1+random(100)-50;
            y1 = y1+random(100)-50;
        }
    }
}

function fader() {
    noStroke();
    fill(255,5);
    rect(0,0,width,height);
    if ( choice_of_color == 0) {
        fill(random(255),255,255);
    } else if ( choice_of_color == 1) {
       fill(255,random(255),255);
    } else if ( choice_of_color == 2) {
       fill(255,255,random(255));
    }

    r = random(10,40);
    ellipse(random(width),random(height),r,r);
}

function rippler() {
    noStroke();
    fill(255,5);
    rect(0,0,width,height);

    if ( choice_of_color == 0) {
        fill(random(0,100),random(0,100),random(100,255),200);
    } else if ( choice_of_color == 1) {
       fill(random(0,100),random(100,255),random(0,100),200);
    } else if ( choice_of_color == 2) {
       fill(random(100,255),random(0,100),random(0,100),200);
    }
    origin_x = width/2;
    origin_y = height/2;

    radius_x = theta * width/50;
    radius_y = theta * height/50;

    x1 = origin_x + radius_x * Math.cos(theta); 
    y1 = origin_y + radius_y * Math.sin(theta);

    if ( theta >= 10 * Math.PI )
        {
          theta = 0;
        } else {
            theta = theta + Math.PI / 10;
        }

    r1 = 40 + 100*noise(frameCount);
    r2 = 40 + random(-200,200);
    
    noStroke();
    ellipse(x1,y1,r1,r1);
    

}