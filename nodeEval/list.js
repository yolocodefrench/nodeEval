class List {
    constructor(){
        this.id = 0;
        this.name = '';
        this.user = 0;
        this.items = [];
    }
}

module.exports.list = function (){
    return new List();
};