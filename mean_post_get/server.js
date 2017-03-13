var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//var $ = jQuery = require('jquery')(window);

var cors = require('cors');

var Promise = require("native-promise-only");

var p = new Promise(function(resolve,reject){
    var a = "aaaaaaaaaaaaaaa11111";
    //setTimeout(function(){
        resolve(a);
    //},5000);
});

var p1 = new Promise(function(resolve,reject){
    var a = "oooookkkkk";
    setTimeout(function(){      
        resolve(a);
    },5000);
});

var p3 = function(){
   return 'bbb';
}

p.then(function(msg){
    console.log(msg); // Yay!
}).then(function(){
    console.log('aaaaa222222'); // Yay!
}).then(function(){
    console.log(p3());
});

p1.then(function(jj){console.log(jj);});



var MongoClient = require('mongodb').MongoClient;

var colectionMongoDb = 'Record';







var addRecordMongo = function(collectionName,record,res){
  
    MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
     
	     if(err) throw err;
            
	     db.collection(collectionName, function (err, collection) {
	        collection.insert({ item: record }, function(err, r) {
		          db.close();	
              getRecord(res);
	        });
	     });
    });  
    
    
}




function getRecordMongo(collectionName){
  
  MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
     
    if(err) throw err;
            
    db.collection('Record', function (err, collection) {
      collection.find().toArray(function(err, items) {
        if(err) throw err;
        console.log('service items from mongodb '+items);
        
        setTimeout(function(){ 
          return items;
        },5000);
        db.close();
        /*
        res.setHeader('content-type', 'application/json');      
        res.json({ 'responseAction': result });
        */
      });
    });
  }); 
  

  
  //db.collection('Record', function (err, collection) {
  //     
  //     collection.find().toArray(function(err, items) {
  //         if(err) throw err;    
  //         console.log(items);
  //         mongoMessage = items.length;            
  //     });
  //     
  //   });
}





// MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
//    
//   if(err) throw err;
//     
//        
//   db.collection('Record', function (err, collection) {
//           
//     collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
//     collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
//     collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
//      
//   });   
//          
//  
//   db.collection('Record').count(function (err, count) {
//     
//     if (err) throw err;             
//     console.log('Total Rows: ' + count);
//     
//   });
//          
//          
//   db.collection('Record', function (err, collection) {
//     
//     collection.update({id: 1}, { $set: { firstName: 'James', lastName: 'Gosling'} }, {w:1}, function(err, result){
//       if(err) throw err;    
//       console.log('Document Updated Successfully');
//     });
//     
//   });
//   
//   
//   db.collection('Record', function (err, collection) {
//     
//     collection.remove({id:2}, {w:1}, function(err, result) {        
//         if(err) throw err;            
//         console.log('Document Removed Successfully');
//     });
//     
//   });
//     
//     
//   db.collection('Record', function (err, collection) {
//     
//     collection.find().toArray(function(err, items) {
//         if(err) throw err;    
//         console.log(items);
//         mongoMessage = items.length;            
//     });
//     
//   });
//          
//      
//                 
// });








var app = express();

app.use(cors());
//app.use(bodyParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//app.use( express.static( __dirname + '/public' ));
app.use( express.static( __dirname + '/public'));



//app.use('/node_modules', express.static(__dirname + '/node_modules/'));
//app.use('/node_modules', express.static('node_modules'));
app.use( express.static( __dirname + '/node_modules'));


app.get('*',function(req, res){
       
     //res.sendFile( __dirname + "/" + "index.html" );
     res.sendFile( __dirname + '/public/index.html' );
});

/*
app.get('/city',function(req, res){
       
     //res.sendFile( __dirname + "/" + "index.html" );
     res.sendFile( __dirname + '/public/index.html' );
});
*/





app.post('/add',function(req, res){
  var thing = req.body.thingInput;
  //var thingDoc = new thingModel({thing: thing});
  console.log(thing);
  
  //res.setHeader('content-type', 'application/json');
  //res.json({ a: 1 });
  //res.send(thing);
  /*thing.Doc.save(function(){
    res.send();
  });*/
});


app.post('/townAdd',function(req, res){
  var tic = req.body.townItemClient;

  console.log(tic);
  
  res.setHeader('content-type', 'application/json');
  res.json({ townA: 'server town response' });

});










/* list past start */



var getRecord = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
  
      if(err) { 
        reject(err); return; 
      }
            
      db.collection('Record', function (err, collection) {
  
        collection.find().toArray(function(err, items) {
  
          if(err) { 
            reject(err); return; 
          }
          
          console.log('service items from mongodb '+items);
          console.log('pr next'+items);
          resolve(items);
          db.close();
  
        });
  
      });
  
    });
  
  });
  
};


var getMaxObjArray = function(objArr) {
  var maxObjArr = 0;
  for(var i in objArr){
    if(objArr[i].id > maxObjArr){
      maxObjArr = objArr[i].id;
    }
  }
  return maxObjArr;
}

var addRecord = function(collectionName,record){

  return new Promise(function(resolve, reject) {

    MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
              
	     if(err){
         reject(err);
         return;
       }
           
         
       db.collection(collectionName, function (err, collection) {
         
         
          collection.find().toArray(function(err, items) {
   
            if(err) { 
              reject(err); return; 
            }
           
            console.log('service items from mongodb '+items);
            console.log('pr next'+items);

            
            var maxRecord = getMaxObjArray(items);
            console.log(maxRecord);  
              
            collection.insert({ id: maxRecord+1, item: record }, function(err, result) {
              
              if(err) { 
                reject(err); 
                return;            
              }
              
              db.close();	            
              resolve(result);
              
  	        });  
              
          });
         
          
          
	     });
         
         
         
         
      
            
	     
       
    });  
    
  });
    
}



var removeRecord = function(collectionName,recordId){

  return new Promise(function(resolve, reject) {

    MongoClient.connect("mongodb://localhost:27017/mean", function (err, db) {
     
	     if(err){
         reject(err);
         return;
       }
            
	     db.collection(collectionName, function (err, collection) {
         
	        collection.remove({id:recordId}, {w:1}, function(err, result) {        
            if(err) { 
              reject(err); 
              return;            
            }
            console.log('Removed Successfully');
            
            db.close();	            
            resolve(result);
            
          });
          
	     });
       
    });  
    
  });
    
}


app.post('/getRecord',function(req, res){
  var actionClient = req.body.action;
  console.log(actionClient);

  getRecord().then(function(items){
    res.setHeader('content-type', 'application/json');
    res.json({ 'responseAction': items });
    res.end();
  });    

});



app.post('/addRecord',function(req, res){
  var actionClient = req.body.action;
  console.log(actionClient);
  
  var recordAddClient = req.body.recordAddClient;

  console.log(recordAddClient);
  
  addRecord(colectionMongoDb,recordAddClient)
    .then(function(result){
      getRecord()
        .then(function(items){
          res.setHeader('content-type', 'application/json');
          //res.json({ 'responseAddRecord': ' record ' + recordAddClient + ' added to mongodb', 'newItems':items });
          res.json({ 'responseAction': items });
          res.end();
        });
    });
  
  
  
  
});

app.post('/removeRecord',function(req, res){
  var actionClient = req.body.action;
  console.log(actionClient);
  
  var recordRemoveClient = req.body.recordRemoveClient;

  console.log(recordRemoveClient);
  
  removeRecord(colectionMongoDb,recordRemoveClient)
    .then(function(result){
      
      return getRecord();
      
    })
    .then(function(items){
      
      res.setHeader('content-type', 'application/json');
      //res.json({ 'responseAddRecord': ' record ' + recordAddClient + ' added to mongodb', 'newItems':items });
      res.json({ 'responseAction': items });
      res.end();       
        
    });
  
  
  
  
});




/* list part end */




var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port' + port + '...' + __dirname );
