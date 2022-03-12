


class ClientRepository{

    
    constructor(){

        this.client = new Array(100);
        this.clientCount = 0;
        }//constructor


    addNewClient(newClientKey){
        this.clientCount++;
        this.client[this.clientCount-1] = new Client();


        this.client[this.clientCount-1].clientKey = newClientKey;
        this.client[this.clientCount-1].lastTimeConnection =0;
        }

    deleteClient(oldClientKey){

        //search this client
        let index = -1;
        for(let i=0;i<this.clientCount;i++){
            if (this.client[i].clientKey==oldClientKey) index = i;
            }//next i

        if (index<0) return;//exit if not found

        //delete this client
        this.client[index] = this.client[this.clientCount-1];
        this.clientCount--;
        }


    //method return count of client in clientRepository
    getClientCount(){
        return this.clientCount;
        }



    }//class ClientRepository



class Client{

    constructor(){
        this.clientKey = null;
        this.lastTimeConnection =0;
        }

    }//class Client  (in repository of Server)
