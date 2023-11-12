import FakeDatabase from "../../FakeDatabase";

export default class UserModel {
  constructor(private fakeDb: FakeDatabase) {

  }

  createUser(name: string) {
    return this.fakeDb.createFakeUser(name);
  }
}
