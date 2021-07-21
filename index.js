const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");


const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Note API!",
        version: "0.1.0",
        description: "This is a note API!",
      },
      servers: [
        {
          url: "http://localhost:3001/v1",
        },
      ]
    },
    apis: ["api/controllers/notes.js", "api/controllers/note.js"],
  }))
)

app.use(cors({origin: 'http://localhost:3000', optionsSuccessStatus:200}))
app.use(bodyParser.json())
app.use("/v1/notes",
  require("./controllers/notes"),
  require("./controllers/note")
);


app.listen(3001, () => console.log("Server UP and Running"));