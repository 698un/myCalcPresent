

function mappingRequestByIndex(reqIndex){



    let urlString = netSystem.requestSet.request[reqIndex].url;
    let httpType =  netSystem.requestSet.request[reqIndex].httpType;
    let responseStr = "";


    if (urlString=="/clientkey" && httpType=="POST") responseStr = postClientKey();

    if (urlString=="/newtask"   && httpType=="GET") responseStr = getNewTask();



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

function getNewTask(){

    //alert("map_post_clientKey");

    //generate new clientKey
    //let newHash = getRandomHash(10);

    //srv_addClient(newHash);//добавление клиента

    //return '{"clientkey":"'+newHash+'"}';//возврат JSON объекта

    return '{"frame":0,"line":0}';  //dummy newTask

    }//

