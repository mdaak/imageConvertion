const express = require('express')
const multer = require('multer')
const app = express()
const port = 3000


app.set("view engine",'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + Date.now()+file.filename)
  }
})

const upload = multer({ storage: storage }).single("image")

app.post('/',(req,res)=>{
  upload(req,res,err =>{
    if(err) throw err
    console.log(req.file.path)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})