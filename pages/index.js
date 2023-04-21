import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  const [loadedMetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setLoadedMeetups(props.meetups);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={loadedMetups}></MeetupList>
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://leonardogangale06:00Zaurax00@cluster0.biu6yfy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");
  const fetchedMeetups = await meetupCollections.find().toArray();
  client.close();

  return {
    props: {
      meetups: fetchedMeetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
