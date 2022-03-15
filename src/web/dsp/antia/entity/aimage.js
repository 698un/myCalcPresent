
let deep = 255;


class AImage extends Region{
	
	
	constructor(inpResolution,
				inpAntia){

		super();

		this.setSize(10,10);
		this.pos.x = 50;
		this.pos.y = 50;
		this.resolution=inpResolution;
		this.antia =inpAntia;
		this.cnv = createGraphics(this.resolution,
			                      this.resolution);

		this.cnv.noStroke();
		this.displayLineNum = -1;

		this.reset();

		}//constructor

	getRealPosX(){return this.pos.x;}
	getRealPosY(){return this.pos.y;}


	reset(){

		this.scanLine = new Array(this.resolution);


		for (let i=0;i<this.resolution;i++){
			this.scanLine[i]=new PixelLine(this.resolution);
			}


		if (this.cnv.width!= this.w1 ||
		    this.cnv.height!= this.h1) {
			this.cnv.resizeCanvas(windowWidth, windowHeight);
			//this.cnv.noSmooth();
			}
		this.cnv.noStroke();

		//console.log("RESET_ACTION");
		//console.log(this.cnv.width+" / "+this.cnv.height);


		}//reset



	display(){


		//image(this.cnv,   			  this.pos.x,this.pos.y,			  this.w1,this.h1);

		//номер строки которую перерисовываем
		this.displayLineNum++;
		if (this.displayLineNum>this.resolution-1) this.displayLineNum=0;

		let j=this.displayLineNum;

		let xe1 = 0;
		let ye1 = 0;
		let w2 = 0;
		let h2 = 0;

		w2 = this.w1/this.resolution;
		h2 = this.h1/this.resolution;

		ye1 = h2*j;
		this.cnv.noStroke();
		for (let i=0;i<this.resolution;i++){

			if (this.scanLine[j].complette==false) this.scanLine[j].reCalc(j,this.antia);

    	    xe1 = i*w2;
			this.cnv.fill(this.scanLine[j].pixel[i]);
			//this.cnv.stroke(this.scanLine[j].pixel[i]);
			this.cnv.rect(xe1,ye1,w2,h2);
			}//next i

		image(this.cnv,this.pos.x,this.pos.y);

		}//display



		
	//method recalc image	
	update(){
		
	/*
		for (let ye=0;ye<this.resolution;ye++){

			if (this.scanLine[ye].complette==false) {
				this.scanLine[ye].reCalc(ye,this.antia);
				//this.rePaintCanvas();
				break;
				}
			}//next ye
*/
		//this.rePaintCanvas();

		}//update





/*
	rePaintCanvas() {

		this.cnv.loadPixels();
		for (let ye = 0; ye < this.resolution; ye++) {

			if (this.scanLine[ye].complette) {

				for (let xe = 0; xe < this.resolution; xe++) {
					this.cnv.pixels[xe + ye * this.resolution] = this.scanLine[ye].pixel[xe];
					}//next xe
				}//if scanLine is Complette

			}//nex line

		this.cnv.updatePixels();
		}//rePaintCanvas



 */
	}//AImage
	
	
	
	
class PixelLine{

	constructor(inpLength){
		this.complette = false;//признак что строка расчитана
		this.resolution = inpLength;
		this.pixel = new Array(this.resolution);
		for (let i=0;i<this.resolution;i++) this.pixel[i]=127;
		}//constructor

	reCalc(inpYe,antiaValue){

		let ye = inpYe;
		let cSum=0;

		for (let xe = 0;xe<this.resolution;xe++){

			if (antiaValue<=1) this.pixel[xe]=this.getColor(xe,ye);

			if (antiaValue>1) {
				cSum=0;
				for (let tx=0;tx<antiaValue;tx++){
     		    for (let ty=0;ty<antiaValue;ty++){
     		    	cSum+=this.getColor(xe+tx/antiaValue,ye+ty/antiaValue);
				}
				}

				this.pixel[xe]=cSum/antiaValue/antiaValue;


				}//antiaEnabled

		}//next xe

		this.complette = true;
		}


	getColor(rx,ry){

		let s=  sqrt(
			      sq(rx-this.resolution/2)+
			      sq(ry-this.resolution/2)
		          );

		if (s<this.resolution*0.45) return 0;
		return 255;

		}//getColor


	}//class PixelLine


	
	
function colorByDeep(value){
	
	let currentColor=new MyColor();

	}//colorByDeep	