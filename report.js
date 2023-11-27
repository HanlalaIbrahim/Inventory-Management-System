function submitReport() {
    var itemName = document.getElementById('itemName').value;
    var itemID = document.getElementById('itemID').value;
    var numStocksDamaged = document.getElementById('numStocksDamaged').value;

    // Validate the number of stocks damaged (you can add more validation if needed)
    if (isNaN(numStocksDamaged) || numStocksDamaged <= 0) {
        alert('Please enter a valid number of stocks damaged.');
        return;
    }

    // Create a unique identifier for the report (you may use a timestamp, random number, etc.)
    var reportId = Date.now().toString();

    // Create a report object
    var report = {
        id: reportId,
        itemName: itemName,
        itemID: itemID,
        numStocksDamaged: numStocksDamaged
    };

    // Save the report to local storage
    var reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));

    alert('Report submitted successfully!');
}
