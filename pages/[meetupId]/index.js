import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

export default function meetupDetailPage(props) {
  return (
    <MeetupDetail
      title={props.meetupData.title}
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
    ></MeetupDetail>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://leonardogangale06:00Zaurax00@cluster0.biu6yfy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");
  const fetchedMeetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: fetchedMeetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://leonardogangale06:00Zaurax00@cluster0.biu6yfy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");
  const selectedMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetup);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
