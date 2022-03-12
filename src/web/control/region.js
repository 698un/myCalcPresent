



class Region{
    constructor(){
        this.pos = createVector(0,0);
        this.w1 =100;
        this.h1 =100;
        }

    setSize(newW,newH){
        this.w1 = newW;
        this.h1 = newH;
        }

    pointInRegion(x,y){
        if (x<this.pos.x) return false;
        if (x>this.pos.x+this.w1) return false;
        if (y<this.pos.y) return false;
        if (y>this.pos.y+this.h1) return false;
        return true;
        }

    }//class Region