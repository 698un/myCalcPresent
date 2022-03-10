



class FonClientStart {

    constructor(eWidth, eHeight) {

        this.fonCnv = createGraphics(eWidth, eHeight);
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.charactersLength = this.characters.length;
        this.ty = new Array();
        this.xe = 0;
        this.ye = 0;
        this.c = 0;


        this.fonCnv.fill(255, 255, 0);
        this.tw = this.fonCnv.textWidth("W");
        this.lCount = Math.floor(this.fonCnv.width / this.tw);

        for (let i = 0; i < this.lCount; i++) {
            this.ty[i] = Math.random() * this.fonCnv.height
             }//next i


    }//constructor

    update() {

        if (frameCount % 4 != 0) return;//перерисовываем каждый второй кадр


        this.fonCnv.fill(255, 255, 0);
        let c;
        let xe;
        let ye;

        for (let i = 0; i < this.lCount; i++) {

            xe = i * this.tw;
            ye = this.ty[i];
            c = this.characters.charAt(Math.floor(Math.random() * this.charactersLength));
            if (ye <= this.fonCnv.height) this.fonCnv.text(c, xe, ye);
            this.ty[i] = this.ty[i] + this.tw * 1.0;

            if (this.ty[i] > this.fonCnv.height * 1) this.ty[i] = 0;
        }//next i


        this.fonCnv.fill(0, 0, 0, 50);
        this.fonCnv.rect(0, 0, this.fonCnv.width, this.fonCnv.height);


    }//fonUpdate


}//class FonClientStart