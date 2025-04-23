import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";

<<<<<<< HEAD
const Page = async ({ params }: { params: { quesId: string; quesName: string } }) => {
    const question = await databases.getDocument(db, questionCollection, params.quesId);

    return <EditQues question={question} />;
};

export default Page;
=======
export default async function Page({
  params,
}: {
  params: any;
}) {
  const { quesId } =  params as {quesId: string}

  const question = await databases.getDocument(
    db,
    questionCollection,
    quesId
  );

  return <EditQues question={question} />;
}
>>>>>>> 1a4cd69 (fixed bugs to enforce eslint)
