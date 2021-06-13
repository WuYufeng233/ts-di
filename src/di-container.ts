import 'reflect-metadata';

interface Type<T> {
  new (...args: any[]): T;
}

/**
 * Decorator function to annotate classes which can inject another ones in constructors.
 * A decorator is required to be able to get Reflect's metadata.
 */
export const InjectableClass = <T>(): (target: Type<T>) => void => {
  return (target) => {
    // do something if needed
  };
};

/**
 * Lifecycle hook that is used for releasing a resource.
 * It will be called automatically by DI container.
 */
export interface Releasable {
  release(): void;
}

/**
 * Every entry point class instance starts its own dependency container.
 * Injector ensures that all decorated classes in the container are singletons.
 */
export class Injector extends Map {
  resolve<T> (Target: Type<T>): T {
    const tokens = Reflect.getMetadata('design:paramtypes', Target) || [];
    // initialize instances which are going to be injected into `Target`
    const injections = tokens.map((token: Type<unknown>) => this.resolve(token));

    const classInstance = this.get(Target);
    if (classInstance) {
      return classInstance;
    }

    const newClassInstance = new Target(...injections);
    this.set(Target, newClassInstance);

    // console.log(`DI-container created class - ${(newClassInstance as any).constructor.name}`);

    return newClassInstance;
  }

  release (): void {
    for (const value of this.values()) {
      if (typeof value.release === 'function') {
        value.release();
      }
    }

    this.clear();
  }
}

/**
 * Bootstraps the entry point class instance of type T
 *
 * @returns entry point class instance and the "release" function which releases the DI container
 */
export const bootstrap = <T>(target: Type<T>): [T, () => void] => {
  // there is exactly on Injector pro entry pint class instance
  const injector = new Injector();
  // bootstrap all dependencies
  const entryClass = injector.resolve<T>(target);

  return [entryClass, () => injector.release()];
};
