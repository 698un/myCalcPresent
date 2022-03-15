




class VComputer extends ParentWin{

    constructor(){

        super();
        //this.pos = createVector(width/2,0);
        this.pos.x = 100;//*0+Math.random(300);
        this.pos.y = 200;//*0+Math.random(300);

        this.w1 = 200;
        this.h1 = 150;

        this.borderWidth = globalBorderWidth;
        this.titleHeight = globalTextSize;
        this.titleWidth = this.w1-this.borderWidth*2;
        this.onClose = false;
        this.active = false;//признак активного режима
        this.tSize = 15;

       // this.mouseMove=false;


        //UI_CMDStart
        this.cmdStart = new Cmd();
        this.cmdStart.caption = "START";
        this.cmdStart.parent = this;
        this.cmdStart.pos.y = this.borderWidth+this.titleHeight;
        this.cmdStart.pos.x = this.borderWidth;
        this.cmdStart.w1 = this.w1/2;
        this.cmdStart.h1 = this.cmdStart.textSize;

        this.cmdStart.pos.x = this.w1/2-this.cmdStart.w1/2;
        this.cmdStart.pos.y = this.h1/2-this.titleHeight/2;



        //UI_cmdExit
        this.cmdExit = new Cmd();
        this.cmdExit.parent = this;
        this.cmdExit.w1 = this.titleHeight;
        this.cmdExit.h1 = this.titleHeight;
        this.cmdExit.caption = "X";
        this.cmdExit.pos.x = this.w1-this.borderWidth-this.cmdExit.w1;
        this.cmdExit.pos.y = this.borderWidth;


        //rewidthTitle
        this.titleWidth = this.w1-this.borderWidth*2-this.cmdExit.w1;
        this.clientKey = "none";
        this.ip = createIP();
		
		//признак что происходит запрос
        this.requestProcess = false;

        }//constructor


    reposition(){

        this.pos.x = this.pos.x * width/widthPrev;
        this.pos.y = this.pos.y * height/heightPrev;
        //console.log(this.pos.x+" / "+this.pos.y);

        }//reposition

    getRealPosX(){
        return this.pos.x;
        }
    getRealPosY(){
        return this.pos.y;
        }

    update(){

        //Listen response from server
        this.responseListener();


        }



    responseListener(){

        //exit if request not sending
        if (this.requestProcess==false) return;

        //console.log("wait");


        let myRequest=netSystem.requestSet.getResponseByIP(this.ip);


        //exit if not found
        if (myRequest==null) return;


        //console.log("response is exist");


        //verify position
        let px = myRequest.pos.x;
        let py = myRequest.pos.y;
        if (this.coordsInRegion(px,py)==false) return;


        console.log("response back to client");

        //ACTION IF FOUND RESPONSE
        if (myRequest.url =="/clientkey") {
            this.clientKey = JSON.parse(myRequest.responseString).clientkey;
            console.log("getClientKey_toClient:"+this.clientKey);
            }

        //delete this request from netSystem;
        netSystem.requestSet.deleteRequestByIP(this.ip);
        this.requestProcess=false;


        }//



    //METHOD_OF_SHOW
    display(){

        textSize(this.tSize);
        fill(192,192,192);
        noStroke();

        rect(this.pos.x,this.pos.y,
             this.w1,this.h1);


        //drawTitle
        fill(0,0,255);
        rect(this.pos.x+this.borderWidth, this.pos.y+this.borderWidth,
             this.titleWidth,  this.titleHeight);

        //show wait process
        if (this.requestProcess) {
            let xe = (tMillis*0.1) % this.titleWidth;
            stroke(255);
			strokeWeight(this.borderWidth);
            line(this.pos.x + this.borderWidth + xe,
                 this.pos.y + this.borderWidth,
                 this.pos.x + this.borderWidth + xe,
                 this.pos.y + this.borderWidth + this.titleHeight);

            fill(255,255,0);noStroke();
            text("wait response",this.pos.x + this.borderWidth + this.titleWidth/2,this.pos.y + this.borderWidth + this.titleHeight/2);
            }//if requestProcess



        //drawFon

        if (this.active==false) image(fonClientStart.fonCnv,
                                      this.pos.x+ this.borderWidth,
                                      this.pos.y+  this.borderWidth+this.titleHeight);


        //drawUI
        this.cmdStart.display();
        this.cmdExit.display();


        //if click START
        if (this.cmdStart.eventMouseDown()) {
            this.active=true;//mark as process
            send_clientKey(this);
            }

        //if click exit
        if (this.cmdExit.eventMouseDown()) {
            this.onClose = true;
            console.log("close");
            }

        //if ()



        //console.log(this.pos.x+" / "+this.pos.y);

     }//display



    //==============================REQUEST_  CREATE

    requestClientKeyCreate(){
        let req1=new VRequest();
        req1.ip = this.ip;
        req1.httpType = "GET";
        req1.url = "/clientkey";
        req1.pos.x = this.pos.x+this.w1/2;
        req1.pos.y = this.pos.y+this.h1/2;

        return req1;
        }



    }//class VClient