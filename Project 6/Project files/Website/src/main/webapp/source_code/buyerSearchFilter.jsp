<!-- jsp file that searches for books on sale based on the price range set by the buyer -->

<%@ page import ="java.sql.*" %>

<%
    try{
      // Get minimum and maximum value from user input
      Integer minimum = Integer.parseInt(request.getParameter("minimum").trim());
      Integer maximum = Integer.parseInt(request.getParameter("maximum").trim());

      // Error occurs when the entered minimum is larger than the entered maximum
      if (minimum > maximum) {
    	 throw new Exception();
      }

      // Store the minimum and maximum information in the session
      session.setAttribute("minimum", minimum);
  	  session.setAttribute("maximum", maximum);

      // Move to search result page
  	  out.println("<script>");
      out.println("location.href='buyerSearchFilterPage.jsp'");
      out.println("</script>");
    }
    // Alert error message
    catch(Exception e){
      out.println("<script>");
      out.println("location.href='buyerMarketFilterPage.jsp'");
      out.println("alert('Invalid format, Try Again!');");
      out.println("</script>");
    }
%>

<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>
</body>
</html>
