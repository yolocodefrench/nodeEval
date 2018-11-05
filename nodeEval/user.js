class User {
    constructeur(){
        this.id = 0;
        this.name = '';
        this.password = '';
    }
    
}

module.exports.user = function () {
    return new User();
};