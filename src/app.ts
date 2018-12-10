import Dedupe from './helpers/dedupe';
import ConsoleLogger from './helpers/logger';
import Reader from './helpers/reader';

const reader = new Reader(),
  logger = new ConsoleLogger(),
  dedupe = new Dedupe(),
  inputPath = process.argv[2] ? process.argv[2] : __dirname + '/../../leads.json',
  inputJSON = reader.readInputFile(inputPath);

logger.consoleLog('Starting to Deduplicate...');
dedupe.deduplicate(inputJSON);
