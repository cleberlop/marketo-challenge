import fs from 'fs';
import Logger from '../src/helpers/logger';
import { leadsArray } from './fake-data';

jest.mock('fs');
console.log = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Logger Class', () => {
  const logger = new Logger();

  test('consoleLog Method calls console.log once', () => {
    logger.consoleLog('message');
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  test('WriteToLogFile calls fs.appenFileSync once', () => {
    expect.assertions(1);
    logger.writeToLogFile('message');
    expect(fs.appendFileSync).toHaveBeenCalledTimes(1);
  });

  test('initLogs calls writeToLogFile', () => {
    expect.assertions(1);
    jest.spyOn(logger, 'writeToLogFile');
    logger.initLogs('message');
    expect(logger.writeToLogFile).toHaveBeenCalledTimes(1);
  });

  test('outputLogs calls console.log and WriteToLogFile', () => {
    expect.assertions(2);
    jest.spyOn(logger, 'writeToLogFile');
    logger.outputLogs('message');
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(logger.writeToLogFile).toHaveBeenCalledTimes(1);
  });

  test('dedupeSuccessLogs calls consoleLog twice', () => {
    expect.assertions(2);
    jest.spyOn(logger, 'consoleLog');
    logger.dedupeSuccessLogs();
    expect(logger.consoleLog).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledTimes(2);
  });

  test('writeChangesToLogFile calls writeToLogFile Once', () => {
    expect.assertions(1);
    jest.spyOn(logger, 'writeToLogFile');
    logger.writeChangesToLogFile(leadsArray[0], leadsArray[1]);
    expect(logger.writeToLogFile).toHaveBeenCalledTimes(1);
  });
});
