const jwt = require("jsonwebtoken");  
const SECRET_KEY = "your_secret_key";
const Tocken_Userr = '';

class Tocken {
    constructor (){
        this.jwt = jwt ,
        this.SECRET_KEY = SECRET_KEY,
        this.Tocken_Userr = Tocken_Userr
    };

    
    Save_Key_Tocken = (ID) => {
        if (!ID) return;
        this.Tocken_Userr = this.jwt.sign({
            ID : ID
        },
            this.SECRET_KEY,{ expiresIn: "1h" }
        );
  
        return this.Tocken_Userr;
    }
}     


module.exports =  Tocken;