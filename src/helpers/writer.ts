import fs from 'fs';
import Lead from '../models/lead';
import Logger from './logger';

class Writer {
  private outputFile = process.argv[3] ? process.argv[3] : __dirname + '/../../../output.json';

  public writeOutputJSON = (leadsArray: Array<Lead>, path = this.outputFile): Promise<string> => {
    return new Promise(resolve => {
      const logger = new Logger(),
        leadsJSON = JSON.stringify({ leads: leadsArray }, null, 2);
      logger.outputLogs(leadsJSON);
      fs.writeFile(path, leadsJSON, () => {
        logger.consoleLog(`\u2713 Output file created successfully`);
        resolve(leadsJSON);
      });
    });
  };
}

export default Writer;
