import bcrypt from 'bcrypt';

export default class PasswordFactory {
  static create(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  static compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
