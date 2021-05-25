import Lead from "@/entities/Lead/Lead";
import ILeadRepository from "@/entities/Lead/ILeadRepository";

export default (name: string, email: string, phone: string, options: { leadRepository: ILeadRepository }) => {
  const lead = new Lead(null, name, email, phone);
  return options.leadRepository.persist(lead);
};