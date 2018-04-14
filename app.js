
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "great_baydb"
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // createProduct();
  });

  function whatToDo(){
    inquirer.prompt([
        // Here we create a basic text prompt.
      {
          type: "input",
          message: "What is your name?",
          name: "username"
      },
      // Here we create a basic password-protected text prompt.
    {
        type: "password",
        message: "Set your password",
        name: "password"
      },

      // Here we give the user a list to choose from.
    {
        type: "list",
        message: "Choose what to do",
        choices: ["POST", "BID"],
        name: "userChoice"
      },
    ])
    .then(function(inquirerResponse) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (inquirerResponse.userChoice === "POST") {
            inquirer.prompt([
                // Here we create a basic text prompt.
              {
                  type: "input",
                  message: "What is the product name?",
                  name: "productName"
              },
                // Here we create a basic text prompt.
              {
                  type: "input",
                  message: "What is the minimum bid",
                  name: "minBid"
              },
            ])
        }
    
        else {
            function readProducts() {
                console.log("Selecting all products...\n");
                connection.query("SELECT * FROM products", function(err, res) {
                  if (err) throw err;
                  // Log all results of the SELECT statement
                  console.log(res);
                  connection.end();
                });
              }
        }
      });
  }

  function updateProduct() {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: 100
        },
        {
          flavor: "Rocky Road"
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        deleteProduct();
      }
    );
}
