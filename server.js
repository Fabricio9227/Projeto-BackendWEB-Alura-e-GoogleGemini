import express from "express"; // No terminal: npm install express.js (irá criar o arquivo package-lock.json)
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"))
routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...")
});
