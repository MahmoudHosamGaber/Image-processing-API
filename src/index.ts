import express, { Request, Response } from "express";
import path from "path";
import { promises as fs } from "fs";
import sharp from "sharp";
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", async (req: Request, res: Response) => {
    const image = req.query.image as string;
    const widthInput = req.query.width as string;
    const heightInput = req.query.height as string;

    const height: number = parseInt(heightInput) || 400;
    const width: number = parseInt(widthInput) || 400;
    try {
        await fs.open(`public/thumbs/${image}_${width}_${height}.jpg`, "r");
        res.status(200).sendFile(`thumbs/${image}_${width}_${height}.jpg`, {
            root: path.join(__dirname, "..", "public"),
        });
    } catch (_error) {
        try {
            await fs.writeFile(
                `public/thumbs/${image}_${width}_${height}.jpg`,
                sharp(`public/images/${image}.jpg`).resize(width, height)
            );
            res.status(201).sendFile(`thumbs/${image}_${width}_${height}.jpg`, {
                root: path.join(__dirname, "..", "public"),
            });
        } catch (error) {
            res.status(404).send("<h1>Sorry, this image is not available</h1>");
        }
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

export default app;
