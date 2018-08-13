
class Vertex {

  constructor(x,y, ID) {
  this.x = x;
  this.y = y;
  this.ID = ID;

  this.calcY();
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 10, 10);

    noFill();
    stroke(255);
    strokeWeight(1);
    if ( this.hover ) {
    ellipse(this.x, this.y, 18, 18);
    }
    //stroke(255,200,0);
    //line(this.x-100,m*(this.x-100)+this.Y, this.x+100,m*(this.x+100)+this.Y);
  }

  calcY() {
    this.Y = this.y - m*this.x;
  }

  mouseHovers() {
    var d = dist(this.x, this.y, mouseX, mouseY);

    if ( d < 7) {
      this.hover = true;
    } else {
      this.hover = false;
    }
  }
}
