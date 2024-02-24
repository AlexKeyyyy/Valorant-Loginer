import express from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

app.post('/api', async (req,res) => {

    const {email, name} = req.body

    if (!email || !name) {
        return res.status(400).json({message: 'Email and name required fields.'})
    }
        
    try {
        const createdRaw = await prisma.commonList.create({
            data: {
                email, name
            },

        })
        
        res.json(createdRaw)
    } catch (error) {
        res.status(400).send({message:error})
    }
    
    
    
    //console.log(req.body)
    
})

const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})