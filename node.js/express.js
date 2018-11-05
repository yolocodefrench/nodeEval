const app = require('express')()


function loggerMiddleware(req, res, next) {
    console.log(`New request received : [${req.method}]`)
    next()
}

app.use(loggerMiddleware)
app.get('/', (req, res) => {
    console.log("yolo")
    res.send('Hello World !')
})




app.listen(9999, () => {
    console.log('App listening on port 9999')
})