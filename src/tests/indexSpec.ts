import supertest from "supertest";
import app from "../index";
import { promises as fs } from "fs";
import sharp from "sharp";
const request = supertest(app);

describe("test the main API endpoint", (): void => {
    it("should return a 200 response", async () => {
        const response = await request.get("/");
        expect(response.status).toBe(200);
    });
});

describe("test the image conversion endpoint responses", () => {
    beforeAll(async (): Promise<void> => {
        await fs.mkdir("public/thumbs", { recursive: true });
        await fs.writeFile(
            `public/thumbs/icelandwaterfall_800_600.jpg`,
            sharp(`public/images/icelandwaterfall.jpg`).resize(800, 600)
        );
    });
    it("should return a 200(ok) response when the thumbnail exists", async (): Promise<void> => {
        const response = await request.get(
            "/api/convert?image=icelandwaterfall&width=800&height=600"
        );
        expect(response.status).toBe(200);
    });

    it("should return a 201(created) response when the thumbnail doesn't exists", async (): Promise<void> => {
        const response = await request.get(
            "/api/convert?image=icelandwaterfall&width=800&height=800"
        );
        expect(response.status).toBe(201);
    });

    it("should return a 404(not found) when the image is not in the images folder", async (): Promise<void> => {
        const response = await request.get(
            "/api/convert?image=noImage&width=800&height=600"
        );
        expect(response.status).toBe(404);
    });
    it("should still return a 404(not found) after not finding the image in the images folder", async (): Promise<void> => {
        const response = await request.get(
            "/api/convert?image=noImage&width=800&height=600"
        );
        expect(response.status).toBe(404);
    });
    it("should return a 400(bad request) if any of the dimensions is non positive", async (): Promise<void> => {
        const response = await request.get(
            "/api/convert?image=noImage&width=-800&height=600"
        );
        expect(response.status).toBe(400);
    });
    afterAll(async (): Promise<void> => {
        await fs.unlink("public/thumbs/icelandwaterfall_800_800.jpg");
        await fs.unlink("public/thumbs/icelandwaterfall_800_600.jpg");
    });
});
