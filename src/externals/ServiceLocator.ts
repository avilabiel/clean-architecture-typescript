import constants from "./Constants";

export default class ServiceLocator {
    private static _instance: ServiceLocator;
    repositories: Object;
    services: Object;

  private constructor() {
    this.repositories = this.buildRepositories();
    this.services = this.buildServices();
  }

  public static getInstance(): ServiceLocator {
    return this._instance || (this._instance = new this());
  };

  buildServices(): Object {
    return {};
  }

  buildRepositories(): Object {
    return {
      lead: this.buildRepository("Lead"),
    };
  }

  buildRepository(repositoryInCamelCaseWithFirstLetterUpper): Object {
    if (process.env.DATABASE_ENGINE === constants.DATABASE_ENGINES.IN_MEMORY)
      return require(`./repositories/${repositoryInCamelCaseWithFirstLetterUpper}InMemory`);

    if (process.env.DATABASE_ENGINE === constants.DATABASE_ENGINES.MYSQL)
      return require(`./repositories/${repositoryInCamelCaseWithFirstLetterUpper}MySQL`);

    throw new Error(
      `Repository ${repositoryInCamelCaseWithFirstLetterUpper} not supported`
    );
  }
}
