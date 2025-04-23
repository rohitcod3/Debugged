<<<<<<< HEAD
=======
export const runtime = "nodejs";
>>>>>>> 1a4cd69 (fixed bugs to enforce eslint)
import { Permission } from "node-appwrite"
import { questionAttachmentBucket } from "../name"
import { storage } from "./config"

export default async function getOrCreateStorage(){
    
    try{
<<<<<<< HEAD
     // Try to get the existing bucket
     await storage.getBucket(questionAttachmentBucket);
     console.log("Storage connected")
    }catch(error){
        // If bucket doesn't exist, create a new one
=======
   
     await storage.getBucket(questionAttachmentBucket);
     console.log("Storage connected")
    }catch(error){
        
>>>>>>> 1a4cd69 (fixed bugs to enforce eslint)
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