// Marton Petoe
// Matrikelnummer: 209374
// Hausaufgabe für den Fach "Methoden des virtual Engineering in der Mechanik"
// Beleg Nr. 5.

// Vertex variables
var nVertex = 8; // Number of vertices
let vertices = []; // Empty array for storing the vertex objects
var phiStep = 2 * 3.1415 / nVertex;
var hoverID = 0;

// Hatching variables
var alpha; // Angle of the hatching
var n = 50; // Number of hatching lines
var ID1, ID2
let hatching = [] // Ampty array to store the hatching line objects
var ex, ey;
var slider

function setup() {
  var canvas = createCanvas(600, 600);
  slider = createSlider(10, 90, 30);
  slider.class("slider")
  alpha = -PI / 4;
  m = tan(alpha);
  ex = cos(alpha); // Unit direction vector of the hatching - x component
  ey = sin(alpha); // Unit direction vector of the hatching - y component

  createVertices();
  createHatching();
}

function mouseDragged() {
  if (vertices[hoverID].hover) {
    // Assign the mouse coordinates to chosen node while the mouse is being dragged
    vertices[hoverID].x = mouseX;
    vertices[hoverID].y = mouseY;
    vertices[hoverID].calcY(); // calculate Y value for the new position of the vertex
    createHatching(); // Fill the array up
  } else {

    n = slider.value();
    createHatching(); // Fill the array up
  }
}

function draw() {
  background(0);


  // Iterate throught the hatching lines and show every one of them
  for (var i = 0; i < hatching.length; i++) {
    hatching[i].show();
  }

  showPolygonalChain() // Display the polygonal chain as the boundary


  for (var i = 0; i < vertices.length; i++) { // Iterate through every vertex
    vertices[i].mouseHovers(); // Check if the mouse is above one of them
    if (vertices[i].hover) {
      // set global variable hoverID equal to the ID of the vertex the mouse hovers
      // about currently
      hoverID = vertices[i].ID;
    }
    vertices[i].display(); // Display every vertex
  }

fill(255)
  noStroke()
  text("Number of hatching lines = "+n,20,height-20)
} // End draw

function createVertices() {
  for (var v = 0; v < nVertex; v++) {
    var R = random(100, 250);
    var phi = v * phiStep;
    var x = width / 2 + R * cos(phi);
    var y = height / 2 + R * sin(phi);
    vertices.push(new Vertex(x, y, v));
  }
} // End createVertices


function distanceBetweenParalellLines(Y1, Y2) {
  // Calculate the shortest distance between two paralell lines. The equation is from
  // the following site (note, that we use Y1 and Y2 instad of c1 and c2):
  // https://math.tutorvista.com/geometry/distance-between-two-parallel-lines.html
  var d = abs(Y1 - Y2) / sqrt(1 + sq(m));
  return d;
}

function showPolygonalChain() {
  stroke(255);
  strokeWeight(1.5);
  for (var i = 0; i < nVertex; i++) {
    if (i < nVertex - 1) {
      line(vertices[i].x, vertices[i].y, vertices[i + 1].x, vertices[i + 1].y);
    } else if (i == nVertex - 1) {
      line(vertices[i].x, vertices[i].y, vertices[0].x, vertices[0].y);
    }
  }
} // End showPolygonalChain

function createHatching() {
  hatching = []; // Erase elements in "hatching"
  var jMin = 0; // Set that starting value of the second loop to the minimum
  var dMax = 0; // Set initial value for the highest found distance

  for (var i = 0; i < nVertex; i++) {
    var Y1 = vertices[i].Y; // Acces Y value for the first vertex

    for (var j = jMin; j < nVertex; j++) {
      var Y2 = vertices[j].Y // Acces Y value for the second vertex

      if (i != j) { // Only compare them, if they are two different vertices
        d = distanceBetweenParalellLines(Y1, Y2);
        if (d > dMax) {
          dMax = d; // If the current d is greater than the dMax, update the value of dMax
          ID1 = i; // Update ID for the 1st vertex
          ID2 = j; // Update ID for the 2nd vertex
        }
      }
    }
    // Increate the value of JMin after in every loop of "i" by one, in order to
    // avoid redundant comparisons
    jMin++;
  }

  dStep = dMax / (n + 1); // Gap between two hatching lines

  var ID;
  if (vertices[ID2].x > vertices[ID1].x) {
    ID = ID1;
  } else {
    ID = ID2;
  }

  for (i = 1; i < n + 1; i++) {
    // Calculate a given point of the 2D plane the current hatching line passes through
    var x = vertices[ID].x - i * dStep * ey;
    var y = vertices[ID].y + i * dStep * ex;
    hatching.push(new HatchingLine(x, y));
  }
} // End createHatching
