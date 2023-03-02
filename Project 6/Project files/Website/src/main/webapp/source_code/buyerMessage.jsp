<%-- jsp file that stores message sent by the buyer to the database over the backend --%>

<%@ page import ="java.sql.*" %>

<%
    try{
      // Get name, email and message from user
      String name = request.getParameter("name");
    	String email = request.getParameter("email");
      String message = request.getParameter("message");

      // Error occurs when input is empty
      if ((name.trim() == "") || (email.trim() == "") || (message.trim() == "")) {
        throw new Exception();
      }
      else {
        // Connect MySQL database and Execute MySQL statement
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skku_book_market?" + "user=root&password=rlaghwls1!");
        String sql = "insert into messages(name,email,message)values(?,?,?)";
        PreparedStatement ps = null;
        ps = conn.prepareStatement(sql);
        ps.setString(1, name);
        ps.setString(2, email);
        ps.setString(3, message);
        int i = ps.executeUpdate();

        // Perform success
        if(i != 0) {
          out.println("<script>");
          out.println("location.href='buyerMainPage.html'");
          out.println("</script>");
        }
      }
   }
   // Perform error
   catch(Exception e){
     // Alert error message
	   out.println("<script>");
	   out.println("location.href='buyerMainPage.html'");
	   out.println("alert('Your message is invalid, Try again!');");
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
