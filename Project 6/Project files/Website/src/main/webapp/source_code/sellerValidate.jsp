<%-- jsp file that performs sign-up operation for seller in Backend --%>

<%@ page import ="java.sql.*" %>
<%
    try{
      // Get email, username, password, confirm password value from user input
    	String email = request.getParameter("email");
      String username = request.getParameter("username");
      String password = request.getParameter("password");
      String confirmPassword = request.getParameter("confirm");
      String usertype = "seller";

      // Error occurs when input is empty
      if ((username.trim() == "") || (password.trim() == "") || (confirmPassword.trim() == "")) {
        throw new Exception();
      }
      // Error occurs when the confirm password is not equal to password
      else if (!password.equals(confirmPassword)) {
        throw new Exception();
      }
      else {
        // Connect MySQL database and Execute MySQL statement
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skku_book_market?" + "user=root&password=rlaghwls1!");
        String sql = "insert into users(email,userName,password,userType)values(?,?,?,?)";
        PreparedStatement ps = null;
        ps = conn.prepareStatement(sql);
        ps.setString(1, email);
        ps.setString(2,username);
        ps.setString(3, password);
        ps.setString(4, usertype);
        int i = ps.executeUpdate();

        // Sign-up success
        if(i != 0) {
          out.println("<script>");
          out.println("location.href='sellerRegisterPage.html'");
          out.println("</script>");
        }
        // Sign-up failure
        else {
          // Alert warning message
          out.println("<script>");
          out.println("location.href='sellerRegisterPage.html'");
          out.println("alert('Invalid Sign-Up, Try agin!');");
          out.println("</script>");
         }
      }
    }
   // Sign-up error
   catch(Exception e){
     // Alert error message
	   out.println("<script>");
	   out.println("location.href='sellerRegisterPage.html'");
	   out.println("alert('Invalid format of Sign-Up');");
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
