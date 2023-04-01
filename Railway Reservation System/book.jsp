<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
      background-image: url(train.jpg);
      margin:0;
      font-family: Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif;
      background-size: 1350px;
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
            background-color: wheat;
            color: black;
            border-radius:15px;
            opacity: 0.7;
            width:50%;
            height: 50%;
            font-weight: bolder;
            text-indent: 50px;
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
String name = request.getParameter("pname");
String username = request.getParameter("uname");
String gender = request.getParameter("gen");
String age = request.getParameter("age");
String source = request.getParameter("src");
String destination = request.getParameter("dest");
String departure = request.getParameter("dat");
String trainclass = request.getParameter("trainclass");
    try{
        Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","SYSTEM","12345");
        int seatno=1;
        PreparedStatement p = conn.prepareStatement("select max(seatno) from booking4");
        ResultSet rs = p.executeQuery();
        if(rs.next()){
            seatno = rs.getInt(1);
            seatno++;
        PreparedStatement ps = conn.prepareStatement("insert into booking4 values(?,?,?,?,?,?,?,?,?)");
        ps.setInt(1,seatno);
        ps.setString(2,name);
        ps.setString(3,username);
        ps.setString(4,gender);
        ps.setString(5,age);
        ps.setString(6,source);
        ps.setString(7,destination);
        ps.setString(8,departure);
        ps.setString(9,trainclass);
        int x = ps.executeUpdate();
        if(x!=0){
            out.print("Booking done successfully...");
            out.println("<br/><br/>");
            out.print("SEAT NUMBER    : "+seatno);
            out.println("<br/><br/>");
            out.print("NAME           : "+name);
            out.println("<br/><br/>");
            out.print("USERNAME       : "+username);
            out.println("<br/><br/>");
            out.print("GENDER         : "+gender);
            out.println("<br/><br/>");
            out.print("AGE            : "+age);
            out.println("<br/><br/>");
            out.print("SOURCE         : "+source);
            out.println("<br/><br/>");
            out.print("DESTINATION    : "+destination);
            out.println("<br/><br/>");
            out.print("DEPARTURE      : "+departure);
            out.println("<br/><br/>");
            out.print("TRAIN CLASS    : "+trainclass);
            out.println("<br/><br/>");
        }
        else{
            out.print("Something went wrong...");
        }
    }
}
    catch(Exception e){
        out.print(e);
    }
%>