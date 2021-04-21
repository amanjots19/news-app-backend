const basicUtils = require('../utils/basicUtils');
const User = require('../models/auth');
 const authservices = require('../services/auth')

let newsController = {};

newsController.getNews = async (req,res,next) =>{
    try{
        let data = await basicUtils.fetch("https://server-backend-news.herokuapp.com/");
        console.log(data);
        if(data){
            res.json({
                success: true,
                msg : data
            });
        }
    }
    catch(e){
        throw e;
    }
}
newsController.postSave = async(req,res,next) =>{
    try{
        let insertJson = {}; 
        insertJson['sourcename'] = req.body.sourcename;
        insertJson['email'] = req.body.email;
        let obj = new User(insertJson);
        let data = await authservices.findOne(insertJson.email);
        
        let source = [...data.sourcename,insertJson.sourcename];
        data.sourcename = source;
        let newData = await data.save();
        console.log(newData);
        

    }
    catch(e){
        throw e
    }
}
newsController.postDatafromSourcename = async(req,res,next)=>{
    try{
        let data = await basicUtils.fetch("https://server-backend-news.herokuapp.com/");
        let email = req.body.email;
        let user = await authservices.findOne(email);
        let jsonData = {};
        user.sourcename.forEach(element => {
           let json = data.articles[0].find(element === data.articles.source.name);
            jsonData.element = json;
        });
        console.log(jsonData)
    }
    catch(e){
        throw e
    }
}
module.exports = newsController;