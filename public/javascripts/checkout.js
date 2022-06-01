const button1 = document.querySelectorAll(".checkout-btn");
const button2 = document.querySelectorAll(".checkin-btn");

function checkoutId(elem1, elem2) {
  postcheckout(elem1, elem2);
}

function checkinId(elem) {
  console.log(elem);
  postcheckin(elem);
}

function postcheckout(elem1, elem2) {
  axios
    .post("/dashboard/requestOut", {
      bookID: elem1,
      available: elem2,
    })
    .then((res) => {
      console.log(res);
      window.location.href = "http://localhost:8080/dashboard";
    });
}

function postcheckin(elem) {
  axios
    .post("/dashboard/requestIn", {
      bookID: elem,
    })
    .then((res) => {
      console.log(res);
      window.location.href = "http://localhost:8080/dashboard";
    });
}
