// Function for switching login and sign-up screen
let container = document.getElementById("container")

toggle = () => {
  container.classList.toggle("login")
  container.classList.toggle("sign-up")
}
setTimeout(() => {
  container.classList.add("login")
}, 200)


$(document).ready(function(){
  // In the inital stage, the sorting table is hidden
  $(".sort").hide();

  // Sort table by the value in the specific column
  $("#content-table th").each(function(column) {
    $(this).click(function() {
      // If it was ascending, switch to descending order
      if($(this).is(".asc")) {
        $(this).removeClass("asc");
        $(this).addClass("desc");
        sortdir=-1;
      }
      // If it was descending, switch to ascending order
      else {
        $(this).addClass("asc");
        $(this).removeClass("desc");
        sortdir=1;
      }

      $(this).siblings().removeClass("asc");
      $(this).siblings().removeClass("desc");

      var rec = $("#content-table").find("tbody>tr").get();

      rec.sort(function (a, b) {
        var val1 = $(a).children("td").eq(column).text();
        var val2 = $(b).children("td").eq(column).text();
        // Sort characters
        if(isNaN(val1 - val2)) {
          val1 = val1.toUpperCase();
          val2 = val2.toUpperCase();
        }
        // Sort numbers
        else {
          val1 = parseInt(val1, 10);
          val2 = parseInt(val2, 10);
        }
        return (val1<val2)?-sortdir:(val1>val2)?sortdir:0;
      });

      // Move data to the sort table to prevent overlapping expressions
      $.each(rec, function(index, row) {
        $(".content").hide();
        $(".sort").show();
        $("#sort-table tbody").append(row);
      });
    });
  });

  // Sort table by the value in the specific column
  $("#sort-table th").each(function(column) {
    $(this).click(function() {
      // If it was ascending, switch to descending order
      if($(this).is(".asc")) {
        $(this).removeClass("asc");
        $(this).addClass("desc");
        sortdir=-1;
      }
      // If it was descending, switch to ascending order
      else {
        $(this).addClass("asc");
        $(this).removeClass("desc");
        sortdir=1;
      }

      $(this).siblings().removeClass("asc");
      $(this).siblings().removeClass("desc");

      var rec = $("#sort-table").find("tbody>tr").get();

      rec.sort(function (a, b) {
        var val1 = $(a).children("td").eq(column).text();
        var val2 = $(b).children("td").eq(column).text();
        // Sort characters
        if(isNaN(val1 - val2)) {
          val1 = val1.toUpperCase();
          val2 = val2.toUpperCase();
        }
        // Sort numbers
        else {
          val1 = parseInt(val1, 10);
          val2 = parseInt(val2, 10);
        }
        return (val1>val2)?-sortdir:(val1<val2)?sortdir:0;
      });

      // Reflect the sort information in the table
      $.each(rec, function(index, row) {
        $("#sort-table tbody").append(row);
      });
    });
  });
});

// Function to get purchase information stored in the session storage
function purchaseInfo() {
  let title = sessionStorage.getItem("title");
  let seller = sessionStorage.getItem("seller");
  let price = sessionStorage.getItem("price");

  document.getElementById("title").value = title;
  document.getElementById("seller").value = seller;
  document.getElementById("price").value = price;
}
