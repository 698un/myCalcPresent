

function mappingRequestByIndex(reqIndex){

    let fullRequest = netSystem.requestSet.request[reqIndex];

    let urlString = netSystem.requestSet.request[reqIndex].url;
    let httpType =  netSystem.requestSet.request[reqIndex].httpType;
    let responseStr = "{}";


    //updateLastConnect
    let serverIndex = getServerIndex();
    netSystem.computerSet.computer[serverIndex].clientRepository.updateLastConnect(fullRequest.cookie);




    if (urlString=="/clientkey" && httpType=="POST") responseStr = postClientKey();

    if (urlString=="/newtask"   && httpType=="GET") responseStr = getNewTask(fullRequest.cookie);

    if (urlString.indexOf("/resultat/")==0   && httpType=="POST") responseStr=postResultat(fullRequest);//responseStr = getNewTask();



    //set response to request
    netSystem.requestSet.request[reqIndex].responseString = responseStr;

    //redirection request to client
    netSystem.requestSet.request[reqIndex].direction = "response";

    //alert(urlString+" , "+httpType+" res="+responseStr);


    }//mappingByIndex



function postClientKey(){

    //alert("map_post_clientKey");

    //generate new clientKey
    let newHash = getRandomHash(10);

    srv_addClient(newHash);//добавление клиента
    return '{"clientkey":"'+newHash+'"}';//возврат JSON объекта

    }//

function getNewTask(inpClientKey){

    //define serverIndex
    let serverIndex = getServerIndex();

    //console.log("getNewTask.cookie "+inpClientKey);


    //get EmptyPixeLine from imageRepository
    let emptyPixelLine =  netSystem.computerSet.computer[serverIndex].imageRep.getNewTask(inpClientKey);

    //let responseStr = JSON.strigify(emptyPixelLine);

    let responseStr = '{"frame":'+emptyPixelLine.frame+',"line":'+emptyPixelLine.line+'}';

    srv_consoleMessage("Task["+emptyPixelLine.frame+","+emptyPixelLine.line+"] for "+inpClientKey);
    //console.log(responseStr);
    return responseStr;

    //return '{"frame":0,"line":0}';  //dummy newTask

    }//


function postResultat(request){


    //define serverIndex
    let serverIndex = getServerIndex();


    let duration =  netSystem.computerSet.computer[serverIndex].imageRep.getResultatDuration(request);

    if (duration.constructor==String ) return duration;

    return '{"duration":'+duration+'}';

    }

