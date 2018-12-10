import { ILead } from '../../typings';

class Lead {
  public _id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public address: string;
  public entryDate: string;
  [key: string]: any;

  constructor(data: ILead) {
    if (data) {
      this._id = data._id;
      this.email = data.email;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.address = data.address;
      this.entryDate = data.entryDate;
    }
  }
}

export default Lead;
