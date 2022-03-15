

//This class is INFO panel for visual progress
class ClientPanel{

    constructor(parentObject) {

        this.lineNumber = 0;
        this.lineNumberMax = imageHeight;

        //INFO_FOR CLIENTCOUNT
        this.infoClient = new VStatus();
        this.infoClient.parent = parentObject;
        this.infoClient.pos.x = globalBorderWidth * 2;
        this.infoClient.pos.y = parentObject.titleHeight + globalBorderWidth * 2;
        this.infoClient.h1 = globalTextSize * 1.5;
        this.infoClient.w1 = parentObject.w1 - globalBorderWidth * 4;
        this.infoClient.titleBeforeValue = "ClientCount=";
        this.infoClient.titleAfterValue = "";


        //INFO FOR IMAGE_PROGRESS
        this.infoImage = new VStatus(parentObject);
        this.infoImage.parent = parentObject;
        this.infoImage.pos.x = this.infoClient.pos.x;
        this.infoImage.pos.y = this.infoClient.pos.y+this.infoClient.h1+globalBorderWidth*2;//under infoClient
        this.infoImage.h1 = this.infoClient.h1;
        this.infoImage.w1 = this.infoClient.w1;
        this.infoImage.titleBeforeValue = "image :";
        this.infoImage.titleAfterValue = "%";


        this.infoVideo = new VStatus(parentObject);
        this.infoVideo.parent = parentObject;
        this.infoVideo.pos.x = this.infoImage.pos.x;
        this.infoVideo.pos.y = this.infoImage.pos.y+this.infoImage.h1+globalBorderWidth*2;//under infoClient
        this.infoVideo.h1 = this.infoClient.h1;
        this.infoVideo.w1 = this.infoClient.w1;
        this.infoVideo.titleBeforeValue = "video: ";
        this.infoVideo.titleAfterValue = "%";




    }//constructor



    display(){

        this.infoClient.display();
        this.infoImage.display();
        this.infoVideo.display();

        }//display







    }//class clientStatus