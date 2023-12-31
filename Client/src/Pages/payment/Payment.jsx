import { useState } from "react";
import "./payment.css"; // Import your stylesheet
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const notify = (text) => toast(text);

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const bookArray = location.state.arrayBooking.map((value) => {
    if (value === 1) {
      return 2;
    }
    return value;
  });
  const strArray = `{${bookArray.join(",")}}`;
  console.log(strArray);
  // const modifiedArray = originalArray
  const seatNumbers = location.state.seats;
  const userName = location.state.username;
  console.log(userName);
  const [userData, setUserData] = useState({
    userName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
  });

  const calculateTotal = () => {
    let totalPrice = 0;

    for (let i = 0; i < seatNumbers.length; i++) {
      const seatNumber = seatNumbers[i];

      if (seatNumber >= 81 && seatNumber <= 100) {
        totalPrice += 1000;
      } else {
        totalPrice += 600;
      }
    }

    return totalPrice;
  };
  const postData = async () => {
    try {
      const backendUrl = "http://localhost:8000/payment/";
      const data = {
        username: userName,
        cost: calculateTotal(),
        tickets: location.state.tickets,
        date: location.state.date,
        time: location.state.time,
        movieId: location.state.movieId,
        stringArray: strArray,
      };
      const response = await axios.post(backendUrl, data);
      console.log(response, "backend response");
      response
        ? navigate("/homepage", { state: userName })
        : (notify("Transaction Failed"),
          navigate("/homepage", { state: userName }));
      // ... (other data processing logic)
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  const checkout = () => {
    postData();
  };

  return (
    <div className="Container">
      <form id="paymentForm">
        <div className="column">
          <h3
            style={{
              justifyContent: "center",
              textAlign: "center",
              color: "aliceblue",
              marginTop: "20px",
              marginBottom: "10px",
              fontWeight: 600,
              fontSize: "30px",
            }}
          >
            Cinemate Checkout
          </h3>
          <div className="cards">
            <img src="./images/cards.jpg" alt="aa" />
          </div>
          <div id="totalPriceDisplay" className="totalPriceDisplay">
            Total: Rs{calculateTotal()}
          </div>

          <div className="grid">
            <div className="inputBox">
              <label htmlFor="name">User Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                value={userData.userName}
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
              />
            </div>

            <div className="inputBox">
              <label htmlFor="Tcard">Type of Card:</label>
              <input
                type="text"
                id="Tcard"
                placeholder="Enter card type"
                required
                value={userData.cardType}
                onChange={(e) =>
                  setUserData({ ...userData, cardType: e.target.value })
                }
              />
            </div>
            <div className="inputBox">
              <label htmlFor="cnumber">Card Number:</label>
              <input
                type="text"
                id="cnumber"
                placeholder="1111-2222-3333-4444"
                required
                value={userData.cardNumber}
                onChange={(e) =>
                  setUserData({ ...userData, cardNumber: e.target.value })
                }
              />
            </div>
            <div className="inputBox">
              <label htmlFor="cvv">Card Verification Value:</label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                required
                value={userData.cvv}
                onChange={(e) =>
                  setUserData({ ...userData, cvv: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="Submit_button">
          <button type="button" onClick={checkout}>
            CHECKOUT
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
