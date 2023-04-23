// this is the front-end code
// this is DOM manipulation
// use the axios call

const allEmployeesFilter = document.getElementById('allEmployees')
const departmentFilter = document.getElementById('departmentFilter')

let totalEmployees = document.querySelector('#totalEmployees')

let totalSalaryExpense = document.querySelector('#totalSalaryExpense')





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

new Chart('myChart', {
  type: 'bar',
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {display: false}
  }
})

// GRAPH STUFF ENDS

    })
    .catch(function (error) {
      // Handle any errors here
      console.error(error);
    });
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
console.log(totalSalaryCalc)

// EmployementStatus == "Active"
totalEmployees.innerText = 'Total Active Employees: ' + response.data.filter(data => data.EmploymentStatus == 'Active').length

totalSalaryExpense.innerText = 'Total Salary Expense: ' + totalSalaryCalc.toLocaleString('en-US', {style: 'currency', currency: 'USD'})

// GRAPH STUFF STARTS

    // code to construct the bar chart
    let exceedsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Exceeds').length
    console.log(exceedsCount)
    let fullyMeetsCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Fully Meets').length
    console.log(fullyMeetsCount)
    let needsImprovementCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'Needs Improvement').length
    console.log(needsImprovementCount)
    let pipCount = response.data.filter(data => data.EmploymentStatus == 'Active' && data.PerformanceScore == 'PIP').length
    console.log(pipCount)

    let xValues = ['Exceeds', 'Fully Meets', 'Needs Improvement', 'PIP']
    let yValues = [exceedsCount, fullyMeetsCount, needsImprovementCount, pipCount]
    let barColors = ['blue', 'green', 'yellow', 'red']
    
    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        title: {display: false}
      }
    })

// GRAPH STUFF ENDS


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
    
    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        title: {display: false}
      }
    })

// GRAPH STUFF ENDS



  })
  .catch(error => {
    // handle any errors
  })
}
})

