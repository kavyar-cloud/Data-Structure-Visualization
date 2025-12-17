const { exec } = require("child_process");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  
app.use(express.static(path.join(__dirname, "docs")));

app.post("/run-java", (req, res) => {
    const { program, args } = req.body;

    if (!program) return res.status(400).send("Java program name missing");

    const javaDir = `"${path.join(__dirname, "java")}"`;

    exec(`java -cp ${javaDir} ${program} ${args || ""}`, (error, stdout, stderr) => {
        if (error) return res.status(500).send(error.message);
        if (stderr) return res.status(500).send(stderr);
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
