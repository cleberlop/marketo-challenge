import Dedupe from '../src/helpers/dedupe';
import { leadsArray } from './fake-data';
import Writer from '../src/helpers/writer';

import fs from 'fs';
console.log = jest.fn();
jest.mock('fs');
let dedupe: Dedupe;
beforeEach(() => {
  jest.clearAllMocks();
  dedupe = new Dedupe();
});

describe('Dedupe class methods', () => {
  test('swap calls setListsValues', () => {
    expect.assertions(1);
    jest.spyOn(dedupe, 'setListsValues');
    dedupe.swap('id', 'email', 'prevId', 'prevEmail', leadsArray[0]);
    expect(dedupe.setListsValues).toHaveBeenCalledTimes(1);
  });

  test('setListsValues sets emailList itemsByIdList correctly', () => {
    expect.assertions(2);
    dedupe.setListsValues(leadsArray[0]._id, leadsArray[0].email, leadsArray[0]);
    expect(dedupe.emailList).toMatchSnapshot();
    expect(dedupe.itemsByIdList).toMatchSnapshot();
  });

  test('shouldSwap return correct boolean', () => {
    dedupe.deduplicate(JSON.stringify({ leads: leadsArray }));
    const shouldSwap = dedupe.shouldSwap(leadsArray[1], leadsArray[0]._id);
    expect(shouldSwap).toBe(true);
  });

  test('deduplicate successfully matches snapshot', () => {
    expect.assertions(1);
    fs.readFileSync = jest.fn().mockReturnValue('Correct File');
    dedupe.writer.writeOutputJSON = jest.fn().mockReturnValue(Promise.resolve('string'));
    return dedupe.deduplicate(JSON.stringify({ leads: leadsArray })).then(res => {
      expect(res).toMatchSnapshot();
    });
  });
});
