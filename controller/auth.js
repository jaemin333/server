import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js'


export async function signup(req, res) {
    const {username,password,name,email,url} = req.body;
    const found = await userRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message: `${username} already exists`});
    }
    const hashed = await bcrypt.hash(password,config.bcrypt.saltRounds); //bcrypt해쉬를 만듬
    const userId = await userRepository.createUser({
        username,
        password:hashed,
        name,
        email,
        url,

    });
    const token = createJwtToken(userId); //가입된 user에 대해 token을 전송함
    res.status(201).json({token,username}); 
}

export async function login(req,res){
    const {username,password} = req.body;
    const user = await userRepository.findByUsername(username);
    if(!user) {
        return res.status(401).json({message:'Invalid user or password'});
    }
    const isValidPassword = await bcrypt.compare(password,user.password); //패스워드가 일치하는지 확인
    if(!isValidPassword) {
        return res.status(401).json({message: 'Invalid user or pasword'});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token,username}); //로그인에 성공하면 token과 username 전송해줌

}

function createJwtToken(id){
    return jwt.sign({id},config.jwt.secretKey,{expiresIn: config.jwt.expiresInsec,});
}

export async function me (req, res, next) {
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({token: req.token, username: user.username});
}