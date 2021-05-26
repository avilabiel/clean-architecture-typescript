import Lead from "@/entities/Lead/Lead";
import ILeadRepository from "@/entities/Lead/ILeadRepository";
import CreateLead from "./CreateLead";

class LeadRepositorySpy implements ILeadRepository {
    persist(leadEntity: Lead): Promise<Lead> {
        return new Promise(() => leadEntity);
    }
}
const mockLeadRepository = new LeadRepositorySpy();

describe("CreateLead", () => {
  it("Saves a new Lead", async () => {
    const persistedLead = new Lead(
      99,
      "Crazy Test",
      "test@gmail.com",
      "+5511932919232"
    );
    jest.spyOn(mockLeadRepository, "persist").mockImplementationOnce((): any => {
      return persistedLead;
    });

    const lead = await CreateLead(
      "Crazy Test",
      "test@gmail.com",
      "+5511932919232",
      { leadRepository: mockLeadRepository }
    );

    expect(mockLeadRepository.persist).toHaveBeenCalledWith(
      new Lead(null, "Crazy Test", "test@gmail.com", "+5511932919232")
    );
    expect(lead).toBe(persistedLead);
  });

  it("Throws an error when save fails", async () => {
    jest.spyOn(mockLeadRepository, "persist").mockImplementationOnce(() => {
      throw new Error();
    });

    const testFunction = () =>
      CreateLead("Crazy Test", "test@gmail.com", "+5511932919232", {
        leadRepository: mockLeadRepository,
      });

    expect(() => {
      testFunction();
    }).toThrowError(Error);
  });
});
