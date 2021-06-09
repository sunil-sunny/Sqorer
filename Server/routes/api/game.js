const express = require('@feathersjs/express');
const router = express.Router();
const Game = require('../../models/game');
const Team  = require('../../models/team')
const Exercices = require('../../models/exercice');
const dateFormat = require('dateformat');
const ObjectId = require("bson-objectid");
const nodemailer = require("nodemailer");
const config = require("config");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

router.put('/status', async (req, res) =>{
    try {
        const {status, code} = req.body;
        const game = await Game.findOne({code: code});
        game.set({status});
        await game.save();
        console.log(game);
        return res.json(game);
    } catch (error) {
        return res.status(500).json({success: false,msg: `Server error ${error}` })
    }
}) 

router.post('/send-mail', async  (req, res) => {
    try {
        
        const {emails,type, code} = req.body;

        let to = "";

        emails.map((mail, index)=>{
            console.log(mail)
            if(index === 0)
                to = mail;
            else
                to += `, ${mail}`
        })


        if(type){
            const game = await Game.findOne({code});
            const team = await  Team.findOne({owner:game.teacher})
            
            if(!team)
            return res.json({msg: "Please create a team before"})

            team.members.map((mail, index)=>{
                console.log(mail.email)
                if(index === 0)
                    to = mail.email;
                else
                    to += `, ${mail.email}`
            })
        }


      //get my email and password 
        const userEmail = "fjvm.cj@gmail.com",
        userPassword = "Jolie1963";

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: `${userEmail}`, // email of the app
                pass: `${userPassword}`, // password of the app
            },
        });
        
        let info = await transporter.sendMail({
            from: '"Math Online Game 👻" <fjvm.cj@gmail.com>', // sender address
            to: to, // list of receivers
            subject: "PASSWORD RESET REQUEST ✔", // Subject line
            text: `Please come to play with us. The link of the game is https://sqorer.herokuapp.com/join and then paste the game id: ${req.body.code}` // plain text body                
        });
        return res.json({msg: "Sent"})
    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({ msg: `Server :  ${error}` });
    }
})

//Get all bad answers for a specific user.
router.get('/bad-answers/:game/:player', async (req, res) =>{
    try {
        Exercices.aggregate([
            {
                $match: {
                    game: ObjectId(req.params.game),
                    player: ObjectId(req.params.player),
                    isResolved: false
                },
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
        ]).exec(function(err, exercices){
          //  console.log(invitations);
            return res.json(exercices);
    })
    } catch (error) {
        return res.status(500).json({success: false,msg: `Server error ${error}` })
    }
})

router.get('/:id', async (req, res) =>{
    try {
        const game = await Game.findById(req.params.id);
        console.log(`Game: ${game}`);
        return res.json(game);
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
}) 

router.get('/code/:code', async (req, res) =>{
    try {
        const code = `${req.params.code}`
        const game = await Game.findOne({code}).populate('players');
        return res.json(game);
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
})

//Add player 
router.put('/add/player', async (req, res) =>{
    try {
        const {code, name} = req.body;
        const game = await Game.findOne({code});
        if(!game)
            return res.status(404).json({msg : "We don't find any correspondance"});
        const {mode, expireOn, startAt} = game;
        if(mode === "self paced"){
            const Today =   dateFormat(new Date(), "isoDateTime");
            const lastdayToPlay = dateFormat(expireOn, "isoDateTime");
            if(Today > lastdayToPlay)
                return res.status(409).json({msg: "We are so sorry, this game is already expired. Then you won't be able to play it."});
        }else if(mode === "scheduled"){
            const Today =   dateFormat(new Date(), "isoDateTime");
            const scheduledDate = dateFormat(startAt, "isoDateTime");
            if(Today < scheduledDate)
                return  res.status(409).json({msg: `We are so sorry, this game is not yet available, It's scheduled for ${dateFormat(startAt)}.        Be on time.`})
        }
            
        if(game.status === "Paused" || game.status === "Running")
            return res.status(409).json({msg: "Opsss !   We are sorry. This game is already started"});
        
        return res.json(game);
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
})

//Create a new game
router.post('/', async (req, res) =>{
    try {
        const {data} = req.body;
        const code = await Game.countDocuments() + 1000;
        data.code = code;
        const game = new Game(data);
        console.log(data);
        await game.save();
        return res.json(game);
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
})

//Get results for a specific game 
router.get('/result/:game/:player', async (req, res)=>{
    try {
        
        Exercices.aggregate([
            {
                $match: {
                    game: ObjectId(req.params.game),
                    player: ObjectId(req.params.player)
                },
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
                    "totalGooAnswer": {
                        $cond: { if: { $eq: ["$isResolved",true] }, then: 10, else: 0 }
                    },
                    "totalBadAnswer": {
                        $cond: { if: {$eq: ["$isResolved",false] }, then: '$game.negativeMark', else: 0 }
                    }
                }
            },
            {
                $group:{
                    _id: "$currentRound", totalChecked: { $sum: "$totalGooAnswer" },  totalWorses: { $sum: "$totalBadAnswer" } 
                } 
                
            },
            {
                $sort:{
                    _id: 1
                }
            }
        ]).exec(function(err, invitations){
          //  console.log(invitations);
            return res.json(invitations)
    })
    } catch (error) {
        return res.status(500).json({success: false,msg: `Server error ${error}` })
    }
})


router.get('/live/:code', async(req,res) =>{
    try {
        const game = await Game.findOne({code: req.params.code});
        if(!game)
            return res.status(404).json({});
        Exercices.aggregate([
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
                    _id: {  player: "$_id.player", firstname:"$_id.firstname", lastname: "$_id.lastname"},   score: {$push:{ round: "$_id.round",  totalChecked: "$totalChecked", totalWorses: "$totalWorses"}} ,
                    pointForGoodAnswers: { $sum: "$totalChecked" },  pointForBadAnswers: { $sum: "$totalWorses" } , 
                } ,
            },
            {
                $set: {
                    totalScore: { $subtract: [ "$pointForGoodAnswers", "$pointForBadAnswers"] } 
                }
            },
            {
                $sort : { totalScore : -1} 
            }
        ]).exec(function(err, invitations){
          //  console.log(invitations);
            return res.json(invitations)
        })
    } catch (error) {
        console.log(error);
        //return res.status(500).json({success: false,msg: `Server error ${error}` })
    }
    ///math/MatchOnlineQuiz
})

module.exports = router;
