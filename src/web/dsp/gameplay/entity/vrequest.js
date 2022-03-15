
//скорость сигнала
let vSend = 100;

class VRequest{

    constructor(){
        this.pos = createVector(0,0);
        this.target = createVector(0,0);
        this.v = createVector(0,0);
        this.senderIP = "111.111.111.111";
        this.url = "";
        this.httpType = "NONE";
        this.body = "nobody";
        this.direction = "request";//   "response"
        this.live = true;
        this.tSize = 15;//размер текста
        this.responseString="";
        }//constructor


    update(){

		//define senderObject
        let targetObject = netSystem.computerSet.getByIP(this.senderIP);
        //delete request if client shotdown
        if (targetObject==null) this.live = false;

		//если направление это ЗАПРОС (а не ОТВЕТ)
        if (this.direction=="request") {targetObject =netSystem.computerSet.getByIP(serverIP); }

        //Удаляем если адресат отключился
        if (targetObject==null) this.live = false;


         this.target.x = targetObject.pos.x+targetObject.w1/2;
         this.target.y = targetObject.pos.y+targetObject.h1/2;


        //Defined vector of speed
        this.v.x = this.target.x-this.pos.x;
        this.v.y = this.target.y-this.pos.y;
        this.v.normalize();
        this.v.mult(vSend);

        //move the request
        this.pos.x = this.pos.x+this.v.x*dt;
        this.pos.y = this.pos.y+this.v.y*dt;
        }//update


    display(){

        //ellipse(this.pos.x,this.pos.y,10,10);
        textSize(this.tSize);

        if (this.direction == "request") {
            fill(255,255,0);
            text(this.httpType,
                 this.pos.x,this.pos.y-this.tSize);
            text(this.url,
                 this.pos.x,this.pos.y);
            text(this.body,
                 this.pos.x,this.pos.y+this.tSize);
                 return;
                 }//if direction = request


        if (this.direction == "response") {

                    //console.log("back_response:"+this.responseString);
                    fill(255,255,255);
                    text(this.responseString,
                         this.pos.x,this.pos.y);

                         }//if direction = response



        }//display



    }//class VRequest





//This method generate string IP adres
function createIP(){

    let res = "";

    res+=Math.floor(Math.random()*255)+".";
    res+=Math.floor(Math.random()*255)+".";
    res+=Math.floor(Math.random()*255)+".";
    res+=Math.floor(Math.random()*255);

    //alert(res);
    //console.log("createIP: "+res);
    return res;
    }//createIP