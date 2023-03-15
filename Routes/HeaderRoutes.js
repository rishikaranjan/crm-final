import express from "express";
import Header from "../Models/HeaderModel.js";
import { isAuth, isAdmin, generateToken } from "../utils.js";


const headerRouter = express.Router();



// headerRouter.get(
//     '/:id',
//     async(req, res) => {

//         const header = await Header.findById(req.params.id);

//         if(header) {
//             res.send(header);
//         }

//         else 
//         {
//         res.status(404).send({ message: 'Header Not Found' });
//         }

//     }
// )


headerRouter.get(
    '/',
    async(req, res) => {

        const header = await Header.find();

        if(header) {
            res.send(header);

        }

        else {

            res.status(404).send({message: 'Header not found'});
    
          }

        

    }
)


headerRouter.post(
    '/',
    isAuth,
    isAdmin,
    async(req, res) => {

        const newHeader = new Header({

            headerImage: '/Images/header__background.png',
            headerTitle: 'The Exotic Lakshadweep Islands',

        });


        const header = await newHeader.save();

        res.send({message: 'Header Created', header});
    }
);




// headerRouter.put(
//     '/',
//     isAuth,
//     isAdmin,
//     async (req, res) => {

//         const header = await Header.find({});

//         if(header) 
//         {
//             header.headerImage = req.body.headerImage;
//             header.headerTitle = req.body.headerTitle;

//             await header.save();

//             res.send({message: 'Header Updated'});

//         }


        
  
//     }
// )



headerRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    async (req, res) => {

        const header = await Header.findById(req.params.id);

        if(header) {

            header.headerImage = req.body.headerImage;
            header.headerTitle = req.body.headerTitle;

            await header.save();

            res.send({message: 'Header Updated'});
        }

        else {

            res.status(404).send({message: 'Header not found'});
    
          }
    }
);



headerRouter.get(
    '/:id', 
    async (req, res) => {

    const header = await Header.findById(req.params.id);

    if (header) 
    {
      res.send(header);
    } 

    else {
      res.status(404).send({ message: 'Header Not Found' });
    }

  }
);



headerRouter.delete(
    '/:id', 
    isAuth, 
    isAdmin, 
    async (req, res) => {
  
      const header = await Header.findByIdAndDelete(req.params.id);
  
    //   if(header) {
  
    //     await header.remove();
  
    //     res.send({message: 'Header is deleted'});
        
    //   }
  
    //   else {
    //     res.status(404).send({message: 'Header not found'});
    //   }
  
    }
  
);

  

export default headerRouter;