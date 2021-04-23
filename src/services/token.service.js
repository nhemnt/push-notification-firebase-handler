import { database } from "../firebase";

const db = database.ref("/tokens");

class TokenDataService {
  getAll() {
    return db;
  }

  create(token) {
    return db.push(token);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new TokenDataService();