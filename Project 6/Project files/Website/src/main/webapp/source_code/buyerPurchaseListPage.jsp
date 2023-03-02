<!-- Page showing a list of books purchased by the buyer -->

<%@ page import ="java.sql.*" %>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Final Project - Purchase List page (Kim Ho Jin, 2016314786)</title>
    <link rel="stylesheet" href="css/listPageStyle.css">
  </head>

  <body>
    <!-- Header Start -->
    <header class="header">
    	<div class="container">
    		<div class="row justify-content-between align-items-center">
    			<div class="brand-name">
    				<a href="buyerMainPage.html">SKKU BOOK MARKET</a>
    			</div>
    			<nav class="nav">
    				<ul>
              <li><a href="./buyerMainPage.html">Home</a></li>
  						<li><a href="./buyerMarketPage.jsp">Market</a></li>
  						<li><a href="./buyerPurchaseListPage.jsp">Purchase List</a></li>
  						<li><a href="#"></a></li>
  						<li><a href="./homePage.html">Logout</a></li>
    				</ul>
    			</nav>
    		</div>
    	</div>
    </header>
    <!-- Header End -->

    <%
      // Get buyer information stored in the session
      String buyer = (String)session.getAttribute("user");

      // Connect MySQL database and Execute MySQL statement
      Class.forName("com.mysql.cj.jdbc.Driver");
      Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skku_book_market?" + "user=root&password=rlaghwls1!");
      PreparedStatement pst = conn.prepareStatement("Select * from books where buyer=?");
      pst.setString(1, buyer);
      ResultSet rs = pst.executeQuery();
    %>

  	<!-- Purchase List Section Start -->
  	<section class="list-section" id="list">
  		<div class="container">
  			<div class="row">
          <div class="list-img">
            <div class="img-box"></div>
          </div>

          <div class="section-title">
            <h1>Purchase List</h1>
          </div>

          <!-- Table showing all purchase information -->
          <table id="content-table" class="content-table content">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Buyer</th>
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
                <td><%=rs.getString("buyer")%></td>
              </tr>
            </tbody>
            <%
            	}
            %>
          </table>

          <!-- Tables sorted by specific category -->
          <table id="sort-table" class="content-table sort">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Buyer</th>
              </tr>
            </thead>

            <tbody>
              <tr></tr>
            </tbody>
          </table>
  			</div>
  		</div>
  	</section>
  	<!-- Purchase List Section End -->

    <!-- Copyright text -->
  	<p class="copyright">&copy; 2022 Kim Ho Jin</p>

  	<script src="js/jquery-3.5.1.min.js"></script>
  	<script src="js/main.js" type="text/javascript"></script>
  </body>
</html>
