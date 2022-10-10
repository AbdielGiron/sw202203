import { getConnection } from "@models/sqlite/SqliteConn";
import { UserDao } from "@models/sqlite/UserDao";
export interface IUser {
  type: 'INCOME' | 'EXPENSE';
  address: string;
  number: number;
  lastName: string;
  name: string;
  IDE: string;
  _id?: unknown;
};
export class User {
  private dao: UserDao;
  public constructor(){
    getConnection()
      .then(conn=>{
        this.dao = new UserDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  // Consultas
  public getAllUser() {
    return this.dao.getUsers();
  }
  public getUserByIndex( index:number) {
      return this.dao.getUserById({_id:index});
  }

  public addUser( newUser:IUser) {
    return this.dao.insertNewUser(newUser);
  }
  public updateUser( index:number, user:IUser){
   return this.dao.update({_id:index}, user);
  }
  public deleteUser( index:number) {
    return this.dao.deleteUser({_id:index});
  }
}
