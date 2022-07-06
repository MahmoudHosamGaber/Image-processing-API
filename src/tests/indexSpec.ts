import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("test endpoint responses", () => {
    it("should return a 200(ok) response when the thumbnail exists", async () => {
        const response = await request.get(
            "/?image=icelandwaterfall&width=800&height=600"
        );
        expect(response.status).toBe(200);
    });

    it("should return a 201(created) response when the thumbnail doesn't exists", async () => {
        const response = await request.get(
            "/?image=icelandwaterfall&width=800&height=800"
        );
        expect(response.status).toBe(201);
    });

    it("should return a 404(not found) when the image is not in the images folder", async () => {
        const response = await request.get(
            "/?image=noImage&width=800&height=600"
        );
        expect(response.status).toBe(404);
    });
});
