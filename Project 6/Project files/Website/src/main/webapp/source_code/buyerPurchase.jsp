<%-- jsp file that reflects purchase information to the database through the backend --%>

<%@ page import ="java.sql.*" %>

<%
    try{
      // Get title, seller information of sold book and buyer information
    	String title = request.getParameter("title");
    	String seller = request.getParameter("seller");
    	String buyer = (String)session.getAttribute("user");

      // Error occurs when information is none
      if ((title.trim() == "") || (seller.trim() == "")) {
        throw new Exception();
      }
      else {
        // Connect MySQL database and Execute MySQL statement
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skku_book_market?" + "user=root&password=rlaghwls1!");
        String sql = "update books set status=?, buyer=? where title=? and seller=?";
        PreparedStatement ps = null;
        ps = conn.prepareStatement(sql);
        ps.setString(1, "sold out");
        ps.setString(2, buyer);
        ps.setString(3, title);
        ps.setString(4, seller);
        int i = ps.executeUpdate();

        // Perform success
        if(i != 0) {
          out.println("<script>");
          out.println("location.href='buyerPurchaseListPage.jsp'");
          out.println("</script>");
        }
      }
   }
   // Perform error
   catch(Exception e){
     // Alert error message
     out.println("<script>");
     out.println("location.href='buyerPurchaseListPage.jsp'");
     out.println("alert('Something is wrong during transaction, Try again!');");
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
