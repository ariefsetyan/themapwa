
jQuery(document).ready(function() {
	var pieChartDiv = $("#pieChartDiv");
	var myPieChart = new Chart(pieChartDiv, {
		type: 'pie',
		data: {
			labels: ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"],
			datasets: [
			{
				data: [21,39, 10, 14,16],
				backgroundColor: [
					"#FF6384",
					"#4BC0C0",
					"#FFCE56",
					"#E7E9ED",
					"#36A2EB"
				]
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Pie Chart'
			},
			responsive: true,
			maintainAspectRatio: false,
		}
	});
	
	var barChartDiv = $("#barChartDiv");

	var statusData = {
		label: 'Latihan',
		data: [37, 43, 44, 33, 36],
		backgroundColor: [
			"#FF6384",
			"#4BC0C0",
			"#FFCE56",
			"#E7E9ED",
			"#36A2EB"
		]
	};

	var barChart = new Chart(barChartDiv, {
	  type: 'bar',
	  data: {
		labels: ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"],
		datasets: [statusData]
	  }
	});
	
	
	var lineChartDiv = $("#lineChartDiv");

	var statusData = {
		label: 'Latihan',
		data: [37, 43, 44, 33, 36],
		backgroundColor: [
			"#FF6384"
		],
		lineTension: 0,
		fill: false,
		borderColor: 'orange',
		backgroundColor: 'transparent',
		borderDash: [5, 5],
		pointBorderColor: 'orange',
		pointBackgroundColor: 'rgba(255,150,0,0.5)',
		pointRadius: 5,
		pointHoverRadius: 10,
		pointHitRadius: 30,
		pointBorderWidth: 2,
		pointStyle: 'rectRounded'
	};
	
	var lineChart = new Chart(lineChartDiv, {
	  type: 'line',
	  data: {
		labels: ["Januari", "Februari", "Maret", "April", "Mei"],
		datasets: [statusData]
	  }
	});
	
	
});