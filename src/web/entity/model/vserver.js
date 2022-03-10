
class VServer{


    constructor(){

        this.w1 = 300;
        this.h1 = 200;
        this.pos = createVector(width/2-this.w1/2,height/2-this.h1/2);


        this.reposition();

        this.borderWidth = 5;
        this.titleHeight = 20;
        this.titleWidth = this.w1-this.borderWidth*2;
        this.mouseMove=false;

        }


    reposition(){
        this.pos.x = this.pos.x*1.0*width/widthPrev;
        this.pos.y = this.pos.y*1.0*height/heightPrev;

        if (this.pos.x>width)  this.pos.x = width  - this.w1;
        if (this.pos.y>height) this.pos.y = height - this.h1;


        }//reposition





    //METHOD _ SHOW
    display(){

        //if mouse not pressed then cancelled move
        if (MW_press==false)   this.mouseMove = false;

        //background
        fill(192,192,192);
        rect(this.pos.x,this.pos.y,this.w1,this.h1);


        //drawTitle
        fill(0,0,255);
        rect(this.pos.x+this.borderWidth, this.pos.y+this.borderWidth,
             this.titleWidth,  this.titleHeight);

        //CAPTION
        fill(255);
        text("SERVER",
             this.pos.x+this.w1/2,
             this.pos.y+this.borderWidth+this.titleHeight/2);



        //======================================================================================

        //Move the SERVER
        if (MW_press==true && this.mouseMove) {
            this.pos.x+=mouseX-pmouseX;
            this.pos.y+=mouseY-pmouseY;
            }

        //Press to Title
        if (MW_press==true && this.mouseInTitle() && this.mouseMove==false) {
            this.mouseMove = true;
            console.log("clickToTitle");
            }



        //console.log(this.pos.x+" / "+this.pos.y);

        }//display



    mouseInTitle(){

        if (mouseX<this.pos.x+this.borderWidth) return false;
        if (mouseX>this.pos.x+this.titleWidth) return false;

        if (mouseY<this.pos.y+this.borderWidth) return false;
        if (mouseY>this.pos.y+this.borderWidth+this.titleHeight) return false;

        //console.log(true);

        return true;
        }//mouseInTitle

    }//class VServer