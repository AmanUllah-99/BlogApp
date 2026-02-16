import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


/////////////////////// Class And Constructor

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setProject(conf.appwriteProjectId)
            .setEndpoint(conf.appwriteURL)
        this.account = new Account(this.client);
    }
    ///////////////////////////   In  Users Account Session
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                {
                    userId: ID.unique(),
                    email: email,
                    password: password,
                    name: name
                }
            );
            if (userAccount) {
                /////call another method to login
                await this.userLogin({ email, password });
                // Update user name after login
                if (name) {
                    await this.updateUserName(name);
                }
                // Return the user account with userId ($id)
                return userAccount;

            } else {
                return userAccount;
            }

        } catch (error) {
            console.log(' Appwirte Service :  createAccount failed:', error);
            throw error

        }
    }

    /////////////////////// Update User Name
    async updateUserName(name) {
        try {
            return await this.account.updateName(name)
        } catch (error) {
            console.log(' Appwirte Service :  updateUserName error:', error);
            throw error;
        }
    }


    ///////////////////////  In Login Session
    async userLogin({ email, password }) {
        try {

            return await this.account.createEmailPasswordSession(
                {
                    email: email,
                    password: password
                }
            )
        } catch (error) {
            console.log('  Appwirte Service :  userLogin Failed:', error);
            throw error


        }
    }

    //////////////////// Get Current Logged-in User

    async getCurrentUser() {
        try {
            const user = await this.account.get()
            console.log('getcurrentuser', user);

            return user;
        } catch (error) {
            console.log(' Appwirte Service :  getCurrentUser error  :', error);
            throw error;
        }

    }

    ///////////////////////// In User Logged-out  Session

    async userLogout() {
        try {
            return await this.account.deleteSessions();

        } catch (error) {
            console.log(' Appwirte Service :  logout  error:', error);
            throw error
        }
    }

    /////////////////////// Update User Password

    async updateUserPassword(newPassword, oldPassword) {

        try {
            return await this.account.updatePassword(
                {
                    newPassword: newPassword,
                    oldPassword: oldPassword
                }
            )

        } catch (error) {
            console.log('appwrite Service :: updateUserPassword:: ', error);

            throw error;


        }


    }

}

///// create a object to store above class. 
const authService = new AuthService();

/////////////// Exporting

export default authService