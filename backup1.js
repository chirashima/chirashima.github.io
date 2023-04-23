// this is the front-end code
// this is DOM manipulation
// use the axios call

const allEmployeesFilter = document.getElementById('allEmployees')
const departmentFilter = document.getElementById('departmentFilter')

let totalEmployees = document.querySelector('#totalEmployees')

let totalSalaryExpense = document.querySelector('#totalSalaryExpense')


function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
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


new Chart("myPie", {
  type: "pie",
  data: {
    labels: xValuesPie,
    datasets: [{
      backgroundColor: barColorsPie,
      data: yValuesPie
    }]
  },
  options: {
    title: {
      display: false,
    }
  }
});

// PIE STUFF ENDS

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



    addData(myChart, xValues, yValues)
    removeData(myChart)





//    new Chart('myChart', {
//      type: 'bar',
//      data: {
//        labels: xValues,
//        datasets: [{
//          backgroundColor: barColors,
//          data: yValues
//        }]
//      },
//      options: {
//        legend: {display: false},
//        title: {display: false}
//      }
//    })

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


new Chart("myPie", {
  type: "pie",
  data: {
    labels: xValuesPie,
    datasets: [{
      backgroundColor: barColorsPie,
      data: yValuesPie
    }]
  },
  options: {
    title: {
      display: false,
    }
  }
});

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
    
    addData(myChart, xValues, yValues)
    console.log(myChart.data)
    removeData(myChart)

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

// GRAPH STUFF STARTS

let xValuesPie = ['Another Position', 'Attendance', 'Career Change', 'Hours', 'Maternity Leave - Did Not Return', 'Medical Issues', 'Military', 'Pay', 'Relocation Out of Area', 'Retiring', 'Return to School', 'Unhappy']
let yValuesPie = [anotherPositionCount, attendanceCount, careerChangeCount, hoursCount, maternityCount, medicalCount, militaryCount, moreMoneyCount, relocationCount, retiringCount, schoolCount, unhappyCount]
let barColorsPie = ['#1170aa', '#fc7d0b', '#a3acb9', '#57606c', '#5fa2ce', '#c85200', '#7b848f', '#a3cce9', '#ffbc79', '#c8d0d9', '#ff9da7', '#edc948']


new Chart("myPie", {
  type: "pie",
  data: {
    labels: xValuesPie,
    datasets: [{
      backgroundColor: barColorsPie,
      data: yValuesPie
    }]
  },
  options: {
    title: {
      display: false,
    }
  }
});

// PIE STUFF ENDS

  })
  .catch(error => {
    // handle any errors
  })
}
})

