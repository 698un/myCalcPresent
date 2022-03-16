

class ImageRepository {

    constructor() {

        //индекс последнего обновлённого изображения
        this.lastImageUpdateIndex = -1;

        this.cnv = createGraphics(imageWidth,imageHeight);
        ///this.cnv.background(0);


        this.imgBufferCount = 100;
        this.myImage = new Array(this.imgBufferCount);

        //create images in buffer
        for (let i = 0; i < this.imgBufferCount; i++)  this.myImage[i] = new ImageClass(i);//post frameNumber
        }//constructor


    canvasUpdate(){

        let cR = 0;
        let cG = 0;
        let cB = 0;

        let index =this.lastImageUpdateIndex+2356;
        let xe = 0;
        let ye = 0;


        //this.cnv.loadPixels();
        this.cnv.background(255,255,0);
        this.cnv.noStroke();

        for (let i=0;i<25;i++) {

            xe = abs(sin(index * 1232.3423 + cos(i * 323.4522) * sin(index*34234.232))) * imageWidth;
            ye = abs(sin(index * 344.343 + 231*cos(i * 33.4522) * sin(index * 32.4))) * imageHeight;

            cR = sin(xe / imageWidth + ye * cos((xe + ye) / imageHeight)) * 127 + 127;
            cG = (xe + ye) % 255;
            cB = cos(xe * sin(ye) / imageWidth) * 127 + 127;
            this.cnv.fill(cR, cG, cB);
            this.cnv.ellipse(xe, ye, 10, 10);

            }//next i;

        this.cnv.fill(0);

        this.cnv.stroke(255,255,0);
        this.cnv.text("IMG "+(this.lastImageUpdateIndex+1),0,imageHeight/2);

        //HIDE unComplette Lines
        let currentImg = this.myImage[this.lastImageUpdateIndex];
        this.cnv.stroke(0);
        for (let ye = 0;ye<imageHeight;ye++){
            if (currentImg.pixLine[ye].complette==true) continue;

            this.cnv.line(0,ye,imageWidth,ye);
            this.cnv.line(0,ye,imageWidth,ye);
            this.cnv.line(0,ye,imageWidth,ye);
            this.cnv.line(0,ye,imageWidth,ye);

            }//next ye



        //this.cnv.updatePixels();
        console.log("canvasUpdate");
        }

    display(parentObject){

        if (this.lastImageUpdateIndex==-1) return;

        let imgW = parentObject.w1-globalBorderWidth*4;
        let imgH = Math.round(imgW/imageWidth*imageHeight);



        image(this.cnv,
            parentObject.pos.x+globalBorderWidth*2,
            parentObject.pos.y+globalTextSize*1.5,
            imgW,imgH);



    }//display



    getNewTask(inpClientKey){

        //console.log("imgRep. = "+inpClientKey);

        let newTask;
        for (let i=0;i<this.imgBufferCount;i++){
            newTask = this.myImage[i].getEmptyLine(inpClientKey);

            if (newTask!=null) return newTask;
            }//next image
        }//getNewTask

    getResultatDuration(request){


        let urlString = request.url;
        let clientKey = request.cookie;

        let strArray = urlString.split("/");
        let frameNum = Number(strArray[2]);
        let lineNum = Number(strArray[3]);

        //перерисовка
        this.lastImageUpdateIndex = frameNum;
        this.canvasUpdate();

        srv_consoleMessage("Resulat ["+frameNum+","+lineNum+"] from "+clientKey);

        return this.myImage[frameNum].flushResultat(clientKey,lineNum);

        }

    }//class ImageRepository





class ImageClass {

    constructor(inpFrame) {
       this.pixLine = new Array(imageHeight);
       this.frameNum = inpFrame;

       //create empty pixellines
       for (let i=0;i<imageHeight;i++) this.pixLine[i]  =  new ImagePixelLine(this.frameNum,i);
       }//constructor


    //method return pixelLine to calculate from this image
    getEmptyLine(inpClientKey){

        for (let ye=0;ye<imageHeight;ye++){

            if (this.pixLine[ye].complette==0) {
                this.pixLine[ye].clientKey = inpClientKey;
                this.pixLine[ye].complette = 1;
                this.pixLine[ye].BT = tMillis;
                return this.pixLine[ye];
                }//if empty


            if (this.pixLine[ye].complette==1 &&
                this.pixLine[ye].BT+lineLifeTime<tMillis ) {

                this.pixLine[ye].clientKey = inpClientKey;
                this.pixLine[ye].complette = 1;
                this.pixLine[ye].BT = tMillis;
                return this.pixLine[ye];
                }//if deprecate





            }
        return null; //null if not empty pixelLine in this image
        }//getEmptyLine

    flushResultat(inpClientKey,lineNum){

        //console.log("clientkey="+this.pixLine[lineNum].clientKey);
       // console.log("inpClientkey="+inpClientKey);
        if (this.pixLine[lineNum].clientKey !=inpClientKey) return "ERROR:INVALID CLIENTKEY";

        this.pixLine[lineNum].complette = true;
        let duration = Math.round(tMillis-this.pixLine[lineNum].BT);


        return duration;

        }//flushResultat



    }//ImageClass

class ImagePixelLine{

    constructor(inpFrame,inpLine) {
        this.clientKey = "none";
        this.complette=0;//1 - send to calculate   2 - comlette
        this.frame = inpFrame;
        this.line = inpLine;
        this.BT = tNow;

        }//constructor

    }//class ImagePixelLine


