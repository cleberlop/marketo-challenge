# Marketo Challenge

Node.js, TypeScript, Chai, Jest

## Installing the dependencies

1.  Make sure you have `npm` installed on your machine. See https://docs.npmjs.com/downloading-and-installing-node-js-and-npm if you need to install npm.
2.  Run

    ```bash
    $ npm install
    ```

## Running the app

- To run the app

  By default the app will use leads.json as it's "input-file" and will save the output to output.json. Both files are located in the project root.

  Default:

  ```bash
  $ npm start
  ```

  To use your files, run the following:

  ```bash
  $ npm start [input-path] [output-path]
  ```

## Running tests

- To run tests:

  ```bash
  $ npm test
  ```

## Received instructions:

Take a variable number of identically structured json records and de-duplicate the set.

An example file of records is given in the accompanying 'leads.json'. Output should be same format, with dups reconciled according to the following rules:

1. The data from the newest date should be preferred

2. duplicate IDs count as dups. Duplicate emails count as dups. Both must be unique in our dataset. Duplicate values elsewhere do not count as dups.

3. If the dates are identical the data from the record provided last in the list should be preferred

Simplifying assumption: the program can do everything in memory (don't worry about large files)

The application should also provide a log of changes including some representation of the source record, the output record and the individual field changes (value from and value to) for each field.
