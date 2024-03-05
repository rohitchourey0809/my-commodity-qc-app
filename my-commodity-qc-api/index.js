// index.js
let connection =  require('./server')
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Dummy image processing route
app.post("/api/process-image", (req, res) => {
  // Add dummy image processing logic here
  const { imageURL } = req.body;
  // Dummy response for illustration
  res.json({ success: true, report: { imageURL, result: "Pass" } });
});

app.post("/api/process-image", (req, res) => {
  const { imageURL } = req.body;

  // Dummy result for illustration
  const result = "Pass";

  // Save report to the database
  connection.query(
    "INSERT INTO reports (imageURL, result) VALUES (?, ?)",
    [imageURL, result],
    (error) => {
      if (error) {
        console.error("Error saving report:", error);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      } else {
        res.json({ success: true, report: { imageURL, result } });
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
