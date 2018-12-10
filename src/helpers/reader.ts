import fs from 'fs';
import Logger from './logger';

class Reader {
  public readInputFile = (inputPath: string): string => {
    const logger = new Logger();
    if (fs.existsSync(inputPath)) {
      logger.consoleLog('Reading Input File...');
      return fs.readFileSync(inputPath, { encoding: 'utf8' });
    } else {
      logger.consoleLog('File path is invalid', '\x1b[41m');
      throw new Error();
    }
  };
}

export default Reader;
