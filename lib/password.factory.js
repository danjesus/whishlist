'use strict';

import bcrypt from 'bcrypt';

export default class PasswordFactory {
    static create(password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        return hash;
    }

    static compare(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}