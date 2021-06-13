import { InjectableClass } from '../di-container';
import { uuid } from '../util/uuid';

@InjectableClass()
export class ContextCreator {
  private readonly _uuid: string | null;

  constructor () {
    this._uuid = uuid.generate();
  }

  setup (config: string): void {
    console.log(config);
  }

  get uuid (): string | null {
    return this._uuid;
  }
}
