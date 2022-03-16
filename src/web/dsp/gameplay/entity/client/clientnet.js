



function send_clientKey(sender){
    let newRequest = new VRequest();

    newRequest.httpType = "POST";
    newRequest.senderIP = sender.ip;
    newRequest.url = "/clientkey";

    newRequest.pos.x = sender.pos.x+sender.w1/2;
    newRequest.pos.y = sender.pos.y+sender.h1/2;

    //add to pool of request
    netSystem.requestSet.addRequest(sender,newRequest);
    }//send_clientKey


function send_getNewTask(sender){
    let newRequest = new VRequest();

    newRequest.httpType = "GET";
    newRequest.senderIP = sender.ip;
    newRequest.url = "/newtask";

    newRequest.pos.x = sender.pos.x+sender.w1/2;
    newRequest.pos.y = sender.pos.y+sender.h1/2;

    //add to pool of request
    netSystem.requestSet.addRequest(sender,newRequest);

    }//send_getNewTask

function send_resultat(sender,frameNum,lineNum){
    let newRequest = new VRequest();

    newRequest.httpType = "POST";
    newRequest.senderIP = sender.ip;
    newRequest.url = "/resultat/"+frameNum+"/"+lineNum;
    newRequest.body = "PIXELLINE";

    newRequest.pos.x = sender.pos.x+sender.w1/2;
    newRequest.pos.y = sender.pos.y+sender.h1/2;




    //add to pool of request
    netSystem.requestSet.addRequest(sender,newRequest);

}//send_getNewTask
