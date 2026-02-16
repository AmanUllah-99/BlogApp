 // // const conf = {

// //     appwriteURL :String(import.meta.env.VITE_APPWRITE_URL),
// //     appwriteProjectId :String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
// //     appwriteDataBaseId :String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
// //     appwriteurlCollectionId :String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
// //     appwriteBucketId :String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
// // }


// // export default conf

// const conf = {
//     appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),// URL of the Appwrite server
//     appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),// ID of the Appwrite project
//     appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),// ID of the Appwrite database
//     appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID), //  ID of the Appwrite table for storing blog posts
//     appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID), // ID of the Appwrite bucket for storing images
// }

// export default conf

// conf.js - Appwrite configuration for React Vite

const conf = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),          // Appwrite server URL
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),  // Project ID
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID), // Database ID
  appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),       // Table/Collection ID
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),     // Bucket ID
  tinyMceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY)
};

export default conf;


