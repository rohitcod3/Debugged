import { Permission } from "node-appwrite"
import { questionAttachmentBucket } from "../name"
import { storage } from "./config"

export default async function getOrCreateStorage(){
    
    try{
     // Try to get the existing bucket
     await storage.getBucket(questionAttachmentBucket);
     console.log("Storage connected")
    }catch(error){
        // If bucket doesn't exist, create a new one
    try{
        await storage.createBucket(
            questionAttachmentBucket,
            questionAttachmentBucket,
            [
                Permission.create("users"),
                Permission.read("any"),
                Permission.read('users'),
                Permission.update('users'),
                Permission.delete("users")
            ],
            false,
            undefined,
            undefined,
            ["jpg","png","gif", "jpeg", "webp","heic"]
        );
        console.log("Storage createed");
        console.log("Storage Connected");
    }catch(error){
    console.log("Error creating storage", error);
    }
    }
   
}