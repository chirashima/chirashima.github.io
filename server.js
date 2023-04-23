// this is backend, pull the employee data in here


const express = require('express')
const cors = require('cors')


const employees = require('./HRDataset_v14.js')
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())

// Use controllers, like the cats and dogs example. Take all employee data and put it into the controller
//app.get('/employees', (req, res) => {
//    res.send(employees)
//})

app.get('/employees', employees.getEmployees)

app.listen(PORT, function (err) {
    if (err) console.log(err)
    console.log("server listening on PORT", PORT)
})





//app.use(logger('dev'))
// the following middleware comes out of the box with express...
//app.use(express.json())
//app.use(express.urlencoded({ extended: false }))


// Need to display all records at once
// Metrics: show some usual stuff, e.g., 

//app.get('/', (req, res) => {
//    res.send('Welcome!')
//})


// employee count metric


// where would I use this code to get the employee count data I need to show?
//app.get('/employees', employees.getEmployees)

//let count = employees.length

//employeesMetric.innerHTML = "Total count" + count



// code ends here

//app.listen(PORT, () => {
//    console.log(`App listening on port: ${PORT}`)
//})