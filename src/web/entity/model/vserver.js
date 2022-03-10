
class VServer{


    constructor(){

        this.W1 = 300;
        this.H1 = 200;
        this.pos = createVector(width/2-this.W1/2,height/2-this.H1/2);

        this.reposition();


        }


    reposition(){
        this.pos.x = this.pos.x*1.0*width/widthPrev;
        this.pos.y = this.pos.y*1.0*height/heightPrev;

        if (this.pos.x>width)  this.pos.x = width  - this.W1;
        if (this.pos.y>height) this.pos.y = height - this.H1;


        }//reposition



    //METHOD _ SHOW
    display(){

        fill(127,127,255);
        rect(this.pos.x,this.pos.y,this.W1,this.H1);

        //console.log(this.pos.x+" / "+this.pos.y);

        }//display






}