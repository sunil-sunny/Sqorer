const express = require("express");
const router = express.Router();
const Team = require("../../models/team");
const User = require("../../models/user");



//Allow user to add member in his team
router.get('/:id', async (req, res) =>{
    try {
        
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).json({msg: `We can't find any correspondance, Please sign out then sign in`});
        const team = await Team.findOne({owner: req.params.id});
        return res.json(team);
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
})

//Allow user to add member in his team
router.put('/:id', async (req, res) =>{
    try {
        
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).json({msg: `We can't find any correspondance, Please sign out then sign in`});
        
        const team = await Team.findOne({owner: req.params.id});
        if(!user)
            return res.status(404).json({msg: `We can't find any correspondance, Please create a team before`});
        
        const {members} = req.body;

        members.map(item=>{
            team.members.push(item);
        })
        
        await team.save();
        return res.json(team);
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
})

//Create Team
router.post('/:id', async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).json({msg: `We can't find any user, Please sign out<br>Then sign in..<br>Sorry for this issue.`});
        
        let team = await Team.findOne({owner: req.params.id});
        const owner = req.params.id;
        if(!team){
            const {name, profile} = req.body;
            team = new Team({name, profile, owner});
        }else{
            const {name, profile} = req.body;
            team.set({name, profile});
        }
        await team.save();
        return res.json(team);
    } catch (error) {
        console.log(`${error}`);
        return res
        .status(500)
        .json({msg: `Server error ${error}` });
    }
})

module.exports = router;