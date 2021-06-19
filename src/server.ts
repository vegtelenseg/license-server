import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const prisma = new PrismaClient()
const app = express()

app.use(cors())

app.get('/allUsers', async (req, res) => {
  const allUsers = await prisma.user.findMany()
  res.json(allUsers)
})

app.post('/getUserInfo', async (req, res) => {
  const user = await prisma.user.findFirst({
      where: { firstname: 'Siya' }
    }
  )
  res.json(user)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server has started on port: ${PORT}`)
);