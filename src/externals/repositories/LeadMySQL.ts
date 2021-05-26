import ILeadRepository from "@/entities/Lead/ILeadRepository";
import Lead from "@/entities/Lead/Lead";
const { Lead: Model } = require("../sequelize/models");
class LeadMySQL implements ILeadRepository {

  async persist(lead): Promise<Lead> {
    const persistedLead = await Model.create(lead);
    lead.id = persistedLead.id;
    return lead;
  }
  
}

module.exports = new LeadMySQL();
