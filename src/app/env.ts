const env = {
    appwrite:{
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey:String(process.env.APPWRITE_API_KEY)
        

    }
}

console.log("ENV JS",process.env.NEXT_PUBLIC_APPWRITE_HOST_URL)

export default env