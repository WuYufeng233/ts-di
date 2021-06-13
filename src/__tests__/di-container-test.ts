import { bootstrap } from '../di-container';
import { RenderingEngine } from '../rendering-engine';

describe('Injector', () => {
  it('should setup and release two Rendering Engines with their own dependencies', () => {
    const [renderingEngine1, release1] = bootstrap<RenderingEngine>(RenderingEngine);
    renderingEngine1.setup('Setup Rendering Engine - 1');

    expect(renderingEngine1).not.toBeNull();
    expect(renderingEngine1.contextCreator).not.toBeNull();
    expect(renderingEngine1.programManager).not.toBeNull();

    const uuid11 = renderingEngine1.contextCreator.uuid;
    const uuid12 = renderingEngine1.programManager.uuid;

    const [renderingEngine2, release2] = bootstrap<RenderingEngine>(RenderingEngine);
    renderingEngine1.setup('Setup Rendering Engine - 2');

    expect(renderingEngine2).not.toBeNull();
    expect(renderingEngine2.contextCreator).not.toBeNull();
    expect(renderingEngine2.programManager).not.toBeNull();

    const uuid21 = renderingEngine2.contextCreator.uuid;
    const uuid22 = renderingEngine2.programManager.uuid;

    // every rendering engine instance starts its own dependency container with singleton services
    // => UUIDs should be unique pro rendering engine instance
    expect(uuid11).not.toBe(uuid21);
    expect(uuid12).not.toBe(uuid22);

    // release the first rendering engine
    release1();

    expect(renderingEngine1.contextCreator.uuid).not.toBeNull();
    expect(renderingEngine1.programManager.uuid).toBeNull();

    // release the second rendering engine
    release2();

    expect(renderingEngine2.contextCreator.uuid).not.toBeNull();
    expect(renderingEngine2.programManager.uuid).toBeNull();
  });
});
