<!-- Page showing all books among the books sold by the seller -->

<%@ page import ="java.sql.*" %>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Final Project - Sales List page (Kim Ho Jin, 2016314786)</title>
    <link rel="stylesheet" href="css/listPageStyle.css">
  </head>

  <body>
    <!-- Header Start -->
    <header class="header">
    	<div class="container">
    		<div class="row justify-content-between align-items-center">
    			<div class="brand-name">
    				<a href="sellerMainPage.html">SKKU BOOK MARKET</a>
    			</div>
    			<nav class="nav">
    				<ul>
              <li><a href="./sellerMainPage.html">Home</a></li>
  						<li><a href="./sellerSalesListPage.jsp">Sales List</a></li>
  						<li><a href="#"></a></li>
  						<li><a href="./homePage.html">Logout</a></li>
    				</ul>
    			</nav>
    		</div>
    	</div>
    </header>
    <!-- Header End -->

    <%
      // Get user information from the session
      String seller = (String)session.getAttribute("user");

      // Connect MySQL database and Execute MySQL statement
	  Class.forName("com.mysql.cj.jdbc.Driver");
      Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skku_book_market?" + "user=root&password=rlaghwls1!");
      PreparedStatement pst = conn.prepareStatement("Select * from books where seller=?");
      pst.setString(1, seller);
      ResultSet rs = pst.executeQuery();
    %>

  	<!-- Sales List Section Start -->
  	<section class="list-section" id="list">
  		<div class="container">
  			<div class="row">
          <div class="list-img">
  					<div class="img-box"></div>
          </div>

          <div class="section-title">
    				<h1>Sales List</h1>
    			</div>

          <a href="./sellerUploadPage.html" class="btn btn-style">Upload Book for Sell</a>
          <a href="./sellerSalesListFilterPage.jsp" class="btn2 btn-style">Display only books on sold out</a>

          <!-- Table showing sales list information -->
          <table id="content-table" class="content-table content">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Status</th>
                <th>Buyer Information</th>
              </tr>
            </thead>

            <%
              while (rs.next()) {
            %>
            <tbody>
              <tr>
                <td><%=rs.getString("title")%></td>
                <td><%=rs.getString("description")%></td>
                <td><%=rs.getString("seller")%></td>
                <td><%=rs.getInt("price")%></td>
                <td><%=rs.getString("status")%></td>
                <%
                  if (rs.getString("status").equals("sell")) {
                %>
                <td></td>
                <%
                  }
                  else {
                %>
                <td><%=rs.getString("buyer")%></td>
                <%
                  }
                %>
              </tr>
            </tbody>
            <%
            	}
            %>
          </table>

          <!-- Table sorted by specific category -->
          <table id="sort-table" class="content-table sort">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Status</th>
                <th>Buyer Information</th>
              </tr>
            </thead>

            <tbody>
              <tr></tr>
            </tbody>
          </table>

  			</div>
  		</div>
  	</section>
  	<!-- Sales List Section End -->

    <!-- Copyright text -->
  	<p class="copyright">&copy; 2022 Kim Ho Jin</p>

  	<script src="js/jquery-3.5.1.min.js"></script>
  	<script src="js/main.js" type="text/javascript"></script>
  </body>
</html>
