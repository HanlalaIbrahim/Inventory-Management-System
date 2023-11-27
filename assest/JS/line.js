google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Profit', 'Loss'],
    ['2019',  1000,      400],
    ['2020',  1170,      460],
    ['2021',  660,       1020],
    ['2022',  1030,      540],
    ['2023',  1180,      410]
  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}