import { ILead } from '../../typings';
import Lead from '../models/lead';
import Logger from './logger';
import Writer from './writer';
import { rejects } from 'assert';

class Dedupe {
  public logger = new Logger();
  public writer = new Writer();
  public emailList: Map<string, string> = new Map();
  public itemsByIdList: Map<string, Lead> = new Map();

  public swap = (id: string, email: string, prevId: string, prevEmail: string, current: Lead): void => {
    this.logger.writeChangesToLogFile(this.itemsByIdList.get(prevId), current);
    this.emailList.delete(prevEmail);
    this.itemsByIdList.delete(prevId);
    this.setListsValues(id, email, current);
  };

  public setListsValues = (id: string, email: string, current: Lead): void => {
    this.itemsByIdList.set(id, current);
    this.emailList.set(email, id);
  };

  public shouldSwap(current: Lead, prevId: string): boolean {
    //if current entryDate is more recent or the same as previous return true
    if (current.entryDate >= this.itemsByIdList.get(prevId).entryDate) {
      return true;
    }
  }

  public deduplicate = (inputJSON: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      let leads: Array<ILead> = JSON.parse(inputJSON).leads;
      this.logger.initLogs(inputJSON);
      leads.forEach((lead: ILead) => {
        const current = new Lead(lead),
          email = current.email,
          id = current._id,
          foundDupeByEmail = this.emailList.has(email),
          foundDupeById = this.itemsByIdList.has(id);

        if (foundDupeById || foundDupeByEmail) {
          const prevEmail = foundDupeByEmail ? email : this.itemsByIdList.get(id).email;
          const prevId = foundDupeById ? id : this.emailList.get(email);
          if (this.shouldSwap) this.swap(id, email, prevId, prevEmail, current);
        } else {
          this.setListsValues(id, email, current);
        }
      });
      this.writer.writeOutputJSON([...this.itemsByIdList.values()]).then((outputJson: string) => {
        this.logger.dedupeSuccessLogs();
        resolve(outputJson);
      });
    });
  };
}

export default Dedupe;
