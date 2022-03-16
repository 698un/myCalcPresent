


function srv_addClient(clientKey){

    //define serverIndex
    let serverIndex = getServerIndex();

	//send message to console of server	
	netSystem.computerSet.computer[serverIndex].console.addLog("NEW CLIENT: "+clientKey);
    
	//add client to repository
	netSystem.computerSet.computer[serverIndex].clientRepository.addNewClient(clientKey);
    }

	
function srv_consoleMessage(message){

	
    //define serverIndex
    let serverIndex = getServerIndex();
	
	//send message to console of server	
	netSystem.computerSet.computer[serverIndex].console.addLog(message);

	}//srv_console	



function srv_getClientCount(){
    //define serverIndex
    let serverIndex = getServerIndex();

    //send message to console of server
    return netSystem.computerSet.computer[serverIndex].clientRepository.clientCount;
    }//srv_getClientCount
	
	
//==========SYSTEM METHODS==================================
	
function getServerIndex(){

	
    for (let i=0;i<netSystem.computerSet.computerCount;i++){
        if (netSystem.computerSet.computer[i].ip==serverIP) return i;
        }//next i
	return -1;

	}//getServerIndex	