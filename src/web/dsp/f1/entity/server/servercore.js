


function srv_addClient(clientKey){


    //define serverIndex
    let serverIndex = -1;
    for (let i=0;i<netSystem.computerSet.computerCount;i++){
        if (netSystem.computerSet.computer[i].ip=="serverIP") serverIndex = i;
        }//next i

    if (serverIndex==-1) return;

    netSystem.computerSet.computer[serverIndex].clientRepository.addNewClient(clientKey);
    }