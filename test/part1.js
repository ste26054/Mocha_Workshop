var expect = require('expect.js');
var should = require('should');
var assert = require('assert');
var request = require('request');
var Q = require('q');




describe('Some synchronous tests', function(){ //A bench of tests
  

   it('should success to solve 1+1=2', function(){  //A single test. It will pass if every single assertion is true
   	

    assert.equal(1+1, 2); //Assertion using node's assert module
    (1+1).should.equal(2);  //Assertion using should
    expect(1+1).to.equal(2);  //Same assertion using expect


   });

   /*it('should fail because one assertion will fail', function(){
      expect(true).to.be.ok();
      expect(1+1).to.equal(3);
      expect()
   });*/




   it('Should success to pass all these assertions', function(){  //Another test

      assert.ok(true);
      expect(true).to.be.ok();
      (true).should.be.ok;
      
      assert.equal([1,2,3].length > 2, true);
      ([1,2,3].length).should.be.above(2);
      expect([1,2,3].length).to.be.above(2);

      
      expect({ a: 'b', c: 'd' }).to.only.have.keys('a', 'c');
      expect({property: 'value'}).to.have.property('property');
      
      expect([1,2,3]).to.not.be('empty');


      

      
   });

});






describe('Some asynchronous tests', function(){
  this.timeout(10000);

   it('should success to pass this simple asynchronous test', function(done){ //Test runs until done() function is called or timeout exceeded
      
      var timeout = 3000;
      setTimeout(function(){
         //During asynchronous call, we can make assertions 
         expect(timeout).to.be.within(1000, Infinity);
          done();
      }, timeout);
   });

   it('Should success to pass this terrible test', function(done){
      var i = 0;
      setTimeout(function(){
        i++;
        setTimeout(function(){
          i++;
          setTimeout(function(){
            i++;
            setTimeout(function(){
              i++;
              setTimeout(function(){
                i++;
                  expect(i).to.equal(5);
                  done();

              }, 100* Math.random());
            }, 100* Math.random());
          }, 100* Math.random());
        }, 100* Math.random());
      }, 100* Math.random());
   });

  

 it('should success to pass this better test which uses deferred objects', function(done){


  var i = 0;
  var test = function(){
      var rand = 100 * Math.random();
      var d = Q.defer();
      setTimeout(function(){
        i++;
        d.resolve();
      }, rand);
      return d.promise;
  };

  Q.fcall(test)
  .then(test)
  .then(test)
  .then(test)
  .then(test)
  .then(function(){
    expect(i).to.equal(5);
    done();
  })
  .done();
  


 });

});



