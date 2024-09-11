/* eslint-disable @typescript-eslint/no-var-requires */
const { TextEncoder, TextDecoder } = require('util');
const fetch = require('node-fetch');
const { Response, Request } = fetch;

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.Response = Response;
global.Request = Request;
