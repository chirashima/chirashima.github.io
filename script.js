// this is the front-end code
// this is DOM manipulation
// use the axios call

const allEmployeesFilter = document.getElementById('allEmployees')
const departmentFilter = document.getElementById('departmentFilter')

let totalEmployees = document.querySelector('#totalEmployees')

let totalSalaryExpense = document.querySelector('#totalSalaryExpense')

const config = {
  displayModeBar: false
}




// Preload all the data using an axios call
function getData() {
  axios.get('http://localhost:3001/employees')
    .then(function (response) {
      // Handle the response data here
      let totalSalaryCalc = response.data.reduce((acc, employee) => {
        if (employee.EmploymentStatus == 'Active') {
            return acc + parseInt(employee.Salary)
        }
        return acc
    }, 0)

    // EmployementStatus == "Active"
    totalEmployees.innerText = 'Total Active Employees: ' + response.data.filter(data => data.EmploymentStatus == 'Active').length

    totalSalaryExpense.innerText = 'Total Salary Expense: ' + totalSalaryCalc.toLocaleString('en-US', {style: 'currency', currency: 'USD'})

    //const data = response.data

    // code to construct the bar chart
    let exceedsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Exceeds').length
    console.log(exceedsCount)
    let fullyMeetsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Fully Meets').length
    console.log(fullyMeetsCount)
    let needsImprovementCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Needs Improvement').length
    console.log(needsImprovementCount)
    let pipCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'PIP').length
    console.log(pipCount)

// GRAPH STUFF STARTS
let xValues = ['Exceeds', 'Fully Meets', 'Needs Improvement', 'PIP']
let yValues = [exceedsCount, fullyMeetsCount, needsImprovementCount, pipCount]
let barColors = ['blue', 'green', 'yellow', 'red']


var trace1 = {
  x: xValues,
  y: yValues,
  type: 'bar'
}

var data = [trace1];

var layout = {
  width: 700,
  height: 300,
  margin: {
    l: 40,
    r: 40,
    b: 40,
    t: 20,
    pad: 0
  }
}

Plotly.newPlot('myChart', data, layout, config);

// GRAPH STUFF ENDS

// PIE STUFF STARTS
// code to filter data by termination reasons
let anotherPositionCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'Another position').length
let attendanceCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'attendance').length
let careerChangeCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'career change').length
let hoursCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'hours').length
let maternityCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'maternity leave - did not return').length
let medicalCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'medical issues').length
let militaryCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'military').length
let moreMoneyCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'more money').length
let relocationCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'relocation out of area').length
let retiringCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'retiring').length
let schoolCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'return to school').length
let unhappyCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'unhappy').length


let xValuesPie = ['Another Position', 'Attendance', 'Career Change', 'Hours', 'Maternity Leave - Did Not Return', 'Medical Issues', 'Military', 'Pay', 'Relocation Out of Area', 'Retiring', 'Return to School', 'Unhappy']
let yValuesPie = [anotherPositionCount, attendanceCount, careerChangeCount, hoursCount, maternityCount, medicalCount, militaryCount, moreMoneyCount, relocationCount, retiringCount, schoolCount, unhappyCount]
let barColorsPie = ['#1170aa', '#fc7d0b', '#a3acb9', '#57606c', '#5fa2ce', '#c85200', '#7b848f', '#a3cce9', '#ffbc79', '#c8d0d9', '#ff9da7', '#edc948']


var pieData = [{
  values: yValuesPie,
  labels: xValuesPie,
  type: 'pie'
}];

var pieLayout = {
  width: 700,
  height: 400,
  margin: {
    l: 40,
    r: 40,
    b: 40,
    t: 20,
    pad: 0
  }
}

Plotly.newPlot('myPieChart', pieData, pieLayout, config);

// PIE STUFF ENDS

    })

}





// this is my code block to return values for a specific department
// instead of the event being click, the event is change
departmentFilter.addEventListener('change', async() => {
  //let response = await axios.get('http://localhost:3001/employees')
  const selectedDepartment = departmentFilter.value

if(selectedDepartment == 'all') {
  let response = await axios.get('http://localhost:3001/employees')
  let totalSalaryCalc = response.data.reduce((acc, employee) => {
    if (employee.EmploymentStatus == 'Active') {
        return acc + parseInt(employee.Salary)
    }
    return acc
}, 0)


// EmployementStatus == "Active"
totalEmployees.innerText = 'Total Active Employees: ' + response.data.filter(data => data.EmploymentStatus == 'Active').length

totalSalaryExpense.innerText = 'Total Salary Expense: ' + totalSalaryCalc.toLocaleString('en-US', {style: 'currency', currency: 'USD'})



    // code to construct the bar chart
    let exceedsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Exceeds').length
    
    let fullyMeetsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Fully Meets').length
    
    let needsImprovementCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Needs Improvement').length
    
    let pipCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'PIP').length
    



// GRAPH STUFF STARTS
let xValues = ['Exceeds', 'Fully Meets', 'Needs Improvement', 'PIP']
let yValues = [exceedsCount, fullyMeetsCount, needsImprovementCount, pipCount]
let barColors = ['blue', 'green', 'yellow', 'red']

var trace1 = {
  x: xValues,
  y: yValues,
  type: 'bar'
}

var data = [trace1];

var layout = {
  width: 700,
  height: 300,
  margin: {
    l: 40,
    r: 40,
    b: 40,
    t: 20,
    pad: 0
  }
}


Plotly.react('myChart', data, layout);





// PIE STUFF STARTS
// code to filter data by termination reasons
let anotherPositionCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'Another position').length
let attendanceCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'attendance').length
let careerChangeCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'career change').length
let hoursCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'hours').length
let maternityCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'maternity leave - did not return').length
let medicalCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'medical issues').length
let militaryCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'military').length
let moreMoneyCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'more money').length
let relocationCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'relocation out of area').length
let retiringCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'retiring').length
let schoolCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'return to school').length
let unhappyCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'unhappy').length


let xValuesPie = ['Another Position', 'Attendance', 'Career Change', 'Hours', 'Maternity Leave - Did Not Return', 'Medical Issues', 'Military', 'Pay', 'Relocation Out of Area', 'Retiring', 'Return to School', 'Unhappy']
let yValuesPie = [anotherPositionCount, attendanceCount, careerChangeCount, hoursCount, maternityCount, medicalCount, militaryCount, moreMoneyCount, relocationCount, retiringCount, schoolCount, unhappyCount]
let barColorsPie = ['#1170aa', '#fc7d0b', '#a3acb9', '#57606c', '#5fa2ce', '#c85200', '#7b848f', '#a3cce9', '#ffbc79', '#c8d0d9', '#ff9da7', '#edc948']


var pieData = [{
  values: yValuesPie,
  labels: xValuesPie,
  type: 'pie'
}];

var pieLayout = {
  width: 700,
  height: 400,
  margin: {
    l: 40,
    r: 40,
    b: 40,
    t: 20,
    pad: 0
  },
  textposition: 'inside'
}

Plotly.react('myPieChart', pieData, pieLayout);


// PIE STUFF ENDS


}

else if(selectedDepartment != 'all'){
  axios.get('http://localhost:3001/employees', {
    params: {
      category: selectedDepartment
    }
  })
  .then(response => {
    // Handle the response data
    let totalSalaryCalc = response.data.reduce((acc, employee) => {
      if (employee.EmploymentStatus == 'Active' && employee.Department == selectedDepartment) {
          return acc + parseInt(employee.Salary)
      }
      return acc
    }, 0)
    //console.log(totalSalaryCalc)

    // EmployementStatus == "Active"
    totalEmployees.innerText = 'Total Active Employees: ' + response.data.filter(data => data.EmploymentStatus == 'Active' && data.Department == selectedDepartment).length

    totalSalaryExpense.innerText = 'Total Salary Expense: ' + totalSalaryCalc.toLocaleString('en-US', {style: 'currency', currency: 'USD'})


// GRAPH STUFF STARTS


    // code to construct the bar chart
    let exceedsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Exceeds' && data.Department == selectedDepartment).length
    console.log(exceedsCount)
    let fullyMeetsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Fully Meets' && data.Department == selectedDepartment).length
    console.log(fullyMeetsCount)
    let needsImprovementCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Needs Improvement' && data.Department == selectedDepartment).length
    console.log(needsImprovementCount)
    let pipCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'PIP' && data.Department == selectedDepartment).length
    console.log(pipCount)



let xValues = ['Exceeds', 'Fully Meets', 'Needs Improvement', 'PIP']
let yValues = [exceedsCount, fullyMeetsCount, needsImprovementCount, pipCount]
let barColors = ['blue', 'green', 'yellow', 'red']

var trace1 = {
  x: xValues,
  y: yValues,
  type: 'bar'
}

var data = [trace1];

var layout = {
  width: 700,
  height: 300,
  margin: {
    l: 40,
    r: 40,
    b: 40,
    t: 20,
    pad: 0
  }
}


Plotly.react('myChart', data, layout);


// GRAPH STUFF ENDS


// PIE STUFF STARTS
// code to filter data by termination reasons
let anotherPositionCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'Another position' && data.Department == selectedDepartment).length
let attendanceCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'attendance' && data.Department == selectedDepartment).length
let careerChangeCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'career change' && data.Department == selectedDepartment).length
let hoursCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'hours' && data.Department == selectedDepartment).length
let maternityCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'maternity leave - did not return' && data.Department == selectedDepartment).length
let medicalCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'medical issues' && data.Department == selectedDepartment).length
let militaryCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'military' && data.Department == selectedDepartment).length
let moreMoneyCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'more money' && data.Department == selectedDepartment).length
let relocationCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'relocation out of area' && data.Department == selectedDepartment).length
let retiringCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'retiring' && data.Department == selectedDepartment).length
let schoolCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'return to school' && data.Department == selectedDepartment).length
let unhappyCount = response.data.filter(data => data.EmploymentStatus == 'Voluntarily Terminated' && data.TermReason == 'unhappy' && data.Department == selectedDepartment).length

//let fullyMeetsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Fully Meets').length
//console.log(fullyMeetsCount)
//let needsImprovementCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Needs Improvement').length
//console.log(needsImprovementCount)
//let pipCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'PIP').length
//console.log(pipCount)



let xValuesPie = ['Another Position', 'Attendance', 'Career Change', 'Hours', 'Maternity Leave - Did Not Return', 'Medical Issues', 'Military', 'Pay', 'Relocation Out of Area', 'Retiring', 'Return to School', 'Unhappy']
let yValuesPie = [anotherPositionCount, attendanceCount, careerChangeCount, hoursCount, maternityCount, medicalCount, militaryCount, moreMoneyCount, relocationCount, retiringCount, schoolCount, unhappyCount]
let barColorsPie = ['#1170aa', '#fc7d0b', '#a3acb9', '#57606c', '#5fa2ce', '#c85200', '#7b848f', '#a3cce9', '#ffbc79', '#c8d0d9', '#ff9da7', '#edc948']

var pieData = [{
  values: yValuesPie,
  labels: xValuesPie,
  type: 'pie'
}];

var pieLayout = {
  width: 700,
  height: 400,
  margin: {
    l: 40,
    r: 40,
    b: 40,
    t: 20,
    pad: 0
  },
  textposition: 'inside'
}

Plotly.react('myPieChart', pieData, pieLayout);

// PIE STUFF ENDS

  })
  .catch(error => {
    // handle any errors
  })
}
})


// Employee search stuff

const button = document.querySelector('button')
const input = document.querySelector('input')

const employeeName = document.getElementById('employeeName')

button.addEventListener('click', async() => {
  let searchInput = input.value
  let response = await axios.get('http://localhost:3001/employees')
  let responseEmployeeName = response.data.filter(data => data.Employee_Name.includes(searchInput))
  console.log(responseEmployeeName)
  let searchResult = responseEmployeeName.map(x => x.Employee_Name)
  employeeName.innerText = `${searchResult}`
})
