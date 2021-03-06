




class VComputer extends ParentWin{

    constructor(){

        super();
        //this.pos = createVector(width/2,0);
        this.pos.x = 100;//*0+Math.random(300);
        this.pos.y = 200;//*0+Math.random(300);

        this.w1 = 200;
        this.h1 = 300;

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
        this.cmdStart.h1 = this.cmdStart.textSize*1.5;

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

        this.vPanel = new ClientPanel(this);
        this.calcStatus=-1;//Признак что расчет не начат   0,1,2,3

        //display for calcProcess
       // this.calcProcess = new VStatus();

        //CONSOLE
        this.console = new CompConsole(this);
        this.console.pos.y = this.h1-this.console.h1-globalBorderWidth;
        this.console.pos.x =globalBorderWidth;



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


    //methos for listener response
    responseListener(){


        //console.log(this.requestProcess);

        //exit if request not sending
        if (this.requestProcess==false) return;

        //get request for this client
        let myRequest=netSystem.requestSet.getResponseByIP(this.ip);


        //exit if not found
        if (myRequest==null) return;


        //console.log(myRequest.senderIP);

        //verify position this response
        let px = myRequest.pos.x;
        let py = myRequest.pos.y;
        if (this.coordsInRegion(px,py)==false) return;




        //console.log("response back to client");
        //console.log(myRequest.url);
        //console.log(this.active);

        //ACTION IF FOUND RESPONSE



        //console.log(myRequest.url);



        //CLIENTKEY
        if (myRequest.url =="/clientkey" && this.active==false)  {

            this.clientKey = myRequest.responseString.split("=")[1];
            //console.log("getClientKey_toClient:"+this.clientKey);
            this.active = true;
            this.cmdStart.visible = false;
            this.console.addLog("ClientKey received:"+this.clientKey);

            this.calcStatus = 0;//mark as free for new task
            netSystem.requestSet.deleteRequestByIP(this.ip);
            this.requestProcess=false;
            }

        //NEW_TASK
        if (myRequest.url =="/newtask" && this.active==true && this.calcStatus==1)  {


            //VERIFY ERROR
            if (myRequest.responseString.indexOf("ERROR")!=-1) {
                this.console.addLog(myRequest.responseString);

                netSystem.requestSet.deleteRequestByIP(this.ip);//delete from requestSET
                this.requestProcess=false;
                this.calcStatus = -1;//mark as send_resultat
                this.active = false;
                this.cmdStart.visible = true;
                return;
                }


            //this.requestProcess=false;//mark as request is end
            let jsonObject = JSON.parse(myRequest.responseString);

            let calcFrameNum = jsonObject.frame;
            let calcLineNum = jsonObject.line;

            //INFO
            this.vPanel.infoImage.max = 100;
            this.vPanel.infoImage.value = Math.floor((calcLineNum/imageHeight)*1000)/10;

            this.vPanel.infoVideo.max = 100;
            this.vPanel.infoVideo.value = Math.floor((calcFrameNum/videoFrameCount)*1000)/10;


            netSystem.requestSet.deleteRequestByIP(this.ip);//delete from requestSET
            //this.requestProcess=false;
            this.console.addLog("Calculate task["+calcFrameNum+","+calcLineNum+"]...");
            this.console.addLog("Send resultat...");
            this.requestProcess=false;
            send_resultat(this,calcFrameNum,calcLineNum);
            this.calcStatus = 2;//mark as send_resultat
            this.requestProcess=true;
            }


        //resultat
        //if (myRequest.url =="/resultat" && this.active==true && this.calcStatus==2)  {
        if (myRequest.url.indexOf("/resultat/")!=-1 && this.active==true && this.calcStatus==2)  {

            //alert("duration");
            this.requestProcess=false;//mark as request is end

            //VERIFY ERROR
            if (myRequest.responseString.indexOf("ERROR")!=-1) {
                    this.console.addLog(myRequest.responseString);

                    netSystem.requestSet.deleteRequestByIP(this.ip);//delete from requestSET
                    this.requestProcess=false;
                    this.calcStatus = -1;//mark as send_resultat
                    this.active = false;
                    return;
                    }

            let jsonObject = JSON.parse(myRequest.responseString);
            let calcDuration = jsonObject.duration;

            netSystem.requestSet.deleteRequestByIP(this.ip);//delete from requestSET

            //this.console.addLog("send_resultat_complette");
            this.requestProcess=false;
            this.calcStatus = 0;//mark as send_resultat
            this.requestProcess=false;
        }






        //ANYTIME delete this request from netSystem;!!!
        //netSystem.requestSet.deleteRequestByIP(this.ip);
        //this.requestProcess=false;


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

        //draw Process
        if (this.active==true) this.vPanel.display();
        if (this.active==true)this.console.display();



        //drawUI
        this.cmdStart.display();
        this.cmdExit.display();


        //if click START
        if (this.cmdStart.eventMouseDown()) {
            //this.active=true;//mark as process
            send_clientKey(this);
            this.console.addLog("Reguest for ClientKey...");
            //this.calcStatus = 0;
            }

        //if click exit
        if (this.cmdExit.eventMouseDown()) {
            this.onClose = true;
            console.log("close");
            }



     }//display

    update(){
        //Listen response from server
        this.responseListener();

        if (this.calcStatus ==-1) return;




        //if free for task
        if (this.calcStatus==0) {
            this.calcStatus=1;
            send_getNewTask(this);
           // console.log(this.calcStatus);
            }


        }




    }//class VClient