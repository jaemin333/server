import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

//validation and sanitization

const validateTweet = [
    body('text')
    .trim()
    .isLength({min:3})
    .withMessage('text should be at least 3 characters'),
    validate
];

//GET /tweets
//GET/tweets?username:username
router.get('/', isAuth,tweetController.getTweets); //모든 tweet들을 작업하는 과정에서 isAuth를 검사함


//GET /tweets/:id
router.get('/:id',isAuth,tweetController.getTweet);
//POST /tweets
router.post('/',isAuth,validateTweet,tweetController.createTweet);
//PUT /tweets/:id
router.put('/:id',isAuth,validateTweet,tweetController.updateTweet);
//DELETE /tweets/:id
router.delete('/:id', isAuth,tweetController.deleteTweet);

export default router;
