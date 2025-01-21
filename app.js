const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // Serving static files
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded data

// ENDPOINTS
app.get('/', (req, res) => {
    // Send the HTML file directly
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    // Extract form data
    const { name, age, gender, address, more } = req.body;

    // Create a summary of the submitted form data
    const outputToWrite = `
        The name of the client is ${name}, ${age} years old, ${gender}, 
        residing at ${address}. More about them: ${more}.
    `;

    // Save the summary to an output file
    fs.writeFileSync('output.txt', outputToWrite);

    // Send a success message
    res.status(200).send(`
        <h1>Your form has been submitted successfully</h1>
        <p>${outputToWrite}</p>
        <a href="/">Go back to the form</a>
    `);
});

// START THE SERVER
app.listen(port, () => {
    console.log(`This application started successfully on port ${port}`);
});
