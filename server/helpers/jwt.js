const jwt = require("jsonwebtoken")
const secret  = "individualproject"

class Token {
    static genToken (payload){
        return jwt.sign(payload, secret)
    }
    static verify(token){
        return jwt.verify(token, secret)
    }
}

module.exports = Token