'use strict';
import PasswordFactory from '../../../lib/password.factory';

describe('Unit test for Password Factory', () => {

    it('should generate a password hash', () => {
        let hash = PasswordFactory.create('123456');

        assert.ok(hash);
    });

    it('should compare a hash', () => {
        let hash = '$2a$10$KZ92IFsi2kt3wTcFthLVKuAtaVaQHfqTCNvnFdsQUU2O07zV7Cmi.';
        let result = PasswordFactory.compare('123456', hash);
        
        assert.ok(result, true);
    });
});