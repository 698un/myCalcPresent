


class ClientRepository{

    
    constructor(){

        this.client = new Array(100);
        this.clientCount = 0;
        }//constructor


    addNewClient(newClientKey){
        this.clientCount++;
        this.client[this.clientCount-1] = new Client();


        this.client[this.clientCount-1].clientKey = newClientKey;
        this.client[this.clientCount-1].lastTimeConnection =tNow;
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

	//method erase old clients from repository
	clearOldClients(){
		
		//acton only every 10 frame
		if (frameCount%10!=0) return;
		
		for (let i=0;i<this.clientCount;i++){
			
			if (this.client[i].lastTimeConnection+clientLifeTime<tNow) {
				
				srv_consoleMessage("DEPRECATE CLIENT: "+this.client[i].clientKey);
				this.client[i]=this.client[this.clientCount-1];
				this.clientCount--;
				}//if client is deprecate
			
			}//next i
		
		
		
		}//clear deprecate clients

	//verify clientKey
	validClientKey(verClientKey){
		
		let index=-1;
		for(let i=0;i<this.clientCount;i++){
			if (this.client[i].clientKey==verClientKey) index=i;
			}//next i		

		if (index==-1) return false;
		
		this.client[i].lastTimeConnection=tNow;
		return true;
		
		}//validClientKey

    }//class ClientRepository





//структора представляещая клиента
class Client{

    constructor(){
        this.clientKey = null;
        this.lastTimeConnection =0;
        }

    }//class Client  (in repository of Server)
