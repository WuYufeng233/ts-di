import { InjectableClass, Releasable } from '../di-container';
import { ContextCreator } from './context-creator';
import { uuid } from '../util/uuid';

@InjectableClass()
export class ProgramManager implements Releasable {
  private _uuid: string | null;

  constructor (private _contextCreator: ContextCreator) {
    this._uuid = uuid.generate();
  }

  release (): void {
    this._uuid = null;
    console.log('Release resources for ProgramManager');
  }

  get uuid (): string | null {
    return this._uuid;
  }
}
