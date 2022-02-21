const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: UserDB,
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log(" DB Connection Successful!");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );

    app.listen(8080, () =>console.log("Express server is runnig at port no : 3000"));

});//Get students
app.get("/student", (req, res) => {
  mysqlConnection.query("SELECT * FROM student", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.json(rows)
    } else {
      console.log(err);
     
    }
  });
});
//Get a student
app.get("/student/:id", (req, res) => {
    mysqlConnection.query(
      "SELECT * FROM student WHERE id = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });

  //Delete a student
app.delete("/student/:id", (req, res) => {
    mysqlConnection.query(
      "DELETE FROM student WHERE id = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (!err) res.send("Deleted successfully.");
        else console.log(err);
      }
    );
  });

  //Insert a student
app.post('/student', (req, res) => {
    let users = req.body;
    var sql = "SET @id = ?;SET @firstName = ?;SET @secondName = ?;SET @email = ?;SET @project = ?;SET @password = ?; \
    CALL studentAddOrEdit(@id,@firstName,@secondName,@email,@project,@password);";
    mysqlConnection.query(sql, [student.id, student.firstName, student.secondName, student.email, student.project, student.password], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted student id : '+element[0].id);
            });
        else
            console.log(err);
    })
});


//Update a student
app.put('/student', (req, res) => {
    let student = req.body;
    var sql = "SET @id =?;SET @firstName = ?;SET @secondName = ?;SET @email = ?;SET @project = ?;SET @password = ?; \
    CALL usersAddOrEdit(@id,@firstName,@secondName,@email,@project,@password);";
    mysqlConnection.query(sql, [student.id, student.firstName, student.secondName, student.email, student.project, student,password], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});


