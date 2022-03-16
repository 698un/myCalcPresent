
//This class is request repository

class RequestSet{

    constructor(){

        this.requestCount = 0;
        this.request = new Array(1000);
        }//constructor


    addRequest(sender,newRequest){



        newRequest.cookie = sender.clientKey;//Mark clientKey in request


        //поиск отправителя в множестве клиентов
        let senderIndex = 0;
        for(let i=0;i<netSystem.computerSet.computerCount;i++){
            if (sender.ip==netSystem.computerSet.computer[i].ip) senderIndex = i;
            }//next i

        if (netSystem.computerSet.computer[senderIndex].requestProcess==true) return;



        //mark sender as waiting of response
        netSystem.computerSet.computer[senderIndex].requestProcess = true;

        this.requestCount++;
        this.request[this.requestCount-1] = newRequest;



       // console.log("Add Requesst.cookie = "+newRequest.cookie);


        }//addRequest

    update(){

        //console.log("count = "+this.requestCount);
        for (let i= 0;i<this.requestCount;i++) this.request[i].update();
        }//update

    display(){
        //delete lost request
        for (let i= 0;i<this.requestCount;i++){
            if (this.request[i].live==false) {
                this.request[i]=this.request[this.requestCount-1];
                this.requestCount--;
                }
            }//next i

        //display all request
        for (let i=0;i<this.requestCount;i++) this.request[i].display();

        }//delay

    getResponseByIP(ipString){

        for (let i=0;i<this.requestCount;i++){


           // console.log(this.request[i].senderIP);

            if (this.request[i].senderIP==ipString &&
                this.request[i].direction=="response") return this.request[i];
            }//next i
        return null;

        }//getRequestByIP

    //this method deleting request from netSystem
    deleteRequestByIP(ipString){


        //search request
        for (let i=0;i<this.requestCount;i++){
            if (this.request[i].senderIP==ipString) this.request[i].live = false;
            }//next i





        }//deleteRequestByIP




}//class  RequestRepository

