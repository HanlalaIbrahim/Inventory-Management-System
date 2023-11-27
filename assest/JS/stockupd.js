function updateStock(itemId) {
    const inputId = `updateInput${itemId}`;
    const stockId = `stock${itemId}`;
    const inputValue = parseInt(document.getElementById(inputId).value);
    const currentStock = parseInt(document.getElementById(stockId).innerText);
    const newStock = currentStock + inputValue;

    if (newStock >= 0) {
        document.getElementById(stockId).innerText = newStock;

        // Update the stock in the Sales Details table
        const salesStockElement = document.getElementById(`sales${itemId}`);
        const salesCurrentStock = parseInt(salesStockElement.innerText);
        const salesNewStock = salesCurrentStock + inputValue;
        salesStockElement.innerText = salesNewStock;
    } else {
        alert("Stock cannot be negative.");
    }
}
function recordSale(itemId) {
    const saleQuantity = parseInt(document.getElementById(`saleQuantity${itemId}`).value);
    const productStockElement = document.getElementById(`stock${itemId}`);
    const currentStock = parseInt(productStockElement.innerText);
    const currentSales = parseInt(document.getElementById(`sales${itemId}`).innerText);

    if (saleQuantity <= currentStock) {
        const newProductStock = currentStock - saleQuantity;
        const newProductSales = currentSales + saleQuantity;
        productStockElement.innerText = newProductStock;

        // Update the sales in the Sales Details table
        const salesStockElement = document.getElementById(`sales${itemId}`);
        const salesCurrentStock = parseInt(salesStockElement.innerText);
        const salesNewStock = salesCurrentStock + saleQuantity;
        salesStockElement.innerText = salesNewStock;
    } else {
        alert("Not enough stock available for the sale.");
    }
}
