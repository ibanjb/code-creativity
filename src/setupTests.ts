import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

/**
 * Suppress warnings globally.
 **/

const warningStrings = [''];

// eslint-disable-next-line no-console
const consoleWarning = console.warn;

const excludeConsoleMessages = (
  consoleFn: any,
  consoleType: any,
  excludeStrings: any
) => {
  jest.spyOn(console, consoleType).mockImplementation((...args: any) => {
    if (
      args &&
      Array.isArray(args[0]) &&
      !excludeStrings.find((excludeString: string) =>
        args[0].includes(excludeString)
      )
    ) {
      consoleFn(...args);
    }
  });
};

beforeAll(() => {
  excludeConsoleMessages(consoleWarning, 'warn', warningStrings);
});
