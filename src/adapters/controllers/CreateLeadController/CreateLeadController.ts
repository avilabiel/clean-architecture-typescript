

const CreateLead = require("../../../app/CreateLead/CreateLead");
const SendLeadByEmail = require("../../../app/SendLeadByEmail/SendLeadByEmail");

export default class CreateLeadController {
  static async post(req, res) {
    const { name, email, phone } = req.body;
    const { repositories } = req.serviceLocator;
    const { lead: leadRepository } = repositories;

    try {
      const lead = await CreateLead(name, email, phone, { leadRepository });

      return res.send({ success: true, message: "Lead created", lead });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({
          success: false,
          message: "There was an error to create this Lead",
        });
    }
  }
}
