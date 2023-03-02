<!-- Market page for buyer showing only books on sale -->

<%@ page import ="java.sql.*" %>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Final Project - Market page (Kim Ho Jin, 2016314786)</title>
    <link rel="stylesheet" href="css/marketPageStyle.css">
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

    <!-- Connect MySQL database and Execute MySQL statement -->
    <%
      Class.forName("com.mysql.cj.jdbc.Driver");
      Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skku_book_market?" + "user=root&password=rlaghwls1!");
      PreparedStatement pst = conn.prepareStatement("Select * from books where status='sell'");
      ResultSet rs = pst.executeQuery();
    %>

  	<!-- Book List Section Start -->
  	<section class="booklist-section" id="booklist">
  		<div class="container">
  			<div class="row">
          <div class="booklist-img">
  					<div class="img-box"></div>
          </div>

          <div class="section-title">
            <h1>Book List</h1>
          </div>

          <!-- Transfer page -->
          <a href="./buyerMarketPage.jsp" class="btn btn-style">Display all books</a>

          <div class="search-section">
          <!-- Start presenting the list of books on sale at the price set by user through the backend -->
          <form action="buyerSearchFilter.jsp" method="post">
    	    <h4 class="title-control">Minimum Price:</h4>
    	    <input type="number" id="minimum" name="minimum" class="input-control" value="">
    	    <h4 class="title-control">Maximum Price:</h4>
    	    <input type="number" id="maximum" name="maximum" class="input-control" value="">
    	    <button id="search" class="btn2 btn-style">Search the books</button>
    	    </form>
          <!-- End presenting the list of books on sale at the price set by user through the backend -->
          </div>

          <!-- Table showing all books information on sale in the database -->
          <table id="content-table" class="content-table purchase content">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Status</th>
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
              </tr>
            </tbody>
            <%
              }
            %>
          </table>

          <!-- Tables sorted by specific category -->
          <table id="sort-table" class="content-table purchase sort">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr></tr>
            </tbody>
          </table>

  			</div>
  		</div>
  	</section>
  	<!-- Book List Section End -->

    <!-- Copyright text -->
  	<p class="copyright">&copy; 2022 Kim Ho Jin</p>

  	<script src="js/jquery-3.5.1.min.js"></script>
  	<script src="js/main.js" type="text/javascript"></script>
  	<script src="js/purchase.js" type="text/javascript"></script>
  </body>
</html>
