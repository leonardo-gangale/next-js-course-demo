import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { tite, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://leonardogangale06:00Zaurax00@cluster0.biu6yfy.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollections = db.collection("meetups");

    const result = await meetupCollections.insertOne(data);
    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
}
