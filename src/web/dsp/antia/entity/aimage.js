



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


		image(this.cnv,this.pos.x,this.pos.y);


		if (this.pointInRegion(mouseX,mouseY)==false) {
			if (frameCount % (this.antia*this.antia) != 0 && this.antia != 0) return;
			}

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
		if (this.scanLine[j].complette==false) this.scanLine[j].reCalc(j,this.antia);
		for (let i=0;i<this.resolution;i++){
    	    xe1 = i*w2;
			this.cnv.fill(colorFromValue(this.scanLine[j].pixel[i]));
			this.cnv.rect(xe1,ye1,w2+1,h2+1);
			}//next i

		//image(this.cnv,this.pos.x,this.pos.y);

		}//display

	}//AImage

function colorFromValue(i){

	let r=sin((i/deep*6.28*3)*0.5+0.5)*255;//*2)%255;
	let g=(sq((deep-i)/deep)*255);//%255;
	let b=(sq((i-deep/2)/deep)*255*2)%255;

/*
	let r=sin((i/deep*6.28*3)*0.5+0.5)*255;//*2)%255;
	let g=(sin((deep-i)/deep*6.28)*0.5+0.5)*255;//%255;
	let b=(sq((i-deep/2)/deep)*255*2)%255;

 */

	return color(r,g,b,255);
	}
	
	
	
	
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

		let cx = 0.08;
		let cy = 0.62;
		let w=0.001;
		let x = cx+(rx/this.resolution-0.5)*w;
		let y = cy+(ry/this.resolution-0.5)*w;

		return ff(x,y);







		}//getColor


	}//class PixelLine

let deep = 1024;

function ff(cx, cy) {

	let x = 0.0;
	let y = 0.0;
	let xx = 0;
	let yy = 0;
	let xy = 0;
	let i = 1;


	while (i<deep && xx + yy <= 9) {
		i++;
		xy = x * y;
		xx = x * x;
		yy = y * y;
		x = xx - yy + cx;
		y = xy + xy + cy;
	}

	if (i>=deep) i=0;

	return i;
}

