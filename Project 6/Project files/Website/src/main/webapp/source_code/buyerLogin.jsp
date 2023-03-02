<%-- jsp file that performs login operation of buyer in backend --%>

<%@ page import ="java.sql.*" %>

<%
    try{
      // Get email and password value from user input
      String email = request.getParameter("email");
      String password = request.getParameter("password");

      // Connect MySQL database and Execute MySQL statement
      Class.forName("com.mysql.cj.jdbc.Driver");
      Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skku_book_market?" + "user=root&password=rlaghwls1!");
      PreparedStatement pst = conn.prepareStatement("Select * from users where email=? and password=? and userType=?");
      pst.setString(1, email);
      pst.setString(2, password);
      pst.setString(3, "buyer");
      ResultSet rs = pst.executeQuery();

      // Login success
      if (rs.next()) {
        // Store username information in the session
        String name = rs.getString("userName");
        session.setAttribute("user", name);

        // Move to main page for buyer
        out.println("<script>");
        out.println("location.href='buyerMainPage.html'");
        out.println("</script>");
      }
      // Login failure
      else {
        // Alert warning message
        out.println("<script>");
     	  out.println("location.href='buyerRegisterPage.html'");
     	  out.println("alert('Login is fail, Try again!');");
     	  out.println("</script>");
      }
    }
    // Login error
    catch(Exception e){
     // Alert error message
     out.println("<script>");
	   out.println("location.href='buyerRegisterPage.html'");
	   out.println("alert('Invalid format of Login, Try again!');");
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
