import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response)=>{

    /*const user = User.build({
        name: "sadsda",
        age: "5"   
    })
    await user.save()*/

    let users = await User.findAll();
    
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Naruto',
        lastName: 'Uzumaki',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};

export const novoUsuario = async (req:Request,res:Response) =>{

    let name = req.body.name
    let age = req.body.age

    if(name && age){
        const newUser = User.build({
            name,
            age
        })

        await newUser.save()
    }

    res.redirect('/')

}