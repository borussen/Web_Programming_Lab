<%-- jsp file that reflects upload information to the database through the backend --%>

<%@ page import ="java.sql.*" %>

<%
    try{
      // Get title, description, price of upload book and seller information
    	String title = request.getParameter("title");
    	String description = request.getParameter("description");
    	String priceInfo = request.getParameter("price");
      int price = Integer.parseInt(priceInfo);
      String status = "sell";
      String seller = (String)session.getAttribute("user");

      // Error occurs when information is none
      if ((title.trim() == "") || (description.trim() == "") || (priceInfo.trim() == "")) {
        throw new Exception();
      }
      else {
        // Connect MySQL database and Execute MySQL statement
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skku_book_market?" + "user=root&password=rlaghwls1!");
        String sql = "insert into books(title,description,price,status,seller)values(?,?,?,?,?)";
        PreparedStatement ps = null;
        ps = conn.prepareStatement(sql);
        ps.setString(1, title);
        ps.setString(2, description);
        ps.setInt(3, price);
        ps.setString(4, status);
        ps.setString(5, seller);
        int i = ps.executeUpdate();

        // Perform success
        if(i != 0) {
          out.println("<script>");
          out.println("location.href='sellerSalesListPage.jsp'");
          out.println("</script>");
        }
      }
   }
   // Perform error
   catch(Exception e){
     // Alert error message
	   out.println("<script>");
	   out.println("location.href='sellerUploadPage.html'");
	   out.println("alert('Invalid Format of Update, Try Again!');");
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
