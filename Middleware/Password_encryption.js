
const bcrypt = require('bcrypt');

class Handle_Password {
    hashPassword = async (plainPassword) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    };

    comparePassword = async (plainPassword, hashedPassword) => {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    };
}

module.exports = Handle_Password;