const { NotFound, Conflict, NotAcceptable } = require('@feathersjs/errors');
const Game = require('../../models/game');
const Exercices = require('../../models/exercice');
const ObjectId = require("bson-objectid");
const dateFormat = require('dateformat');


module.exports = class GameServices {

    constructor(){}

    async get(id){
        try {
            console.log("9e99e3ewe");
            const code = id;
            const game = await Game.findOne({code}).populate('players');
           // console.log(game);
            return game;
        } catch (error) {
        }
    }
    
    async  create(formdata){
        try {
            console.log(`Data: ${formdata.status} & code : ${formdata.code}`);
            let status = formdata.status, code = formdata.code, currentRound = formdata.currentRound;

            let game = await Game.findOne({code}).populate('players');
            if(currentRound > game.round){
                status = "Done";
                currentRound--;
            }
            game.set({status, currentRound});
            await game.save();
            return game;
        } catch (error) {
        //  return res.status(500).json({success: false,msg: `Server error ${error}` })
        }
    }

    async  update(formdata, res){
        try {
            const {code, id} = formdata;
            let game = await Game.findOne({code});
            if(!game){
                var notFound = new NotFound('Game does not exist');
                return notFound;
            }
                    
            game.players.push(id);
            await game.save();
            game = await Game.findOne({code}).populate('players');
            console.log(game);
            return game;
        } catch (error) {
            //return res.status(500).json({success: false,msg: `Server error ${error}` });
        }
    }

    async  find(obj){
        try {
            console.log("dds "+obj.query.code);
            const game = await Game.findOne({code: obj.query.code});
            let repo = [];
            await Exercices.aggregate([
                {
                    $match: {
                        game: ObjectId(game._id),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "player",
                        foreignField: "_id",
                        as: "player"
                    }
                },
                {
                    $unwind: "$player"
                },
                {
                    $lookup: {
                        from: "games",
                        localField: "game",
                        foreignField: "_id",
                        as: "game"
                    }
                },
                {
                    $unwind: "$game"
                },
                {
                    $project: {
                        "currentRound": "$currentRound",
                        "player": "$player._id",
                        "lastname": "$player.lastname",
                        "firstname": "$player.firstname",
                        "totalGooAnswer": {
                            $cond: { if: { $eq: ["$isResolved",true] }, then: '$game.positiveMark', else: 0 }
                        },
                        "totalBadAnswer": {
                            $cond: { if: {$eq: ["$isResolved",false] }, then: '$game.negativeMark', else: 0 }
                        }
                    }
                },
                {
                    $group:{
                        _id: { round: "$currentRound", player: "$player", firstname:"$firstname", lastname: "$lastname"},   totalChecked: { $sum: "$totalGooAnswer" },  totalWorses: { $sum: "$totalBadAnswer" } 
                    } 
                },
                {
                    $group:{
                        _id: {  player: "$_id.player", firstname:"$_id.firstname", lastname: "$_id.lastname"},   score: {$push:{ totalChecked: "$totalChecked", totalWorses: "$totalWorses"}} ,
                        pointForGoodAnswers: { $sum: "$totalChecked" },  pointForBadAnswers: { $sum: "$totalWorses" } 
                    } 
                }   
            ]).exec(function(err, report){
                console.log(report);
                return report;
            })
        } catch (error) {
            //return res.status(500).json({success: false,msg: `Server error ${error}` })
        }
    }
}