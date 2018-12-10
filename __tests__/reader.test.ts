import Reader from '../src/helpers/reader';
import fs from 'fs';
jest.mock('fs');
console.log = jest.fn();
const path = __dirname + '/../leads.json';

beforeEach(() => {
  jest.clearAllMocks();
  fs.existsSync = jest.fn().mockReturnValue(true);
});

describe('readInputFile Method', () => {
  const reader = new Reader();

  it('Calls fs.readFileSync', () => {
    expect.assertions(1);
    reader.readInputFile(path);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  });

  it('Reads input file correctly', () => {
    expect.assertions(1);
    fs.readFileSync = jest.fn().mockReturnValue('Correct File');
    const file = reader.readInputFile(path);
    expect(file).toMatchSnapshot();
  });
});
