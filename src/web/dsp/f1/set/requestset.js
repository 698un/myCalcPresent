
//This class is request repository

class RequestSet{

    constructor(){

        this.requestCount = 0;
        this.request = new Array(1000);
        }//constructor


    addRequest(sender,newRequest){


        let senderIndex = 0;
        for(let i=0;i<netSystem.clientSet.clientCount;i++){
            if (sender.ip==netSystem.clientSet.client[i].ip) senderIndex = i;
            }//next i

        if (netSystem.clientSet.client[senderIndex].requestProcess==true) return;

        //mark sender as waiting of response
        netSystem.clientSet.client[senderIndex].requestProcess = true;

        this.requestCount++;
        this.request[this.requestCount-1] = newRequest;
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




}//class  RequestRepository

