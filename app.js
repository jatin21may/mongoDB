const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "bank";
const collection_name = 'accounts';

const dbcollection = client.db(dbname).collection(collection_name);

const ConnectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`>>>>>>>>>>mongo connected to ${dbname} database>>>>>>>>>>>>>>>>>>`);

  } catch (error) {
    console.error(">>>>>>>>>>mongo error>>>>>>>>>>>>>>>>>>", error);
  }
};

const sampledata = {
  account_holder : 'Jatin Singh',
  account_id: '123123123123',
  account_type: 'checking',
  balance: 10000000,
  last_updated: new Date(),
}


const main = async () => {
    try {
        await ConnectToDatabase();
        let result = await dbcollection.insertOne(sampledata);
        console.log(result);
        console.log(`Data Inserted: ${result.insertedId}`);
        const databaseList = client.db().admin().listDatabases();
        (await databaseList).databases.forEach(db => console.log( `${db.name}`  ));
    } catch (error) {
        console.error(`Error in DB connection ${error}`);
    } finally {
        await client.close();
    }
}

main();