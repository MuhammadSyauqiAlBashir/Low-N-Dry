const port = 3000
const express = require('express')
const router = require('./routers')
const app = express()

// const cors = require('cors')
// app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})