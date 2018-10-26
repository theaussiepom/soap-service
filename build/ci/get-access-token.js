const { request } = require("https");
var querystring = require('querystring');
const { parse } = require("url");

var post_data = querystring.stringify({
  grant_type: "refresh_token",
  refresh_token: (process.argv[3] || process.env.BITBUCKET_REFRESH_TOKEN)
});

const options = {
  ...parse("https://bitbucket.org/site/oauth2/access_token"),
  headers: {
    "Accept": "*/*",
    "Authorization": "Basic " + (process.argv[2] || process.env.BITBUCKET_AUTHORIZATION),
    "Content-Type": "application/x-www-form-urlencoded",
    'Content-Length': Buffer.byteLength(post_data)
  },
  method: "POST",
};

const req = request(options, (res) => {
  let body = "";

  res.on("data", (chunk) => body += chunk.toString());

  res.on("end", () => {
    try {
      const reply = JSON.parse(body);
      if (reply.access_token) {
        console.log(reply.access_token);
      }
    } catch (err) {
      // do nothing
    }
  });
});

req.write(post_data);
req.end();
