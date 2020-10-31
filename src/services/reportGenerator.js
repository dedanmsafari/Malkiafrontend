import jsPDF from "jspdf";

import "jspdf-autotable";

// Date Fns is used to format the dates we receive
// from our API call


//import { format } from "date-fns";

// define a generatePDF function that accepts a rentals argument
const generatePDF = rentals => {

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Name", "Title", "Rate", "RentalFee", "DateReturned"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
 rentals.forEach(rental => {
    const rentalData = [
      rental.customer.name,
      rental.movie.title,
      rental.movie.dailyRentalRate,
      rental.rentalFee,
      // called date-fns to format the date on the ticket
      new Date(rental.dateReturned).toLocaleDateString()
    ];
    // push each tickcet's info into a row
    tableRows.push(rentalData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // rental title. and margin-top + margin-left
  doc.text("Rentals within the last six month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;