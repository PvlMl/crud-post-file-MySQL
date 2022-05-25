class Validation {
   checkAuthorData(req, res, next) {
    const { author, password } = req.body;
    if(author.length < 4) {
        return res.status(400).send("Author name length cannot be shorter than 4 characters");
    }
    if(author.password < 4) {
        return res.status(400).send("Password length cannot be shorter than 4 characters");
    }
    if((author.length != author.trim().length) || author.includes(" ")) {
     return res.status(400).send("Author name cannot contain a space");
    }
       next();
   }
}

module.exports = new Validation();