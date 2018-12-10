import fs from 'fs';
import Lead from '../models/lead';

class Logger {
  public consoleLog = (message: string, color = '\x1b[44m'): void => {
    console.log(color, message, '\x1b[0m');
  };

  public writeToLogFile = (message: string): void => {
    const path = __dirname + '/../../../log.txt';
    fs.appendFileSync(path, `${message}`);
  };

  public initLogs = (input: string): void => {
    const dash = `\r\n--------------------\r\n`,
      date = `${new Date()}\r\n`,
      original = `\r\nOriginal file:\r\n`,
      inputJSON = `  ${input}`,
      changes = `\r\nChanges:\r\n`;
    this.writeToLogFile(dash + date + original + inputJSON + changes);
  };

  public outputLogs = (leadsJSON: string): void => {
    this.consoleLog('Writing output file...');
    this.writeToLogFile(`\r\nOutput:\r\n  ${leadsJSON}`);
  };

  public dedupeSuccessLogs = (): void => {
    this.consoleLog(`See the logs at log.txt`);
    this.consoleLog(`\u2713 Deduplication successfully completed`);
  };

  public writeChangesToLogFile = (from: Lead, to: Lead): void => {
    const changes = [];
    for (var key in from) {
      if (from[key] !== to[key]) changes.push(`  Value from: "${from[key]}" to "${to[key]}"\r\n`);
    }
    const changesString = changes.join('');
    this.writeToLogFile(`${changesString}  ---\r\n`);
  };
}

export default Logger;
