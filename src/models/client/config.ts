import env from "@/app/env"
import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) 
    .setProject(env.appwrite.projectId); 

const databases = new Databases(client)
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

console.log("ENV ENDPOINT IN CONFIG",env.appwrite.endpoint)
console.log("ENV ENDPOINT IN CONFIG PROJECT ID",env.appwrite.projectId)
export {client, databases, account,avatars,storage}




