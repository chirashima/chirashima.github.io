// this is backend, pull the employee data in here


const express = require('express')
const cors = require('cors')

const employees = require('./HRDataset_v14.js')
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())

app.get('/employees', employees.getEmployees)

app.listen(PORT, function (err) {
    if (err) console.log(err)
    console.log("server listening on PORT", PORT)
})