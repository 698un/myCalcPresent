
let deep = 255;


class AImage extends Region{
	
	
	constructor(inpPixelInLine,
				inpAntia){

		super();

		this.setSize(20,20);
		this.pos.x = 50;
		this.pos.y = 50;
		this.pixelInLine=inpPixelInLine;
		this.calcComplette=false;
		this.antia =inpAntia;
		this.cnv = createGraphics(this.pixelInLine,
			                      this.pixelInLine);
		this.cnv.background(255,255,0);

		this.init(this.pixelInLine);

		this.editAntia = new VStatus();this.editAntia.controlEnabled=true;

		this.editPixelInLine = new VStatus();this.editPixelInLine.controlEnabled=true;


		}//constructor



	init(inpNewPixelInLine){
		this.pixelInLine = inpNewPixelInLine;
		this.calcComplette=false;//признак что расчет закончен

		//Create null pixelLine
		this.scanLine = new Array(this.pixelInLine);
		for (let ye=0;ye<this.pixelInLine;ye++)	this.scanLine[ye]=new PixelLine(this.pixelInLine);

		//CreateNullCanvas
		if (this.cnv.width!=this.pixelInLine ||
		    this.cnv.width!=this.pixelInLine) {
			this.cnv = createGraphics(this.pixelInLine,
				                      this.pixelInLine);
			}//canvas ReInit





		}//setPixelCount



	display(){

		image(this.cnv,
   			  this.pos.x,this.pos.y,
			  this.w1,this.h1);

	}//display


		
	//method recalc image	
	reCalc(){
		
		
		for (let ye=0;ye<this.pixelInLine;ye++){
		for (let xe=0;xe<this.pixelInLine;xe++){
			
			}//next xe
			}//next ye

		}//reCalc

	}//AImage
	
	
	
	
class PixelLine{

	constructor(inpLength){
		this.complette = false;//признак что строка расчитана
		this.pixel = new Array(inpLength);
		for (let i=0;i<inpLength;i++) this.pixel[i]=new MyColor();

		}//constructor
	}//class PixelLine
	
class MyColor{
	
	constructor(){
		this.r=255;
		this.g=0;
		this.b=0;	
		}//constructor
	
	}//MyColor	
	
	
function colorByDeep(value){
	
	let currentColor=new MyColor();

	}//colorByDeep	