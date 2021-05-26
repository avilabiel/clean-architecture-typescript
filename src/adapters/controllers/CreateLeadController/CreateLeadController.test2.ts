import request from "supertest";
import faker from "faker";
import Server from "@/externals/Express";
const server = new Server();

describe("CreateLeadController", () => {
  it("Creates the lead", async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
    };

    const result = await request(server.express).post("/lead").send(body);

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body).toMatchObject({
      success: true,
      message: "Lead created",
      lead: {
        id: 3,
        ...body,
      },
    });
  });
});
