
class VServer extends ParentWin{


    constructor(){
        super();
        this.w1 = 300;
        this.h1 = 300;
        this.pos.x = width/2-this.w1/2;
        this.pos.y = height/2-this.h1/2;

        this.reposition();

        this.borderWidth = globalBorderWidth;
        this.titleHeight = 20;
        this.titleWidth = this.w1-this.borderWidth*2;
        this.ip = serverIP;

        //репозиторий ключей
        this.clientRepository = new ClientRepository();

        //Image_Repository
        this.imageRep = new ImageRepository();


        //консоль для отображения событий
        this.console = new CompConsole(this);
		
		this.console.pos.x=this.borderWidth;
		this.console.pos.y=this.h1-this.console.h1-this.borderWidth;
		this.console.h1=100;
		
		this.console.addLog("start");


        }



    reposition(){
        this.pos.x = this.pos.x*1.0*width/widthPrev;
        this.pos.y = this.pos.y*1.0*height/heightPrev;

        if (this.pos.x>width)  this.pos.x = width  - this.w1;
        if (this.pos.y>height) this.pos.y = height - this.h1;
        }//reposition


    update(){

        this.requestListener();
		this.clientRepository.clearOldClients();
        }//update


    requestListener(){
        let rX=0;
        let rY=0;
        //defined input requests
        for (let i=0;i<netSystem.requestSet.requestCount;i++){

            //alert("one");
            //if not for server then continue
            if (netSystem.requestSet.request[i].direction != "request") continue;

            rX = netSystem.requestSet.request[i].pos.x;
            rY = netSystem.requestSet.request[i].pos.y;

            //если запрос дошел до сервера
            if (this.coordsInRegion(rX,rY)) mappingRequestByIndex(i);
            }//next request

        }//requestListener




    //METHOD _ SHOW
    display(){

        //if mouse not pressed then cancelled move
        //if (MW_press==false)   this.mouseMove = false;


        //background
        fill(192,192,192);

        noStroke();
        rect(this.pos.x,this.pos.y,this.w1,this.h1);


        //drawTitle
        fill(0,0,255);
        rect(this.pos.x+this.borderWidth, this.pos.y+this.borderWidth,
             this.titleWidth,  this.titleHeight);

        //CAPTION
        fill(255);
        text("SERVER",
             this.pos.x+this.w1/2,
             this.pos.y+this.borderWidth+this.titleHeight/2);

        /*
        text("clientCount="+this.clientRepository.clientCount,
            this.pos.x+this.borderWidth*2,
            this.pos.y+this.borderWidth*2+this.titleHeight);
         */


        //show console of SERVER
		this.console.display();

		this.imageRep.display(this);


        //console.log(this.pos.x+" / "+this.pos.y);

        }//display



}//class VServer






function getRandomHash(len) {
    let number;
    res = "";
    for (let i = 0; i < len; i++) {
        number = 97 + Math.floor(Math.random() * 26);
        res += String.fromCharCode(number);
        //res += String.fromCharCode(97+i);
    }//next i
    return res;
    }//getRandomHash