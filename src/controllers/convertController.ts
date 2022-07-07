import { Request, Response } from "express";
import { promises as fs } from "fs";
import sharp from "sharp";
import path from "path";

const convertImage = async (req: Request, res: Response) => {
    const image = req.query.image as string;
    const widthInput = req.query.width as string;
    const heightInput = req.query.height as string;

    const height: number = !isNaN(parseInt(heightInput))
        ? parseInt(heightInput)
        : 400;
    const width: number = !isNaN(parseInt(widthInput))
        ? parseInt(widthInput)
        : 400;

    if (width <= 0 || height <= 0) {
        res.status(400).send("<h1>The image dimensions must be positive</h1>");
        return;
    }

    const serveFileIfExists = async () => {
        await fs.open(`public/thumbs/${image}_${width}_${height}.jpg`, "r");
        res.status(200).sendFile(`thumbs/${image}_${width}_${height}.jpg`, {
            root: path.join(__dirname, "..", "..", "public"),
        });
    };

    const resizeAndStoreImage = async () => {
        await fs.open(`public/images/${image}.jpg`, "r");
        await fs.writeFile(
            `public/thumbs/${image}_${width}_${height}.jpg`,
            sharp(`public/images/${image}.jpg`).resize(width, height)
        );
        res.status(201).sendFile(`thumbs/${image}_${width}_${height}.jpg`, {
            root: path.join(__dirname, "..", "..", "public"),
        });
    };

    const serveResizedImage = async () => {
        try {
            await resizeAndStoreImage();
        } catch (error) {
            res.status(404).send("<h1>Sorry, this image is not available</h1>");
        }
    };

    await fs.mkdir("public/thumbs", { recursive: true });

    try {
        await serveFileIfExists();
    } catch (_error) {
        await serveResizedImage();
    }
};

export default convertImage;
