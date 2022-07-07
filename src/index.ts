import express from "express";
import path from "path";
const app = express();
const port = 3000;
import router from "./routes/routes";
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    res.status(200).send("<h1>visit /api/convert</h1>");
});
app.use("/api", router);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

export default app;
