//  config dependencies
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GCLIENT_ID);

const verify = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GCLIENT_ID
    
        })
        const payload = ticket.getPayload();
        return payload
    } catch (err){
        console.error
    }
}


// reference : https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
// https://developers.google.com/identity/sign-in/web/backend-auth?hl=en


router.post('/signIn', async (req, res) => {
    try {
        const googleUser =  await verify(req.body.id_token)
        const userToLogin = await User.findOne({ email: googleUser.email})
        if (userToLogin) {
            console.log(userToLogin);
            req.session.email = userToLogin.email,
            req.session.givenName = userToLogin.givenName,
            req.session.imageUrl= userToLogin.imageUrl,
            req.session.userId = userToLogin._id
            console.log('signIn', req.session);
            return res.status(201).json({message: 'successfully signed in' + userToLogin.givenName, status: 201, email: userToLogin.email, imageUrl: userToLogin.imageUrl})              
        } else {
            //  create a new User
            console.log(googleUser);
            let {email, givenName, googleId, imageUrl} = {
                email: googleUser.email,
                givenName: googleUser.given_name,
                googleId: googleUser.sub,
                imageUrl: googleUser.picture
            }
            const createdUser = await User.create({email, givenName, googleId, imageUrl})
            console.log(createdUser);
            req.session.email = createdUser.email,
            req.session.givenName = createdUser.givenName,
            req.session.imageUrl= createdUser.imageUrl,
            req.session.userId = createdUser._id
            console.log('registered', req.session);
            return res.status(201).json({message: 'successfully signed in' + createdUser.givenName, status: 201, email: createdUser.email, imageUrl: createdUser.imageUrl})              
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(400).json({message: err.message})
        } else {
            return res.status(200).json({message: "Signed out successfuly"})
        }
    })
})


module.exports = router