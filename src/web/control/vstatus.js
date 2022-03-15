
class VStatus extends ParentRegion{

    constructor() {
        super();

        this.realPos = createVector(0,0);
        this.w1=100;
        this.h1 = 20;


        this.titleAfterValue = "%";
        this.titleBeforeValue = "value=";
        this.tSize = globalTextSize;

        //colors
        this.textColor = color(255,255,0);
        this.backColor = color(0,0,0);
        this.statusColor = color(255,0,0);

        //limited
        this.min = 0;
        this.max = 255;
        this.value = (this.min+this.max)*0.5;
        this.parent = null;

        this.controlEnabled = false;//разрешение изменения значения

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



    display(){

        this.realPos.x = this.getRealPosX();
        this.realPos.y = this.getRealPosY();

        //draw background
        fill(this.backColor);
        rect(this.realPos.x,this.realPos.y,
             this.w1,this.h1);

        //width of status line
        let wStatus = this.w1*(this.value-this.min)/(this.max-this.min);

        //draw status value
        fill(this.statusColor);
        rect(this.realPos.x,this.realPos.y,
             wStatus,this.h1);

        //write text
        fill(this.textColor);
        textSize(this.tSize);
        textAlign(LEFT,CENTER);
        text(this.titleBeforeValue+this.value+this.titleAfterValue,
             this.realPos.x,this.realPos.y+this.h1/2);


        }//display


    eventChangeValue(){

        if (this.controlEnabled==false) return false;

        if (MW_press==false) return false;

        //remember old value
        let oldValue = this.value;

        if (this.pointInRegion(mouseX,mouseY)==false) return false;

        let newValue =this.min+ (mouseX-this.pos.x)/this.w1*(this.max-this.min);
        newValue = Math.round(newValue);

        if (newValue==oldValue) return false;

        this.value = newValue;
        return true;

        }//eventMouseDown


}//class VStatus