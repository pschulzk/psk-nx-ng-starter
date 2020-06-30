import 'node_modules/jsdom/lib/jsdom/living/custom-elements/CustomElementRegistry-impl.js';

import { ETIMEOUT } from '@nx-ng-starter/shared-util';

import { setupJsdomDocumentMocks } from '../document/document.mock';
import { setupJsdomGlobalMocks } from '../globals/globals.mock';
import { setupJsdomWindowMocks } from '../window/window.mock';

/**
 * Increase specs timeout.
 */
jest.setTimeout(ETIMEOUT.FOREVER);

/**
 * Sets up Jest global mocks
 * which should be used in each app and lib in test-setup.ts files.
 */
export const setupJestJsdomGlobalMocks: () => void = () => {
  setupJsdomGlobalMocks();
  setupJsdomWindowMocks();
  setupJsdomDocumentMocks();

  /**
   * Override some console methods for testing environment.
   */
  window.console.log = (): void => null;
  window.console.group = (): void => null;
};
