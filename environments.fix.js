const fs = require('fs');
const path = require('path');

const dir = "src/environments";
const file = "environment.ts";
const prodFile = "environment.prod.ts";

const content = `${process.env.FIREBASE_DETAILS}`;

fs.access(dir, fs.constants.F_OK, (err) => {
    if(err) {
        fs.mkdir(dir, {recursive:true}, (err) => {if(err) throw err;})
    }
    try{
        fs.writeFileSync(path.join(dir, file), content);
        fs.writeFileSync(path.join(dir, prodFile), content);
        console.log("Created env files.");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})
