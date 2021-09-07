import { IFunctionDefinition } from '@common/types/common';

export class FunctionDefinition {
  private functionDefinition: IFunctionDefinition;

  constructor(handler: IFunctionDefinition) {
    this.functionDefinition = handler;
  }

  public addCors() {
    const httpEvent = this.functionDefinition.events?.find((event) =>
      Object.keys(event).includes('http')
    );

    if (!httpEvent) {
      console.error('Can not find "http" event in events list');
    }

    if (httpEvent) {
      httpEvent['http'].cors = true;
    }

    return this;
  }

  public getResult() {
    return this.functionDefinition;
  }
}
