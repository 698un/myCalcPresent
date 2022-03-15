
//Класс консоли для вывода сообщений о событиях
//для сервера и клиентов
//наследуемся от Region
//new items insert to begin 
class CompConsole extends Region{


    constructor(parentObject){
		super();
        this.item = new Array(100);
        this.tSize = globalTextSize;
		this.cnv = createGraphics(100,100);
		this.cnv.textAlign(LEFT,TOP);
		
		//colors for visual
		this.backColor = color(0,0,0);
		this.textColor = color(255,255,0);
		
        //clear all item
        for (let i=0;i<this.item.length;i++) this.item[i] = "";
            
		//cteare fild for PARENT NECESALARY	
		this.parent=parentObject;

		//set size by parent;
		this.w1=this.parent.w1-2*this.parent.borderWidth;
		


		
        }//constructor

    //insert new item
    addLog(newMessage){

        //move all item to up
        for (let i=this.item.length-1;i>=1;i--) this.item[i]=this.item[i-1];

        //insert newItem to down
        this.item[0] = newMessage;

        }//addLog

	//resize viewPort if resize console
	reGraphics(){
		//verify size Equals	
		if (this.cnv.width!=this.w1 ||
		    this.cnv.height!=this.h1) this.cnv = createGraphics(this.w1,this.h1);
		
		}//reGraphics



	display(){
		this.reGraphics();//reSize canvas if need
		
		
		//define coords inScreen
		let posX = this.parent.pos.x + this.pos.x;
		let posY = this.parent.pos.y + this.pos.y;
		
		//clear canvas
		this.cnv.background(this.backColor);
		
		//write messages
		this.cnv.fill(this.textColor);
		let ye;
		for (let i=0;i<this.item.length;i++){
			ye = this.h1-this.tSize*(i)-globalBorderWidth;
			this.cnv.text(this.item[i],0,ye);
			
			if (ye<-this.tSize) break;
			
			}//next i

		image(this.cnv,posX,posY);
			
		}//display




	}//class CompConsole