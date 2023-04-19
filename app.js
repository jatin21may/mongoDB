const { MongoClient, ObjectId } = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "bank";
const collection_name = "accounts";

const dbcollection = client.db(dbname).collection(collection_name);

const ConnectToDatabase = async () => {
  try {
    await client.connect();
    console.log(
      `>>>>>>>>>>mongo connected to ${dbname} database>>>>>>>>>>>>>>>>>>`
    );
  } catch (error) {
    console.error(">>>>>>>>>>mongo error>>>>>>>>>>>>>>>>>>", error);
  }
};

const sampleObject = {
  account_holder: "Abhishek Singh",
  account_id: "123123123123",
  account_type: "savings",
  balance: 10000,
  last_updated: new Date(),
};

const sampledata = [
  {
    account_holder: "Abhishek Singh",
    account_id: "123123123123",
    account_type: "savings",
    balance: 10000,
    last_updated: new Date(),
  },
  {
    account_holder: "Anuj Singh",
    account_id: "2489999131456234",
    account_type: "savings",
    balance: 100000000,
    last_updated: new Date(),
  },
];

// Document used as a filter for the find() method
const documentsToFindbalance = { balance: { $gt: 4700 } };
const documentToFind = { _id: new ObjectId("6424103ec582dbcc60ec35a0") };

const documentToUpdate = { _id: new ObjectId("6424103ec582dbcc60ec35a0") };
const dataToUpdate = { $inc: { balance: 4000 } };

const documentToUpdateMany = { account_type: "checking" };
const updateManyData = { $push: { transfers_complte: "TRF3451234" } };



const main = async () => {
  try {
    await ConnectToDatabase();
    // const databaseList = client.db().admin().listDatabases();
    // (await databaseList).databases.forEach((db) => console.log(`${db.name}`));

    // Insert Data

    // let insertOne = await dbcollection.insertOne(sampleObject);
    // let resultinsertMany = await dbcollection.insertMany(sampledata);
    // console.log(result);
    // console.log(`Data Inserted: ${resultinsertMany.insertedCount}`);


    /* -----------------------------------------------------------UPDATE METHOD -----------------------------*/

    // find() method is used here to find documents that match the filter

    // let resultfind = dbcollection.find(documentsToFindbalance);
    // let docCount = dbcollection.countDocuments(documentsToFindbalance);
    // await resultfind.forEach((doc) => console.log(doc));
    // console.log(`Found ${await docCount} documents`);

    /** 
     * @desc findOne() method is used here to find a the first document that matches the filter
     * ! 
     *  */ 
    

    // let resultfindOne = await dbcollection.findOne(documentToFind);
    // console.log(`Found one document`);
    // console.log(resultfindOne);



    /* -----------------------------------------------------------UPDATE METHOD -----------------------------*/

    // UpdateOne() method is used here to update the document
    
    let resultUpdateOne = await dbcollection.updateOne(
      documentToUpdate,
      dataToUpdate
    );
    resultUpdateOne.modifiedCount === 1
      ? console.log("Update One Document")
      : console.log("Error in Update");
    console.log(resultUpdateOne);

    // UpdateOne() method is used here to update the document

    let resultUpdateMany = await dbcollection.updateMany(
      documentToUpdateMany,
      updateManyData
    );
    resultUpdateMany.modifiedCount > 0
      ? console.log(`Updated ${resultUpdateMany.modifiedCount} Document`)
      : console.log("Error in UpdateMany");
    console.log(resultUpdateMany);

    /* -----------------------------------------------------------DELETE METHOD -----------------------------*/

    const documentToDeleteOne = { _id: new ObjectId("6424103ec582dbcc60ec35a0") }
    const documentsToDeleteMany = { balance: { $gt: 50000 } }

     // DeleteOne() method is used here to update the document

    //  let resultDeleteOne = await dbcollection.deleteOne(documentToDeleteOne)
    //  resultDeleteOne.deletedCount === 1
    //    ? console.log("Deleted one document")
    //    : console.log("No documents deleted")
   

    // DeleteMany() method is used here to update the document

 
    let resultDeleteMany = await dbcollection.deleteMany(documentsToDeleteMany)
    resultDeleteMany.deletedCount > 0
      ? console.log(`Deleted ${resultDeleteMany.deletedCount} documents`)
      : console.log("No documents deleted")
    
    /* -----------------------------------------------------------DELETE METHOD -----------------------------*/



  } catch (error) {
    console.error(`Error in DB connection ${error}`);
  } finally {
    await client.close();
  }
};

main();
