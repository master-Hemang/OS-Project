// Measure performance before code execution
const start = performance.now();

// Your code goes here

// Measure performance after code execution
const end = performance.now();

// Calculate elapsed time in milliseconds
const elapsed = end - start;

// Calculate CPU usage as a percentage of elapsed time
const cpuUsage = (elapsed / 1000) * 100;




var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Watts',
			data: [],
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			borderColor: 'rgba(255, 99, 132, 1)',
			borderWidth: 1
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
});

var ctxPie = document.getElementById('myPieChart').getContext('2d');
var pieChart = new Chart(ctxPie, {
	type: 'pie',
	data: {
		labels: ['Watts', 'Remaining'],
		datasets: [{
			data: [],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
			],
			borderWidth: 1
		}]
	},
	options: {}
});


const canvas = document.getElementById('histogram');
const ctxhist = canvas.getContext('2d');

// set the canvas width and height
canvas.width = 500;
canvas.height = 300;

ctxhist.strokeStyle="blue";

// create a function to draw the histogram
function drawHistogram(values) {
  // clear the canvas
  ctxhist.clearRect(0, 0, canvas.width, canvas.height);

  // calculate the maximum value in the array
  const max = Math.max(...values);

  // set the bar width and gap
  const barWidth = canvas.width / values.length;
  const gap = barWidth * 0.1;

  // loop through the array and draw the bars
  values.forEach((value, index) => {
    const barHeight = (value / max) * canvas.height;
    const x = index * (barWidth + gap);
    const y = canvas.height - barHeight;
    ctxhist.fillRect(x, y, barWidth, barHeight);
  });
}

// set an interval to update the histogram every second
setInterval(() => {
  // generate some random data for the histogram
  const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  drawHistogram(values);
}, 1000);



// let canvas = document.getElementById("myCanvas");
// let ctxn = canvas.getContext("2d");
// let x = 0;
// let y = canvas.height / 2;
// let dx = 5;

// function draw() {
// 	// Clear canvas
// 	ctxn.clearRect(0, 0, canvas.width, canvas.height);

// 	// Draw line
// 	ctxn.beginPath();
// 	ctxn.moveTo(x, y);
// 	x += dx;
// 	y = Math.random() * canvas.height;
// 	ctxn.lineTo(x, y);
// 	ctxn.stroke();

// 	// Repeat every 1000ms (1 second)
// 	setTimeout(draw, 1000);
// }
// draw();



setInterval(function() {
	var watts = Math.floor((cpuUsage+Math.random()) * 1000) + 1;
	var remaining = 1000 - watts;

	chart.data.labels.push('');
	chart.data.datasets[0].data.push(watts);
	chart.update();

	pieChart.data.datasets[0].data = [watts, remaining];
	pieChart.update();
}, 1000);



// const canvas = document.getElementById('histogram');
// const ctx = canvas.getContext('2d');

// // set the canvas width and height
// canvas.width = 500;
// canvas.height = 300;

// // create a function to draw the histogram
// function drawHistogram(values) {
//   // clear the canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // calculate the maximum value in the array
//   const max = Math.max(...values);

//   // set the bar width and gap
//   const barWidth = canvas.width / values.length;
//   const gap = barWidth * 0.1;

//   // loop through the array and draw the bars
//   values.forEach((value, index) => {
//     const barHeight = (value / max) * canvas.height;
//     const x = index * (barWidth + gap);
//     const y = canvas.height - barHeight;
//     ctx.fillRect(x, y, barWidth, barHeight);
//   });
// }

// // set an interval to update the histogram every second
// setInterval(() => {
//   // generate some random data for the histogram
//   const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
//   drawHistogram(values);
// }, 1000);



function formatBytes(bytes) {
    if(bytes < 1024) return bytes + " B";
    else if(bytes < 107374182) return (bytes / 1024).toFixed(2) + " KB";
    else if(bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
    else return (bytes / 1073741824).toFixed(2) + " GB";
  }
  
  function updateTable() {
	var table = document.getElementById("myTable");
	// clear the table
	for(var i = table.rows.length - 1; i > 0; i--) {
	  table.deleteRow(i);
	}
	// add new rows with random data
	var processNames = ["chrome.exe", "explorer.exe", "notepad.exe", "cmd.exe", "taskmgr.exe"];
	for(var i = 0; i < 10; i++) {
	  var row = table.insertRow(-1);
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  var cell4 = row.insertCell(3);
	  var cell5 = row.insertCell(4);
	  var cell6 = row.insertCell(5);
	  var cell7 = row.insertCell(6);
	  cell1.innerHTML = i + 1;
	  cell2.innerHTML = processNames[Math.floor(Math.random() * processNames.length)];
	  cell3.innerHTML = formatBytes(Math.floor(Math.random() * 1073741824));
	  cell4.innerHTML = formatBytes(Math.floor(Math.random() * 1073741824));
	  cell5.innerHTML = "running";
	  cell6.innerHTML = new Date().toLocaleTimeString();
	  cell7.innerHTML = Math.floor(Math.random() * 10);
	}
  }
  
  setInterval(updateTable, 1000);



  var table = document.getElementById("myTable");
var data = [];
for(var i = 1; i < table.rows.length; i++) {
  var row = table.rows[i];
  var pid = row.cells[0].innerHTML;
  var read_bytes = row.cells[2].innerHTML;
  data.push({x: pid, y: read_bytes});
}