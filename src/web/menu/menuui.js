

class VMenu{
	
	constructor(){
		
		
		this.minH = globalTextSize*1.25;
		this.maxH = this.minH*2.0;
		
		//количество слайдов
		this.slideCount = 3;
		
		//кнопки переключения слайдов
		this.cmdSlide = new Array(this.slideCount);
			
		for (let i=0;i<this.slideCount;i++){
			this.cmdSlide[i]=new Cmd();
			this.cmdSlide[i].caption="Slide "+(i+1);
			this.cmdSlide[i].pos.y=0;
			this.cmdSlide[i].h1 = this.maxH;
			}//next i
			
		
		this.cmdSlide[0].caption="GamePlay";
		this.cmdSlide[1].caption="Antialiasing";
		
		
		this.vMove=2*globalTextSize;//скорость выплывания

		
		
		}//constructor
	
	
	rePosition(){
		
		let cmdWidth = (width-globalBorderWidth*this.slideCount)/(this.slideCount+1); 
		
		//reSize slideCommand
		for(let i=0;i<this.slideCount;i++){
			this.cmdSlide[i].w1=cmdWidth;
			this.cmdSlide[i].pos.x = cmdWidth*0.5+ i*(cmdWidth+globalBorderWidth);
			}//next i

			
		}//rePositoin
		
		
	display(){
		
		//hideMove
		if (mouseY>this.cmdSlide[0].h1 && this.cmdSlide[0].h1>this.minH) {
			for (let i=0;i<this.slideCount;i++){
				this.cmdSlide[i].h1-=this.vMove*dt*2;
				if (this.cmdSlide[i].h1<this.minH) this.cmdSlide[i].h1=this.minH;
				}//next i
			}//if mouse out	
		
		
		//showMove	
		if (mouseY<this.cmdSlide[0].h1 && this.cmdSlide[0].h1<this.maxH) {
			for (let i=0;i<this.slideCount;i++){
				this.cmdSlide[i].h1+=this.vMove*dt;
				if (this.cmdSlide[i].h1>this.maxH) this.cmdSlide[i].h1=this.maxH;
				}//next i
			}//if mouse out	
		
		//показываем все кнопки 
		for (let i=0;i<this.slideCount;i++) this.cmdSlide[i].display();	
	
		}//display


	mouseEvent(){




		if (this.cmdSlide[0].eventMouseDown()) return "gameplay";
		if (this.cmdSlide[1].eventMouseDown()) return "antia";
		//if (this.cmdSlide[0].eventMouseDown()) return "gameplay";

		return "none"
		}//mouseEvent

		
	
	
	}//class VMenu
	
	
	