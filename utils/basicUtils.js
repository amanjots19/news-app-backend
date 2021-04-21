const fetch = require('node-fetch');

const basicUtils = {};

basicUtils.fetch = function(apiLink){
    return new Promise(async (resolve,reject)=>{
        try{
            const data = await fetch(apiLink);
            const json = await data.json();
            resolve(json);
        }
        catch(e){
            throw e
        }
    })
}

module.exports = basicUtils;