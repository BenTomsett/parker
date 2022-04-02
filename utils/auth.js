const crypto = require('crypto');

const generateAccessToken = (user) => {
  const { email, forename, surname } = user;

  const iat = Math.floor(Date.now() / 1000); // time in seconds since unix epoch
  const exp = iat + 86400; // token expires after 24 hours

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload = {
    sub: email,
    forename,
    surname,
    iat,
    exp,
  };

  const headerEncoded = Buffer.from(JSON.stringify(header)).toString(
    'base64url'
  );
  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString(
    'base64url'
  );

  const digest = crypto
    .createHmac('sha256', process.env.JWT_SECRET)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest('base64url');

  return `${headerEncoded}.${payloadEncoded}.${digest}`;
};

const verifyAccessToken = (token) => {
  // Check that the JWT is well-formed
  // 1. Verify that the JWT contains three segments, separated by two period
  // characters
  const split = token.split('.');
  if (split.length !== 3) {
    console.error('Not three segments');
    return false;
  }
  // 2. Parse the JWT to extract its three components. The first segment is the
  // Header, the second is the Payload, and the third is the Signature. Each
  // segment is base64url encoded.
  const headerEncoded = split[0];
  const payloadEncoded = split[1];
  const signatureEncoded = split[2];
  // 3. Base64url-decode the Header, ensuring that no line breaks, whitespace,
  // or other additional characters have been used, and verify that the decoded
  // Header is a valid JSON object.
  const headerDecoded = Buffer.from(headerEncoded, 'base64url').toString();
  let header;
  try {
    header = JSON.parse(headerDecoded);
  } catch (e) {
    console.error('Not valid JSON: header');
    return false;
  }
  // 3. Base64url-decode the Payload, ensuring that no line breaks, whitespace,
  // or other additional characters have been used, and verify that the decoded
  // Payload is a valid JSON object.
  const payloadDecode = Buffer.from(payloadEncoded, 'base64url').toString();
  let payload;
  try {
    payload = JSON.parse(payloadDecode);
  } catch (e) {
    console.error('Not valid JSON: payload');
    return false;
  }

  // Check signature
  // 1. Check the signing algorithm.
  if (header.alg !== 'HS256') {
    console.error('Wrong algorithm');
    return false;
  }

  // 2. Confirm that the token is correctly signed using the proper key.
  const digest = crypto
    .createHmac('sha256', process.env.JWT_SECRET)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest('base64url');

  if (digest !== signatureEncoded) {
    console.error('Invalid signature');
    return false;
  }

  // Check standard claims
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime > payload.exp) {
    console.error('Expired');
    return false;
  }

  return true;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const strongPassRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  emailRegex,
  strongPassRegex,
};
