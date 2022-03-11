

class ClientSet{

    constructor(){
        this.clientCount = 0;
        this.client = new Array(100);

        this.clientCount=1;

        //first in array is SERVER
        this.client[0] = new VServer();



        this.addClient();
        this.clientSelectIndex=-1;


        }//constructor


    reposition(){

        for (let i=0;i<this.clientCount;i++){
                //console.log(i+"/"+this.clientCount);
                this.client[i].reposition();
                }//next i

        }//reposition

    addClient(){
        this.clientCount++;
        this.client[this.clientCount-1] = new VClient();


        //verify oldPositoin

        let equalsOther = false;
        for (let i=1;i<this.clientCount-1;i++){

            if (this.client[this.clientCount-1].pos.x==this.client[i].pos.x &&
                this.client[this.clientCount-1].pos.y==this.client[i].pos.y) equalsOther=true;
            }//next oldClient


        if (equalsOther) {
            this.clientCount--;
            return;
            }

        console.log("newClient "+this.clientCount);
        }//addClient


    drawConnections(){
        let indexServer = 0;
        //defined index of server
        for (let i=1;i<this.clientCount;i++) if (this.client[i].cmdStart==null) indexServer = i;

        stroke(255,0,0);
        for (let i=0;i<this.clientCount;i++){
            if (i==indexServer) continue;
            line(this.client[indexServer].pos.x+this.client[indexServer].w1/2,
                 this.client[indexServer].pos.y+this.client[indexServer].h1/2,
                 this.client[i].pos.x+this.client[i].w1/2,
                 this.client[i].pos.y+this.client[i].h1/2,
                )
        }//next client
    }//drawConnections


    update(){
        for (let i=0;i<this.clientCount;i++) this.client[i].update();
        }



    //DISPLAY_METHOD
    display(){

        this.clearCloseClient();


        this.mouseControl();

        this.drawConnections();
        for (let i=0;i<this.clientCount;i++){
            this.client[i].display();
            }//next i
        //console.log("draw clientRep");
        }//display







    getByIP(ipStr){

        for (let i=0;i<this.clientCount;i++){
            if (this.client[i].ip==ipStr) return this.client[i];
            }//next i

        return null;
        }//getPosByIP



    mouseControl(){

        if (MW_press==false) {
            this.clientSelectIndex=-1;
            return;
            }


        //признак что кнопку только что нажали
        if (MW_prevPress==false) {

            for (let i=this.clientCount-1;i>=0;i--){
                if (this.client[i].mouseInRegion() && i<this.clientCount-1) {

                        //смещаем в конец
                        let tmp = this.client[i];
                        for (let j = i; j < this.clientCount - 1; j++) this.client[j] = this.client[j + 1];
                        this.client[this.clientCount - 1] = tmp;

                    break;
                    }
            }//next i


            }//if click to client




        //если тянем выбранный
        if (this.clientSelectIndex>-1) {

            this.client[this.clientSelectIndex].pos.x+=(mouseX-pmouseX);
            this.client[this.clientSelectIndex].pos.y+=(mouseY-pmouseY);

            }//if clientMove



        //если никто не выбран и мыш нажата по заголовку
        if (this.clientSelectIndex==-1 && MW_press==true) {

            for (let i=0;i<this.clientCount;i++){
                if (this.clientSelectIndex==-1 && this.client[i].mouseInTitle() && MW_prevPress==false) {

                    //смещаем в конец
                    let tmp = this.client[i];
                    this.client[i] = this.client[this.clientCount-1];
                    this.client[this.clientCount-1]=tmp;
                    this.clientSelectIndex = this.clientCount-1;

                    }
                }//next i

            }//if selectIndex=-1

        }


    clearCloseClient(){

        if (this.clientCount<=1) return;

        for (let i=0;i<this.clientCount;i++){
            if (this.client[i].onClose) {
                this.client[i]=this.client[this.clientCount-1];
                this.clientCount--;
                }

            }//next i

        }//clearCloseClient




    }//class ClientRepository