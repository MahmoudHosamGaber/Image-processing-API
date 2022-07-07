import resizeAndStoreImage from "../controllers/utilities/resizeAndStoreImage";
import fs from "fs";
describe("test the resizeAndStoreImage function", () => {
    beforeAll(async (): Promise<void> => {
        fs.promises.mkdir("public/thumbs", { recursive: true });
    });

    it("should create an image in the thumbs folder", async (): Promise<void> => {
        await resizeAndStoreImage("icelandwaterfall", 700, 600);
        expect(
            fs.existsSync(`public/thumbs/icelandwaterfall_700_600.jpg`)
        ).toBe(true);
    });
    afterAll((): void => {
        fs.unlinkSync(`public/thumbs/icelandwaterfall_700_600.jpg`);
    });
});
