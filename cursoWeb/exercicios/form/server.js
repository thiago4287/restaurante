const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.post('/usuarios', (req, resp) => {
    console.log(req.body)
    resp.send('<h1>Parabéns!</h1>')
})

app.get('/usuarios', (req, resp) =>{
    resp.jsonp({nome:'Pedro'})
})

app.listen(3000)