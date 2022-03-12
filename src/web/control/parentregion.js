




class ParentRegion extends Region{
    constructor(){
        super();
        this.parent = null;
        this.realPos=  createVector(0,0);


        //redefined function
        this.pointInRegion = function (x,y){

            let posX = this.getRealPosX();
            let posY = this.getRealPosY();

            if (x<posX) return false;
            if (x>posX+this.w1) return false;
            if (y<posY) return false;
            if (y>posY+this.h1) return false;
            return true;
            }//redefined pointInRegion

        }//constructor

    //defined Real coordinates with parent
    getRealPosX(){
        if (this.parent!=null) return this.pos.x+this.parent.getRealPosX();
        return this.pos.x;
        }
    getRealPosY(){
        if (this.parent!=null) return this.pos.y+this.parent.getRealPosY();
        return this.pos.y;
        }





    }//class ParentCoords



