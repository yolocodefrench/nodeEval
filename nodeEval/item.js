class Item {
    constructeur(){
        this.id = 0;
        this.label = '';
        this.image = '';
        this.description = '';
    }
    
}

module.exports.item = function () {
    return new Item();
};