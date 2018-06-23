export class Post {
    public user: string = '';
    public box: string = '';
    public time: string = Date.now().toLocaleString('en-US');

    constructor(use: string, b: string, t: string) {
        this.user = use;
        this.box = b;
        this.time = t;
    }
}