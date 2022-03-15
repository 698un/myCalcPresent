

class ImageRepository {

    constructor() {

        this.imgBufferCount = 10;
        this.myImage = new Array(this.imgBufferCount);

        for (let i = 0; i < this.imgBufferCount; i++) {
            this.myImage[i] = new ImageClass(i);//post frameNumber
            }//next i

       }//constructor

}//class ImageRepository

class ImageClass {
    constructor(inpFrame) {
       this.pixLine = new Array(imageHeight);
       this.frameNum = inpFrame;

       for (let i=0;i<imageHeight;i++)
       this.pixLine[i]  =  new ImagePixelLine(this.frameNum,i);
       }//constructor

    }//ImageClass

class ImagePixelLine{

    constructor(inpFrame,inpLine) {
        this.clientKey = "none";
        this.inpFrameNum = inpFrame;
        this.inpLineNum = inpLine;
        }//constructor

    }//class ImagePixelLine


