

class ParentWin{

    constructor(){
        this.pos = createVector(0,0);
        this.w1 = 100;
        this.h1 = 100;
        this.borderWidth = 3;
        this.titleHeight = 20;
        this.titleWidth = 80;

        }



    mouseInTitle(){

        if (mouseX<this.pos.x+this.borderWidth) return false;
        if (mouseX>this.pos.x+this.titleWidth) return false;
        if (mouseY<this.pos.y+this.borderWidth) return false;
        if (mouseY>this.pos.y+this.borderWidth+this.titleHeight) return false;
        return true;
        }//mouseInTitle

    mouseInRegion(){
        if (mouseX<this.pos.x) return false;
        if (mouseX>this.pos.x+this.w1) return false;
        if (mouseY<this.pos.y) return false;
        if (mouseY>this.pos.y+this.h1) return false;
        return true;
        }

    coordsInRegion(x,y){
        if (x<this.pos.x) return false;
        if (x>this.pos.x+this.w1) return false;
        if (y<this.pos.y) return false;
        if (y>this.pos.y+this.h1) return false;
        return true;
        }


     }//class ParentWin










