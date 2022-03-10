


class NetSystem{



    constructor(){

        this.clientRep = new ClientRepository();
        this.server = new VServer();

        }//constructor

    reposition(){
        this.server.reposition();
        this.clientRep.reposition();

        }

    display(){

        this.server.display();
        this.clientRep.display();


        }//display





}//class NetSystem