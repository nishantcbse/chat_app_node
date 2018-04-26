let request = require('supertest'),
assert = require('assert'),
rewire = require('rewire'),
app = rewire("./server.js"),
expect = require('expect.js'),
url =app.listeningPort;


console.log("starting logger...");

console.log("base url..............", url)

describe("Testing Routes", ()=> {
 
    it('returns a HTML document for / route', (done)=> {
      request(url)
        .get('/')
        .expect(200)
        .end((err, res)=> {
          expect(res.text.substring(0, 15)).to.eql('<!doctype html>')
          app.closeServer()
          done()
        });
    });
});