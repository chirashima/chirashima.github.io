// front end code and DOM manipulation, with axios call to data stored in JSON

// setting some global variables to use as filters, in the dropdown in index.html
const allEmployeesFilter = document.getElementById('allEmployees')
const departmentFilter = document.getElementById('departmentFilter')

// setting global variables for total employees and total salary expense, shown on index.html as metrics
let totalEmployees = document.querySelector('#totalEmployees')
let totalSalaryExpense = document.querySelector('#totalSalaryExpense')

// this hides the toolbar on Plotly charts on mouseover
const config = {
  displayModeBar: false
}

// Preload all the data using an axios call
function getData() {
  axios.get('http://localhost:3001/employees')
    .then(function (response) {
      let totalSalaryCalc = response.data.reduce((acc, employee) => {
        if (employee.EmploymentStatus == 'Active') {
          return acc + parseInt(employee.Salary)
          }
        return acc
      }, 0)

      // show only EmployementStatus == "Active"
      totalEmployees.innerText = 'Total Active Employees: ' + response.data.filter(data => data.EmploymentStatus == 'Active').length

      totalSalaryExpense.innerText = 'Total Salary Expense: ' + totalSalaryCalc.toLocaleString('en-US', {style: 'currency', currency: 'USD'})

      // code to construct the values informing the bar chart
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
  const selectedDepartment = departmentFilter.value
  
  // the following code displays data if the selected department in the dropdown filter is "All"
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

  // code to construct the values to inform bar chart
  let exceedsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Exceeds').length
  
  let fullyMeetsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Fully Meets').length
  
  let needsImprovementCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Needs Improvement').length
  
  let pipCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'PIP').length
    
  // GRAPH STUFF STARTS
  let xValues = ['Exceeds', 'Fully Meets', 'Needs Improvement', 'PIP']
  let yValues = [exceedsCount, fullyMeetsCount, needsImprovementCount, pipCount]

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


// the following code displays the data if the selected department in the dropdown filter is a specific department and not "All"
else if(selectedDepartment != 'all'){
  axios.get('http://localhost:3001/employees', {
    params: {
      category: selectedDepartment
    }
  })
  .then(response => {
    let totalSalaryCalc = response.data.reduce((acc, employee) => {
      if (employee.EmploymentStatus == 'Active' && employee.Department == selectedDepartment) {
          return acc + parseInt(employee.Salary)
      }
      return acc
    }, 0)

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

  let xValuesPie = ['Another Position', 'Attendance', 'Career Change', 'Hours', 'Maternity Leave - Did Not Return', 'Medical Issues', 'Military', 'Pay', 'Relocation Out of Area', 'Retiring', 'Return to School', 'Unhappy']
  let yValuesPie = [anotherPositionCount, attendanceCount, careerChangeCount, hoursCount, maternityCount, medicalCount, militaryCount, moreMoneyCount, relocationCount, retiringCount, schoolCount, unhappyCount]


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
  }
})


// Employee search function: search an employee record using a name

const button = document.querySelector('button')
const input = document.querySelector('input')

const employeeName = document.getElementById('employeeName')
const employmentStatus = document.getElementById('employmentStatus')
const terminationReason = document.getElementById('terminationReason')
const departmentStatus = document.getElementById('departmentStatus')

button.addEventListener('click', async() => {
  // using the .toLowerCase method on input value, so the user doesn't have to capitalize properly
  let searchInput = input.value.toLowerCase()
  let response = await axios.get('http://localhost:3001/employees')
  // using the .toLowerCase method on the response data, treating capitalized names as all lower case for search purposes
  let responseEmployeeName = response.data.filter(data => data.Employee_Name.toLowerCase().includes(searchInput))
  console.log(responseEmployeeName)
  let nameSearchResult = responseEmployeeName.map(x => x.Employee_Name)
  let statusSearchResult = responseEmployeeName.map(x => x.EmploymentStatus)
  let departmentSearchResult = responseEmployeeName.map(x => x.Department)
  let terminationSearchResult = responseEmployeeName.map(x => x.TermReason)
  console.log(departmentSearchResult)
  employeeName.innerText = `Name: ${nameSearchResult}`
  employmentStatus.innerText = `Status: ${statusSearchResult}`
  departmentStatus.innerText = `Department: ${departmentSearchResult}`
  terminationReason.innerText = `Termination Reason: ${terminationSearchResult}`
})
