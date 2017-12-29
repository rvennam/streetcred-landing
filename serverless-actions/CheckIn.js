function main(message) {
  const {
    dbname, url, userID, name,
  } = message;

  const params = {};

  if (!dbname) {
    return Promise.resolve({ body: 'dbname is required.' });
  }
  if (!userID) {
    return Promise.resolve({ body: 'userID is required.' });
  }
  if (!name) {
    return Promise.resolve({ body: 'badge name is required.' });
  }
  const cloudant = require('cloudant')({ url });

  if (typeof cloudant !== 'object') {
    return Promise.reject(cloudant);
  }
  const cloudantDb = cloudant.use(dbname);

  const doc = {
    timestamp: (new Date()).getTime().toString(),
    userID,
    name,
  };
  return insert(cloudantDb, doc, params);
}

/**
 * Create document in database.
 */
function insert(cloudantDb, doc, params) {
  return new Promise(((resolve, reject) => {
    cloudantDb
      .insert(doc, params, (error, response) => {
        if (!error) {
          console.log('success', response);
          resolve({ body: response });
        } else {
          console.log('error', error);
          resolve({ body: error });
        }
      });
  }));
}

/**
 * Delete document by id and rev.
 */
function destroy(cloudantDb, docId, docRev) {
  return new Promise(((resolve, reject) => {
    cloudantDb
      .destroy(docId, docRev, (error, response) => {
        if (!error) {
          console.log('success', response);
          resolve(response);
        } else {
          console.error('error', error);
          reject(error);
        }
      });
  }));
}

exports.main = main;
