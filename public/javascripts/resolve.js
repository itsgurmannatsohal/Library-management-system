let bookID, bookStatus;
const button1 = document.querySelectorAll(".accept-btn");
const button2 = document.querySelectorAll(".deny-btn");

function acceptId(elem1, elem2, elem3) {
  bookID = elem1;
  bookStatus = elem2;
  enrolmentNumber = elem3;
  console.log(elem1, elem2, elem3);
  postaccept();
}

function denyId(elem1, elem2) {
  bookID = elem1;
  bookStatus = elem2;
  console.log(elem1, elem2);
  postdeny();
}

function postaccept() {
  console.log("Accepted");
  axios.post("/admin/requests/accept", {
    bookID: bookID,
    bookStatus: bookStatus,
    enrolmentNumber: enrolmentNumber,
  });
}

function postdeny() {
  console.log("Denied");
  axios.post("/admin/requests/deny", {
    bookID: bookID,
    bookStatus: bookStatus,
  });
}
