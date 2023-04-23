This is a class project that features:
- An API call using Axios, with an Express server that stores the data in a JSON
- 2 interactive features: a dropdown filter and a name search textbox

Technical hurdles included:
- Choosing a library to show bar and pie charts. Chart.js had issues with showing old data on mouseover. Plotly isn't as visually nice but does not have that problem
- Calling the right data with the Department dropdown filter. Later I will refactor the code so I can introduce more filters that will interact with each other (e.g., Department and State)
- Making the employee name search work. Fortunately I was able to refer to the Weather API lab for code inspiration