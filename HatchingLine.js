class HatchingLine {

  constructor(x, y) {
    // A given point of the hatching line
    this.x = x;
    this.y = y;
    this.Y = this.y - m * this.x;

    // Identifying 2 point along the hatching line for future computations
    this.Q1x = this.x;
    this.Q1y = this.y;
    this.Q2x = this.x + 100;
    this.Q2y = m * (this.x + 100) + this.Y;

    // Find intersections between the hatching line and the polygonal chain
    this.findIntersection();
  }

  show() {
    noFill();
    stroke(0, 200, 100);
    strokeWeight(1);

    for ( var i = 0; i < this.intersections.length; i += 2 ) {
      var x1 = this.Q1x + this.intersections[i] * (this.Q2x - this.Q1x);
      var y1 = this.Q1y + this.intersections[i] * (this.Q2y - this.Q1y);
      var x2 = this.Q1x + this.intersections[i+1] * (this.Q2x - this.Q1x);
      var y2 = this.Q1y + this.intersections[i+1] * (this.Q2y - this.Q1y);

      line(x1,y1,x2,y2);
    }
  }

  showIntersection() {
    fill(0, 200, 100);
    noStroke();
    for (var i = 0; i < this.intersections.length; i++) {
      var x = this.Q1x + this.intersections[i] * (this.Q2x - this.Q1x);
      var y = this.Q1y + this.intersections[i] * (this.Q2y - this.Q1y);
      ellipse(x, y, 8, 8);
    }
  }

  findIntersection() {
    var tQ, tP;
    this.intersections = [];

    for (var i = 0; i < vertices.length; i++) {
      var P1x = vertices[i].x;
      var P1y = vertices[i].y;

      if (i < nVertex - 1) {
        var P2x = vertices[i + 1].x;
        var P2y = vertices[i + 1].y;
      } else if (i == nVertex - 1) {
        var P2x = vertices[0].x;
        var P2y = vertices[0].y;
      }

      tQ = ((P1y - P2y) * (this.Q1x - P1x) + (P2x - P1x) * (this.Q1y - P1y)) /
        ((P2x - P1x) * (this.Q1y - this.Q2y) - (this.Q1x - this.Q2x) * (P2y - P1y));

      tP = ((this.Q1y - this.Q2y) * (this.Q1x - P1x) + (this.Q2x - this.Q1x) *
        (this.Q1y - P1y)) / ((P2x - P1x) * (this.Q1y - this.Q2y) -
        (this.Q1x - this.Q2x) * (P2y - P1y));

      if (tP >= 0 && tP < 1) {
        this.intersections.push(tQ);
      }
    }
    this.intersections = sort(this.intersections);
  }

}
