/* eslint-disable @typescript-eslint/no-var-requires */
// jest.setup.js
const { TextEncoder, TextDecoder } = require('util');
const fetch = require('node-fetch');
const { Response, Request } = fetch;

// Global nesneleri tanımlayın
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.Response = Response;
global.Request = Request;
