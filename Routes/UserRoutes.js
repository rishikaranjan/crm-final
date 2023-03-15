import express from "express";
import User from "../Models/UserModel.js";
import bcrypt from 'bcryptjs';
import { isAuth, isAdmin, generateToken } from "../utils.js";



const userRouter = express.Router();



//Login a existing user

userRouter.post(
    '/login',
    async(req, res) => {

      const user = await User.findOne({ email: req.body.email });

      console.log('email:', req.body.email);

      
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }

      res.status(401).send({ message: 'Invalid email or password' });
      
    }

  );


//Sign Up a new user

userRouter.post(
    '/signUp',
    async (req, res) => {

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),

        });

        const user = await newUser.save();

        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });

    }

);


//Get all users

userRouter.get(
  '/',
  isAuth, 
  isAdmin,
  async (req, res) => {

    const users = await User.find({});

    res.send(users);

  }
);



//Get a specific user

userRouter.get(
  '/:id',
  isAuth, 
  isAdmin,
  async (req, res) => {

    const user = await User.findById(req.params.id);

    if(user) {
      res.send(user);
    }

    else {
      res.status(404).send({message: 'User not found'});
    }
    

  }
);


//Update a specific user

userRouter.put(
  '/:id',
  isAuth, 
  isAdmin,
  async(req, res) => {

    const user = await User.findById(req.params.id);

    if(user) {

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);

      const updateUser = await User.save();

      res.send({message: 'User updated', user: updatedUser});

    }

    else {

      res.status(404).send({message: 'User not found'});

    }

  }
);


//Delete specific users

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  async (req, res) => {

    const user = await User.findById(req.params.id);

    if (user) {


      if(user.email === 'r@gmail.com') {

        res.status(400).send({message: 'Cannot delete admin'});

        return ;

      }


      await user.remove();

      res.send({message: 'User is deleted'});

    }

    else {

      res.status(404).send({message: 'User not found'});

    }

  }

);

export default userRouter;