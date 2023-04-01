<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
      background-image: url(train.jpg);
      margin:0;
      font-family: Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;
      background-size: 1370px;
    }
* {box-sizing: border-box;}

.navbar{
            overflow:hidden;
            background-color: wheat;   
        }
        .navbar a{
            float: left;
            display: block;
            color: black;  /*text color*/
            text-align: center;
            padding: 20px 40px;
            text-decoration: none;
            font-size: x-large;
        }
        .navbar a:hover{
            background-color: white;
            color: black;
        }
        .navbar a:active{
            background-color: white;
            color: white;
        }
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: white;
        }
        li {
            float: left;
        }
        li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }
        li a:hover:not(.active) {
            background-color: rgb(175, 63, 63);
        }
        .active {
            background-color: #04AA6D;
        }
        .container {
            position: relative;
            padding-top: 60px;
            padding-bottom: 60px;
            color: black;
            border-radius:15px;
            opacity: 0.7;
            width:50%;
            height: 50%;
            font-weight:bolder;
            
            text-align: center;
        }
    </style>
</head>
<body>
  <div class = "navbar">
    <ul> 
    <li><a href="book.html">Booking</a></li>
    <li><a href="popup.html">Cancel</a></li>
    <li style="float:right"><a href="register.html">Register</a></li>
</ul>
</div>
<br><br><br>
<center><div class = "container">
<%@ page import = "java.sql.*"%>
<%
String username = request.getParameter("uname");
String password = request.getParameter("psw");
    try{
        Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","SYSTEM","12345");
        PreparedStatement ps = conn.prepareStatement("insert into registers values(?,?)");
        ps.setString(1,username);
        ps.setString(2,password);
        int x = ps.executeUpdate();
        if(x!=0){
            response.sendRedirect("confirmregister.html");
        }
        else{
            out.print("Something went wrong...");
        }
    }
    catch(Exception e){
        out.print(e);
    }
%>