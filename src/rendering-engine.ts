import { InjectableClass, Releasable } from './di-container';
import { ContextCreator } from './manager/context-creator';
import { ProgramManager } from './manager/program-manager';

@InjectableClass()
export class RenderingEngine implements Releasable {
  constructor (
    private _contextCreator: ContextCreator,
    private _programManager: ProgramManager
  ) {}

  setup (config: string) {
    this._contextCreator.setup(config);
  }

  release () {
    console.log('Release resources from RenderingEngine');
  }

  get contextCreator (): ContextCreator {
    return this._contextCreator;
  }

  get programManager (): ProgramManager {
    return this._programManager;
  }
}
