

class AntiaUI{

    constructor(){

        //размер изображений
        this.imgSize = 100;
        this.resolution = 50;


        this.image0 = new AImage(this.resolution,0);
        this.image1 = new AImage(this.resolution,5);


        //UI for repropertyes
        this.editAntia = new VStatus();this.editAntia.controlEnabled=true;
        this.editAntia.min = 1;
        this.editAntia.max = 10;
        this.editAntia.value = this.image1.antia;
        this.editAntia.backColor = color(96,96,96);
        this.editAntia.titleBeforeValue = "Antialiasing: ";
        this.editAntia.titleAfterValue = "";




        this.editResolution = new VStatus();this.editResolution.controlEnabled=true;
        this.editResolution.min = 10;
        this.editResolution.max = 512;
        this.editResolution.value = this.resolution;
        this.editResolution.backColor = color(96,96,96);
        this.editResolution.titleBeforeValue = "Resolution: ";
        this.editResolution.titleAfterValue = " px";


        this.rePosition();//Necesalary


        }//constructor


    rePosition(){

        let imageOldSize = this.image0.w1;

        this.imgSize = height*0.75;//width/2.25;
        //if (height/2.25< this.imgSize) this.imgSize = height/2.25;


        //resizeImages
        this.image0.setSize( this.imgSize,this.imgSize);
        this.image1.setSize( this.imgSize,this.imgSize);

        //repositoin images
        this.image0.pos.x = width/2-this.image0.w1-globalBorderWidth;
        this.image1.pos.x = width/2+globalBorderWidth;


        this.image0.pos.y = globalTextSize*3;
        this.image1.pos.y = this.image0.pos.y;


        this.editAntia.w1 = this.image1.pos.x+this.image1.w1-this.image0.pos.x;
        this.editResolution.w1 = this.editAntia.w1;

        this.editAntia.pos.y = this.image0.pos.y+this.image0.h1+globalBorderWidth;

        this.editResolution.pos.y = this.editAntia.pos.y+this.editAntia.h1+
                                    globalBorderWidth;

        this.editAntia.pos.x = this.image0.pos.x;
        this.editResolution.pos.x = this.editAntia.pos.x;


        if (imageOldSize!=this.image0.w1) {
            this.image0.reset();
            this.image1.reset();
            }

        }//rePosition



    display(){

        this.image0.display();
        this.image1.display();

        this.editAntia.display();
        this.editResolution.display();


        //verify change propertyes  ANTIALIASING
        if (this.editAntia.eventChangeValue()) {
            this.image1.antia = this.editAntia.value;

            for (let i=0;i<this.image1.resolution;i++) this.image1.scanLine[i].complette = false;
            //this.image1.reset();
            }


        //verify change propertyes RESOLUTIOM
        if (this.editResolution.eventChangeValue()) {
            this.image1.resolution = this.editResolution.value;
            this.image0.resolution = this.editResolution.value;
            this.image1.reset();
            this.image0.reset();
            }



      //  this.image0.update();
      //  this.image1.update();


        }//display



}//class antiaUI