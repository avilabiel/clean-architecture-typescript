import Lead from "./Lead";

export default interface ILeadRepository {
    persist(leadEntity: Lead): Promise<Lead>;
}