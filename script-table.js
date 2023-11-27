document.addEventListener('DOMContentLoaded', function () {
  // Retrieve reports from local storage
  var reports = JSON.parse(localStorage.getItem('reports')) || [];

  // Display reports in the admin page
  var reportList = document.getElementById('reportList');

  if (reports.length === 0) {
      var noReportsItem = document.createElement('li');
      noReportsItem.textContent = 'No reports available.';
      reportList.appendChild(noReportsItem);
  } else {
      reports.forEach(function (report) {
          var listItem = createReportListItem(report);
          reportList.appendChild(listItem);
      });
  }

  function createReportListItem(report) {
      var listItem = document.createElement('li');
      listItem.className = 'reportItem';
      listItem.innerHTML = `
          <strong>Report ID:</strong> ${report.id}<br>
          <strong>Item Name:</strong> ${report.itemName}<br>
          <strong>Item ID:</strong> ${report.itemID}<br>
          <strong>Number of Stocks Damaged:</strong> ${report.numStocksDamaged}<br>
          <button onclick="deleteReport('${report.id}')">Delete Report</button>
      `;
      return listItem;
  }
});

function deleteReport(reportId) {
  // Retrieve reports from local storage
  var reports = JSON.parse(localStorage.getItem('reports')) || [];

  // Find the index of the report with the specified ID
  var index = reports.findIndex(function (report) {
      return report.id === reportId;
  });

  // Remove the report from the array
  if (index !== -1) {
      reports.splice(index, 1);

      // Update local storage
      localStorage.setItem('reports', JSON.stringify(reports));

      // Update the UI
      updateReportList();
  }
}

function updateReportList() {
  var reportList = document.getElementById('reportList');
  reportList.innerHTML = '';

  // Retrieve reports from local storage
  var reports = JSON.parse(localStorage.getItem('reports')) || [];

  if (reports.length === 0) {
      var noReportsItem = document.createElement('li');
      noReportsItem.textContent = 'No reports available.';
      reportList.appendChild(noReportsItem);
  } else {
      reports.forEach(function (report) {
          var listItem = createReportListItem(report);
          reportList.appendChild(listItem);
      });
  }
}

function createReportListItem(report) {
  var listItem = document.createElement('li');
  listItem.className = 'reportItem';
  listItem.innerHTML = `
      <strong>Report ID:</strong> ${report.id}<br>
      <strong>Item Name:</strong> ${report.itemName}<br>
      <strong>Item ID:</strong> ${report.itemID}<br>
      <strong>Number of Stocks Damaged:</strong> ${report.numStocksDamaged}<br>
      <button onclick="deleteReport('${report.id}')">Delete Report</button>
  `;
  return listItem;
}
