import Writer from '../src/helpers/writer';
import { leadsArray } from './fake-data';
import fs from 'fs';
console.log = jest.fn();

jest.mock('fs');
beforeEach(() => {
  jest.clearAllMocks();
});

describe('WriteOutputJSON Method', () => {
  const writer = new Writer();

  it('Calls fs.writeFile', () => {
    expect.assertions(1);
    writer.writeOutputJSON(leadsArray);
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
  });
});
