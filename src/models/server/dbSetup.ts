import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    // Attempt to connect to the database
    await databases.get(db);
    console.log("Database connection successful");
  } catch (error) {
    // Handle database connection error
    console.log("Database not found. Attempting to create the database...");

    try {
      // Create the database if it doesn't exist
      await databases.create(db, db);
      console.log("Database created successfully");

      // Create the necessary collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collections created successfully");
      console.log("Database setup complete");
    } catch (error) {
      // Log error when database creation or collection creation fails
      console.error("Error creating database or collections:", error);
    }
  }
  
  return databases;  // Return the databases object after the operation
}
