        // Function to get data from local storage
        function getDataFromLocalStorage() {
            const data = localStorage.getItem('purchaseLog');
            return data ? JSON.parse(data) : [];
        }

        // Function to save data to local storage
        function saveDataToLocalStorage(data) {
            localStorage.setItem('purchaseLog', JSON.stringify(data));
        }

        // Initialize virtual database from local storage
        let virtualDatabase = getDataFromLocalStorage();

        // Function to render the table body
        function renderTable() {
            const tableBody = document.querySelector("#inventoryTable tbody");
            tableBody.innerHTML = "";

            virtualDatabase.forEach((item, index) => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${item.productName}</td>
                    <td>${item.quantity}</td>
                    <td>${item.supplier}</td>
                    <td>
                        <button onclick="editProduct(${index})">Edit</button>
                        <button onclick="deleteProduct(${index})">Delete</button>
                    </td>
                `;
            });
        }

        // Function to add a new product to the virtual database
        function addProduct(productName, quantity, supplier) {
            virtualDatabase.push({
                productName,
                quantity,
                supplier
            });

            saveDataToLocalStorage(virtualDatabase);
            renderTable();
        }

        // Function to edit a product in the virtual database
        function editProduct(index) {
            const item = virtualDatabase[index];

            // Populate the form with the existing data
            document.getElementById("productName").value = item.productName;
            document.getElementById("quantity").value = item.quantity;
            document.getElementById("supplier").value = item.supplier;

            // Display the modal
            document.getElementById("modal").style.display = "block";

            // Handle the form submission for editing
            document.getElementById("productForm").onsubmit = function (event) {
                event.preventDefault();

                // Update the virtual database with the edited data
                item.productName = document.getElementById("productName").value;
                item.quantity = document.getElementById("quantity").value;
                item.supplier = document.getElementById("supplier").value;

                // Save data to local storage
                saveDataToLocalStorage(virtualDatabase);

                // Hide the modal
                document.getElementById("modal").style.display = "none";

                // Re-render the table
                renderTable();
            };
        }

        // Function to delete a product from the virtual database
        function deleteProduct(index) {
            virtualDatabase.splice(index, 1);

            // Save data to local storage
            saveDataToLocalStorage(virtualDatabase);

            renderTable();
        }

        // Handle the form submission for adding a new product
        document.getElementById("productForm").onsubmit = function (event) {
            event.preventDefault();

            const productName = document.getElementById("productName").value;
            const quantity = document.getElementById("quantity").value;
            const supplier = document.getElementById("supplier").value;

            addProduct(productName, quantity, supplier);

            // Hide the modal
            document.getElementById("modal").style.display = "none";
        };

        // Display the modal when clicking "Add Purchase"
        document.getElementById("addProduct").onclick = function () {
            // Clear the form fields
            document.getElementById("productName").value = "";
            document.getElementById("quantity").value = "";
            document.getElementById("supplier").value = "";

            // Display the modal
            document.getElementById("modal").style.display = "block";
        };

        // Close the modal when clicking the close button (×)
        document.querySelector(".close").onclick = function () {
            document.getElementById("modal").style.display = "none";
        };

        // Close the modal when clicking outside the modal
        window.onclick = function (event) {
            if (event.target == document.getElementById("modal")) {
                document.getElementById("modal").style.display = "none";
            }
        };

        // Initial rendering of the table
        renderTable();