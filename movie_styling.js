document.addEventListener("DOMContentLoaded", function () {
    var seats = document.querySelectorAll(".row li");
    var selectedSeatsContainer = document.querySelector(".tickets");
    var bookingButton = document.getElementById("booking");
    var selectedSeatDetails = [];
    var showTimeElements = document.querySelectorAll(".card li");
    var showDateElements = document.querySelectorAll(".month li");
    

    showTimeElements.forEach(function (timeElement) {
        timeElement.addEventListener("click", function () {
            showTimeElements.forEach(function (element) {
                element.classList.remove("selected-time");
            });
            timeElement.classList.add("selected-time");
            updateTicketInfo();
            highlightSelectedTime();

        });
    });
    
    function highlightSelectedTime() {
        var selectedTimeElement = document.querySelector(".card li.selected-time");
        var allTimeElements = document.querySelectorAll(".card li");
    
        allTimeElements.forEach(function (timeElement) {
            timeElement.classList.remove("selected-time-color");
        });
    
        if (selectedTimeElement) {
            selectedTimeElement.classList.add("selected-time-color");
        }
    }

    // Date

    showDateElements.forEach(function (e) {
        e.addEventListener("click", function () {
            showDateElements.forEach(function (element) {
                element.classList.remove("selected-date");
            });
            e.classList.add("selected-date");
            updateTicketInfo();
            highlightSelectedDate();
        });
    });
    
    function highlightSelectedDate() {
        var selectedDateElement = document.querySelector(".month li.selected-date");
        var allDateElements = document.querySelectorAll(".month li");
    
        allDateElements.forEach(function (dateElement) {
            dateElement.classList.remove("selected-date-color");
        });
    
        if (selectedDateElement) {
            selectedDateElement.classList.add("selected-date-color");
        }
    }
    



    seats.forEach(function (seat) {
        seat.addEventListener("click", function () {
            seat.classList.toggle("selected");

            var seatNumber = seat.textContent;
            var selectedTimeElement = document.querySelector(".card li.selected-time");
            var showTime = selectedTimeElement ? selectedTimeElement.textContent : "";
            var seatPrice = calculateSeatPrice(seatNumber);

            if (seat.classList.contains("selected")) {
                selectedSeatDetails.push({ seatNumber: seatNumber, showTime: showTime, seatPrice: seatPrice });
            } else {
                selectedSeatDetails = selectedSeatDetails.filter(function (details) {
                    return !(details.seatNumber === seatNumber && details.showTime === showTime);
                });
            }

            updateTicketInfo();
        });
    });

    bookingButton.addEventListener("click", function () {
        if (selectedSeatDetails.length > 0) {
            var totalCost = selectedSeatDetails.reduce(function (sum, seat) {
                return sum + seat.seatPrice;
            }, 0);

            var bookedSeats = selectedSeatDetails.map(function (details) {
                return "Seat " + details.seatNumber + " at " + details.showTime + " - Rs" + details.seatPrice;
            });

            alert("Seats booked: " + bookedSeats.join(", ") + "\nTotal Cost: Rs" + totalCost);
        } else {
            alert("Please select seats before booking.");
        }
    });
    var monthElements = document.querySelectorAll(".month li");
    monthElements.forEach(function (monthElement) {
        monthElement.addEventListener("click", function () {
            monthElements.forEach(function (element) {
                element.classList.remove("selected-month");
            });
            monthElement.classList.add("selected-month");
            updateTicketInfo();
        });
    });


    function updateTicketInfo() {
        selectedSeatsContainer.innerHTML = "";

        selectedSeatDetails.forEach(function (details) {
            var ticketContainer = document.createElement("div");
            ticketContainer.classList.add("tics");

            var barcodeContainer = document.createElement("div");
            barcodeContainer.classList.add("barcoding");

            var barcodeRow = document.createElement("div");
            barcodeRow.classList.add("bar_card");
            barcodeRow.innerHTML = " <h6>" + getSelectedDate() + "</h6>";
            barcodeContainer.appendChild(barcodeRow);

            var barcodeSeat = document.createElement("div");
            barcodeSeat.classList.add("bar_card");
            barcodeSeat.innerHTML = "<h6>Seat " + details.seatNumber + "</h6><h6>Show Time: " + details.showTime + "</h6><h6>Price: Rs" + details.seatPrice + "</h6>";
            barcodeContainer.appendChild(barcodeSeat);

            var barcodeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            barcodeContainer.appendChild(barcodeSvg);

            var barcodetitle = document.createElement("div");
            barcodetitle.classList.add("bar_card");
            barcodetitle.innerHTML = "<h3>JUMANJI" + "</h3><h3>CINEMATE" + "</h3>";
            barcodeContainer.appendChild(barcodetitle);

            ticketContainer.appendChild(barcodeContainer);

            // Generate a unique barcode depending on the seat number and show time
            var uniqueBarcode = "UniqueBarcode" + details.seatNumber;

            // Append the SVG element to the DOM before rendering the barcode
            selectedSeatsContainer.appendChild(ticketContainer);

            // Render the barcode inside the SVG element
            JsBarcode(barcodeSvg, uniqueBarcode);
        });
    }
    function getSelectedDate() {
        var selectedDateElement = document.querySelector(".month li.selected-date");
        return selectedDateElement ? selectedDateElement.textContent : "";
    }

    function calculateSeatPrice(seatNumber) {
        // Seats 81 to 100 have a price of 1000, while the rest have a price of 600
        return (seatNumber >= 81 && seatNumber <= 100) ? 1000 : 600;
    }

    // function getCurrentDate() {
    //     var today = new Date();
    //     var dd = String(today.getDate()).padStart(2, "0");
    //     var mm = String(today.getMonth() + 1).padStart(2, "0");
    //     var yyyy = today.getFullYear();
    //     return dd + " " + getMonthName(mm) + " " + yyyy;
    // }

    // function updateDateTime() {
    //     var dateElement = document.querySelector(".left_card.title");
    //     var currentDate = new Date();
    //     var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //     var formattedDate = currentDate.toLocaleDateString('en-US', options);
    //     dateElement.textContent = formattedDate;
    // }
    function updateDateTime() {
        var dateElement = document.querySelector(".left_card.title");
        var currentDate = new Date();
        var options = { month: 'long', year: 'numeric' };
        var formattedDate = currentDate.toLocaleDateString('en-US', options);
        dateElement.textContent = formattedDate;
    }
    updateDateTime();


    
    function getMonthName(monthNumber) {
        var months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return months[parseInt(monthNumber) - 1];
    }
    function highlightCurrentDate() {
        var currentDate = new Date();
        var dayOfMonth = currentDate.getDate();
        var allDateElements = document.querySelectorAll('.month li .date');
    
        allDateElements.forEach(function (dateElement) {
            dateElement.classList.remove('h6_active');
            if (dateElement.textContent == dayOfMonth) {
                dateElement.classList.add('h6_active');
            }
        });
    }
    
    updateDateTime();
    highlightCurrentDate();
    
    
    

});
