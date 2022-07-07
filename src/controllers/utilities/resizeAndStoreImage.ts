import { promises as fs } from "fs";
import sharp from "sharp";
const resizeAndStoreImage = async (
    image: string,
    width: number,
    height: number
): Promise<void> => {
    await fs.open(`public/images/${image}.jpg`, "r");
    await fs.writeFile(
        `public/thumbs/${image}_${width}_${height}.jpg`,
        sharp(`public/images/${image}.jpg`).resize(width, height)
    );
};

export default resizeAndStoreImage;
