'use strict';

import supertest from 'supertest';
import app from '../index.js';
import assert from 'assert';

global.app = app;
global.assert = assert;
global.request = supertest(app);
