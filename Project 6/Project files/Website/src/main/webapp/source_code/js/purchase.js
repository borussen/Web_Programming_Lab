$(document).ready(function(){
  // Select the book user want to buy from the market list
  $("#content-table tr").click(function(){
    let tr = $(this);
    let td = tr.children();

    let title = td.eq(0).text();
    let seller = td.eq(2).text();
    let price = td.eq(3).text();
    let status = td.eq(4).text();

    // If the book is on sale, proceed to the next step
    if (status == "sell") {
      // Store book information in the session storage
      sessionStorage.setItem("title", title);
      sessionStorage.setItem("seller", seller);
      sessionStorage.setItem("price", price);
      // Move to purchase page
      window.location.href = "./buyerPurchasePage.html";
    }
  });
});