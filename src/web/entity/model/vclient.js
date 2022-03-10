




class VClient{

    constructor(){

        this.pos = createVector(width/2,0);
        this.pos.x = 100;//*0+Math.random(300);
        this.pos.y = 200;//*0+Math.random(300);

        this.w1 = 200;
        this.h1 = 150;

        this.borderWidth = 5;
        this.titleHeight = 20;
        this.titleWidth = this.w1-this.borderWidth*2;
        this.onClose = false;
        this.active = false;//признак активного режима

        this.mouseMove=false;


        //UI_CMDStart
        this.cmdStart = new Cmd();
        this.cmdStart.caption = "START";
        this.cmdStart.parent = this;
        this.cmdStart.pos.y = this.borderWidth+this.titleHeight;
        this.cmdStart.pos.x = this.borderWidth;
        this.cmdStart.w1 = this.w1/2;
        this.cmdStart.h1 = this.cmdStart.textSize;

        this.cmdStart.pos.x = this.w1/2-this.cmdStart.w1/2;
        this.cmdStart.pos.y = this.h1/2-this.titleHeight/2;



        //UI_cmdExit
        this.cmdExit = new Cmd();
        this.cmdExit.parent = this;
        this.cmdExit.w1 = this.titleHeight;
        this.cmdExit.h1 = this.titleHeight;
        this.cmdExit.caption = "X";
        this.cmdExit.pos.x = this.w1-this.borderWidth-this.cmdExit.w1;
        this.cmdExit.pos.y = this.borderWidth;


        //rewidthTitle
        this.titleWidth = this.w1-this.borderWidth*2-this.cmdExit.w1;





        }//constructor


    reposition(){

        this.pos.x = this.pos.x * width/widthPrev;
        this.pos.y = this.pos.y * height/heightPrev;
        //console.log(this.pos.x+" / "+this.pos.y);

        }//reposition

    getRealPosX(){
        return this.pos.x;
        }
    getRealPosY(){
        return this.pos.y;
        }

    //METHOD_OF_SHOW
    display(){

        //if mouse not pressed then cancelled move
        if (MW_press==false) {
            this.mouseMove = false;
            }

        fill(192,192,192);

        rect(this.pos.x,this.pos.y,
             this.w1,this.h1);


        //drawTitle
        fill(0,0,255);
        rect(this.pos.x+this.borderWidth, this.pos.y+this.borderWidth,
             this.titleWidth,  this.titleHeight);

        //drawFon

        if (this.active==false) image(fonClientStart.fonCnv,
                                      this.pos.x+ this.borderWidth,
                                      this.pos.y+  this.borderWidth+this.titleHeight);


        //drawUI
        this.cmdStart.display();
        this.cmdExit.display();

        //if press exit
        if (this.cmdExit.eventMouseDown()) {
            this.onClose = true;
            console.log("close");
            }

        //console.log(this.pos.x+" / "+this.pos.y);


        //Move the Client
        if (MW_press==true && this.mouseMove) {

            this.pos.x+=mouseX-pmouseX;
            this.pos.y+=mouseY-pmouseY;

            //this.oldMouseX = mouseX;
            //this.oldMouseY = mouseY;
            }

        //Press to Title
        if (MW_press==true && this.mouseInTitle() && this.mouseMove==false) {

            //this.oldMouseX = mouseX;
            //this.oldMouseY = mouseY;
            this.mouseMove = true;
            console.log("clickToTitle");
            }





    }//display








    mouseInTitle(){

        if (mouseX<this.pos.x+this.borderWidth) return false;
        if (mouseX>this.pos.x+this.titleWidth) return false;
        if (mouseY<this.pos.y+this.borderWidth) return false;
        if (mouseY>this.pos.y+this.borderWidth+this.titleHeight) return false;

        //console.log(true);

        return true;
        }//mouseInTitle




    }//class VClient