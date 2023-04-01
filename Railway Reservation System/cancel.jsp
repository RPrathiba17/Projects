<%@ page import = "java.sql.*"%>
<%

String name = request.getParameter("pname");
    try{
        Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","SYSTEM","12345");
        Statement st = conn.createStatement();
        PreparedStatement ps = conn.prepareStatement("delete from booking4 where name=?");
        ps.setString(1,name);
        int x = ps.executeUpdate();
        if(x!=0){
            response.sendRedirect("cancel.html");
        }
        else{
            out.print("Something went wrong...");
        }
    }
    catch(Exception e){
        out.print(e);
    }
%>