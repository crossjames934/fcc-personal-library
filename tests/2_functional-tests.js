/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
         chai.request(server)
          .post('/api/books')
          .type('form')
          .send({
            title: "I am a book"
          })
          .end(function(err, res){
             assert.equal(res.status, 200);
             assert.equal(res.body.title, "I am a book");
             done();
         });        
      });
      
      test('Test POST /api/books with no title given', function(done) {
         chai.request(server)
          .post('/api/books')
          .type('form')
          .send({
            title: ""
          })
          .end(function(err, res){
             assert.equal(res.status, 200);
             assert.equal(res.text, "You cannot submit a book with no title");
             done();
         });  
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isString(res.body[0].title);
            assert.isNumber(res.body[0].commentcount);
            done();
        })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/aNonesenseIdThatDoesNotExist')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, "Book with that ID does not exist");
            done();
        })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get('/api/books/5c3df2ec0679f72bcad2c89f')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.title, "Book about Being A Badman");
            done();
        })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/5c3df2ec0679f72bcad2c89f')
          .type('form')
          .send({
            comment: "I am badman and I did not agree with this book"
          })
          .end(function(err, res){
             assert.equal(res.status, 200);
             assert.equal(res.body.comments[res.body.comments.length-1], "I am badman and I did not agree with this book");
             done();
        })
      });
      
    });

  });

});