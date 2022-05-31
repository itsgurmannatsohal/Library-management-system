let bookID;
const button1 = document.querySelectorAll(".checkout-btn");
const button2 = document.querySelectorAll(".checkin-btn");

function checkoutId(elem) {
  bookID = elem;
  console.log(elem);
  postcheckout();
}

function checkinId(elem) {
  bookID = elem;
  console.log(elem);
  postcheckin();
}

function postcheckout() {
  axios
    .post("/dashboard/requestOut", {
      bookID: bookID,
    })
    .then((res) => {
      console.log(res);
      window.location.href = "http://localhost:8080/dashboard";
    });
}

function postcheckin() {
  console.log("post sent");
  axios
    .post("/dashboard/requestIn", {
      bookID: bookID,
    })
    .then((res) => {
      console.log(res);
      window.location.href = "http://localhost:8080/dashboard";
    });
}
