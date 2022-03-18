

class PixelFormatUI{




    constructor(){

        this.scrollLineSize = new VStatus();
        this.scrollLineSize.min = 10;
        this.scrollLineSize.max= 100;
        this.scrollLineSize.value= 10;
        this.scrollLineSize.controlEnabled = true;
        this.scrollLineSize.titleBeforeValue = "PixelCount: ";
        this.scrollLineSize.titleAfterValue = " px";
        this.scrollLineSize.pos.y = globalTextSize*2;
        this.scrollLineSize.backColor = color(0,0,255);
        this.scrollLineSize.statusColor = color(255,255,0);
        this.scrollLineSize.textColor = color(255,0,0);


        this.scrollFrameNum = new VStatus();
        this.scrollFrameNum.pos.x = this.scrollLineSize.pos.x;
        this.scrollFrameNum.pos.y = this.scrollLineSize.pos.y+this.scrollLineSize.h1+globalTextSize*0.5;
        this.scrollFrameNum.min = 0;
        this.scrollFrameNum.max = 640;
        this.scrollFrameNum.value = 10;
        this.scrollFrameNum.controlEnabled = true;
        this.scrollFrameNum.backColor = color(0,0,255);
        this.scrollFrameNum.titleBeforeValue = "FrameNum=";
        this.scrollFrameNum.titleAfterValue="";



        this.scrollLineNum = new VStatus();
        this.scrollLineNum.pos.x = this.scrollLineSize.pos.x;
        this.scrollLineNum.pos.y = this.scrollLineSize.pos.y+this.scrollLineSize.h1+globalTextSize*0.5;
        this.scrollLineNum.min = 0;
        this.scrollLineNum.max = 360;
        this.scrollLineNum.value = 10;
        this.scrollLineNum.controlEnabled = true;
        this.scrollLineNum.backColor = color(0,0,255);
        this.scrollLineNum.titleBeforeValue = "LineNum=";
        this.scrollLineNum.titleAfterValue="";





        //For Draw pixels
        this.pixelLineRegion = new Region();
        this.pixel = new  Array(100);
        this.pixelCount =  this.scrollLineSize.value;


        //for reGenerate new Colors
        this.cmdGenerate = new Cmd();




        this.pixelLineReBuild();
        this.rePosition();

        }//constructor

    rePosition(){

        this.scrollLineSize.w1 = width-globalTextSize*2.5;
        this.scrollLineSize.pos.x = globalTextSize;
        this.scrollLineSize.pos.y = globalTextSize*3;


        this.scrollFrameNum.w1 = this.scrollLineSize.w1*0.45;
        this.scrollFrameNum.pos.x =this.scrollLineSize.pos.x;
        this.scrollFrameNum.pos.y =this.scrollLineSize.pos.y+this.scrollLineSize.h1+globalTextSize*0.5;


        this.scrollLineNum.w1 =this.scrollFrameNum.w1;
        this.scrollLineNum.pos.x =this.scrollLineSize.pos.x+ this.scrollLineSize.w1 -this.scrollLineNum.w1;
        this.scrollLineNum.pos.y =this.scrollFrameNum.pos.y;




       // this.pixelLineRegion.pos.y = this.scrollLineSize.pos.y+this.scrollLineSize.h1+globalBorderWidth*2;

        }

    display(){

        this.scrollLineSize.display();

        if (this.scrollLineSize.eventChangeValue()) {this.pixelLineReBuild();}
        if (this.scrollFrameNum.eventChangeValue()) {this.pixelLineReBuild();}
        if (this.scrollLineNum.eventChangeValue())  {this.pixelLineReBuild();}

        this.scrollFrameNum.display();
        this.scrollLineNum.display();


        //отображение PixelLine
        this.drawPixelLine();

        //вывод текста зопроса
        this.drawRequest();





        }//display

    drawRequest(){


        let posX = this.scrollLineSize.pos.x;
        let posY = this.pixelLineRegion.pos.y + this.pixelLineRegion.h1+globalTextSize*2;
        let lineHeight = globalTextSize*1.5;
        //background(255);
        fill(255,255,255);
        //stroke(255,255,255);
        //textSize(globalTextSize*2);



        text('POST /resultat/scenekey/'+this.scrollFrameNum.value+"/"+this.scrollLineNum.value,
            posX,
            posY);

        posY+=lineHeight*1;

        text('BODY:',posX,posY);
        posX += globalTextSize*4;




        //generateString
        let pixelStr ="";
        for (let xe=0;xe<this.pixelCount;xe++){
            pixelStr+=this.textLen3(this.pixel[xe].r);
            pixelStr+=this.textLen3(this.pixel[xe].g);
            pixelStr+=this.textLen3(this.pixel[xe].b);
            }
        let indexX;
        let indexY=0;
        let tw = globalTextSize*0.7;

        let countInLength  = Math.floor((width-posX)/tw/3/3)*3*3-1;


        for (let xe=0;xe<pixelStr.length;xe++){
            indexY = 0;
            indexX = xe;
            while (indexX>countInLength) {
                indexY++;
                indexX-=(countInLength+1);
                }

            if ((xe/3)%3==0) fill(255,0,0);
            if ((xe/3)%3==1) fill(0,255,0);
            if ((xe/3)%3==2) fill(0,96,255);


             text(pixelStr[xe],
                 posX+indexX*tw,
                 posY+indexY*globalTextSize);


            }

/*
        for (let xe=0;xe<this.pixelCount;xe++){
            this.writePixel(posX+globalTextSize*4,
                            posY+lineHeight*1,
                                  xe);
            }//next xe
*/
        }//drawRequest

    //mothod write One pixel on screen
    writePixel(posX,posY,xe){
        
        
        let pixelWidth = globalTextSize*8;
        
        let left = posX+xe*pixelWidth;
        let top =  posY;

        let tw = globalTextSize*0.75;
        
        while (left>width-pixelWidth)  {
            
            top+=globalTextSize;
            left = left-(width-pixelWidth);
            }//while
        
        let strR = this.textLen3(this.pixel[xe].r);
        let strG = this.textLen3(this.pixel[xe].g);
        let strB = this.textLen3(this.pixel[xe].b);
        
        fill(255,0,0);
        text(strR,left+tw*3*0,top);

        fill(0,255,0);
        text(strG,left+tw*3*1,top);

        fill(0,0,255);
        text(strB,left+tw*3*2,top);


    }//writePixel
    
    
    
    textLen3(inpText){
        let res = ""+inpText+"";
        while (res.length<3) res="0"+res;
        return res;
        }//textLen3




    //This method rebuild pixelLine by lineSize
    pixelLineReBuild(){
        this.pixelCount = this.scrollLineSize.value;
        this.pixel = new Array(this.pixelCount);

        let frameNum = this.scrollFrameNum.value;
        let lineNum = this.scrollLineNum.value;

        let cR = 0;
        let cG = 0;
        let cB = 0;

        for (let xe = 0;xe<this.pixelCount;xe++){

            cR = Math.round(xe/this.pixelCount*255);
            cB = Math.round(255-xe/this.pixelCount*255);
            cG = Math.round(255-abs(xe-this.pixelCount/2)/this.pixelCount*2*255);

            this.pixel[xe] = new myPixel(cR,cG,cB);
            }//next xe
        }//pixelLineRebuild;



    drawPixelLine(){

        this.pixelLineRegion.w1 =  this.pixelCount*globalTextSize;
        this.pixelLineRegion.h1 = globalTextSize;
        this.pixelLineRegion.pos.x = width/2-this.pixelLineRegion.w1/2;
        this.pixelLineRegion.pos.y = this.scrollLineNum.pos.y+this.scrollLineNum.h1+globalTextSize;

        for (let xe=0;xe<this.pixelCount;xe++){
            fill(this.pixel[xe].r,this.pixel[xe].g,this.pixel[xe].b);

            rect(this.pixelLineRegion.pos.x+xe*globalTextSize,this.pixelLineRegion.pos.y,
                    globalTextSize,globalTextSize );

            }//next xe




        }//drawPixelLine





}//class pixelFormatUI


class myPixel{
    constructor(inpR,inpG,inpB){
        this.r = inpR;
        this.g = inpG;
        this.b = inpB;
        }//constructor
    }//MyPixel
