

class ComputerSet{

    constructor(){
        this.computerCount = 0;
        this.computer = new Array(100);

        this.computerCount=1;

        //first in array is SERVER
        this.computer[0] = new VServer();



        this.addComputer();
        this.computerSelectIndex=-1;


        }//constructor


    reposition(){

        for (let i=0;i<this.computerCount;i++){
                //console.log(i+"/"+this.clientCount);
                this.computer[i].reposition();
                }//next i

        }//reposition

    addComputer(){
        this.computerCount++;
        this.computer[this.computerCount-1] = new VComputer();


        //verify oldPositoin

        let equalsOther = false;
        for (let i=1;i<this.computerCount-1;i++){

            if (this.computer[this.computerCount-1].pos.x==this.computer[i].pos.x &&
                this.computer[this.computerCount-1].pos.y==this.computer[i].pos.y) equalsOther=true;
            }//next oldClient


        if (equalsOther) {
            this.computerCount--;
            return;
            }

        //console.log("newComputer "+this.computerCount);
        }//addClient


    drawConnections(){
        let indexServer = 0;
        //defined index of server
        for (let i=1;i<this.computerCount;i++) if (this.computer[i].cmdStart==null) indexServer = i;

        stroke(255,0,0,64);
        strokeWeight(5);
        for (let i=0;i<this.computerCount;i++){
            if (i==indexServer) continue;
            line(this.computer[indexServer].pos.x+this.computer[indexServer].w1/2,
                 this.computer[indexServer].pos.y+this.computer[indexServer].h1/2,
                 this.computer[i].pos.x+this.computer[i].w1/2,
                 this.computer[i].pos.y+this.computer[i].h1/2,
                )
        }//next client

        strokeWeight(1);
    }//drawConnections


    update(){
        for (let i=0;i<this.computerCount;i++) this.computer[i].update();
        }



    //DISPLAY_METHOD
    display(){

        this.clearCloseClient();


        this.mouseControl();

        this.drawConnections();
        for (let i=0;i<this.computerCount;i++){
            this.computer[i].display();
            }//next i
        //console.log("draw clientRep");
        }//display







    getByIP(ipStr){

        for (let i=0;i<this.computerCount;i++){
            if (this.computer[i].ip==ipStr) return this.computer[i];
            }//next i

        return null;
        }//getPosByIP



    mouseControl(){

        if (MW_press==false) {
            this.computerSelectIndex=-1;
            return;
            }


        //признак что кнопку только что нажали
        if (MW_prevPress==false) {

            for (let i=this.computerCount-1;i>=0;i--){
                if (this.computer[i].mouseInRegion() && i<this.computerCount-1) {

                        //смещаем в конец
                        let tmp = this.computer[i];
                        for (let j = i; j < this.computerCount - 1; j++) this.computer[j] = this.computer[j + 1];
                        this.computer[this.computerCount - 1] = tmp;

                    break;
                    }
            }//next i


            }//if click to client




        //если тянем выбранный
        if (this.computerSelectIndex>-1) {

            this.computer[this.computerSelectIndex].pos.x+=(mouseX-pmouseX);
            this.computer[this.computerSelectIndex].pos.y+=(mouseY-pmouseY);

            }//if clientMove



        //если никто не выбран и мыш нажата по заголовку
        if (this.computerSelectIndex==-1 && MW_press==true) {

            for (let i=0;i<this.computerCount;i++){
                if (this.computerSelectIndex==-1 && this.computer[i].mouseInTitle() && MW_prevPress==false) {

                    //смещаем в конец
                    let tmp = this.computer[i];
                    this.computer[i] = this.computer[this.computerCount-1];
                    this.computer[this.computerCount-1]=tmp;
                    this.computerSelectIndex = this.computerCount-1;

                    }
                }//next i

            }//if selectIndex=-1

        }


    clearCloseClient(){

        if (this.computerCount<=1) return;

        for (let i=0;i<this.computerCount;i++){
            if (this.computer[i].onClose) {
                this.computer[i]=this.computer[this.computerCount-1];
                this.computerCount--;
                }

            }//next i

        }//clearCloseComputer




    }//class ComputeSet