import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'



export class DatabaseService {

  client = new Client();
  databases;
  storage;


  constructor() {

    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.storage = new Storage(this.client)
  }

  ///////////////////////// In Create Post Session 

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      )
    } catch (error) {
      console.error('appWrite Server:: createPost error::', error)
      throw error
    }
  }

  /////////////////////// In Update Post Session/////////////////////////////
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
    } catch (error) {
      console.error('appWrite Server:: updatePost error::', error)
      throw error
    }
  }
  /////////////////////// In Delete Post Session////////////////////////

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug
      )
      return true
    } catch (error) {
      console.error('appWrite Server:: deletePost error::', error)
      throw error
    }
  }

  ////////////////////////// Get Only One Post   in This Session///////////////////
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug
      )
    } catch (error) {
      console.error('appWrite Server:: getPost error::', error)
      throw error
    }
  }

  ////////////////////////// Get all active Post////////////////////

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        queries
      )
    } catch (error) {
      console.log('appWrite Server:: getPosts error::', error)
      throw error
    }
  }

  /////////////////////// File Uploaded  And  Stroage/////////////////////

  async uploadFile(file) {
    try {
      // Provide permissions so Appwrite allows file creation from the client.
      // Using "role:all" makes the file readable by everyone; adjust as needed.
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );

    } catch (error) {
      console.error('Appwrite Server:: uploadFile error::', error);
      throw error;
    }
  }







  ///////////////////////////////// Delete File And Stroage/////////

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        {
          bucketId: conf.appwriteBucketId,
          fileId
        }
      );

    } catch (error) {
      console.error('appWrite Server::  deleteFile error::', error)
      throw error

    }
  }

  //////////////////////////////// File Prewiew And Stroage////////////

  getFilePreview(fileId) {
    const bucketId = conf.appwriteBucketId;
    const result = this.storage.getFileView(bucketId, fileId);
    console.log(`getFilePreview - Bucket: ${bucketId}, File: ${fileId}, Result:`, result);
    if (!result) {
      console.error('getFilePreview returned null or undefined');
    }
    return result;
  }

  //////////////////////////////////////// File Download And Stroage/////////

  getFileDownload(fileId) {
    return this.storage.getFileDownload(
      conf.appwriteBucketId,
      fileId
    );
  }


}


const appwriteService = new DatabaseService();


export default appwriteService

