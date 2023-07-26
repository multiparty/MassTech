export class Share {
    constructor(private x: string, private y:string, private type:string) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    getShare(){
        return this.x, this.y, this.type;
    }
}