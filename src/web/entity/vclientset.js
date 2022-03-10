

class ClientSet{

    constructor(){
        this.clientCount = 0;
        this.client = new Array(100);
        this.addClient();

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
        for (let i=0;i<this.clientCount-1;i++){

            if (this.client[this.clientCount-1].pos.x==this.client[i].pos.x &&
                this.client[this.clientCount-1].pos.y==this.client[i].pos.y) equalsOther=true;
            }//next oldClient


        if (equalsOther) {
            this.clientCount--;
            return;
            }



        console.log("newClient "+this.clientCount);
        }//addClient


    //DISPLAY_METHOD
    display(){

        this.clearCloseClient();

        for (let i=0;i<this.clientCount;i++){
            this.client[i].display();
            }//next i

        //console.log("draw clientRep");

        }//display


    clearCloseClient(){

        for (let i=0;i<this.clientCount;i++){
            if (this.client[i].onClose) {
                this.client[i]=this.client[this.clientCount-1];
                this.clientCount--;
                }

            }//next i

        }//clearCloseClient




    }//class ClientRepository