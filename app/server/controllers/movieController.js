var Movie = require('../models/movie');

module.exports.addMovie = function(req,resp){
  var movie = new Movie(req.body);
  console.log(movie);
   movie.save(function(err,result){
       resp.json(result);
   });
}

module.exports.getListOfMovies = function(req,res){
    Movie.find({}, function(err,results){
        res.json(results);
    })
}

module.exports.deleteMovie = function(req,res){
  var id= req.params.MongoID;
  Movie.remove({_id:id},function(err,result){
    res.json(result);
  })
}

// module.exports.getMyData = function(req,res){
//   var id=req.params.MongoID;
//   Movie.find({_id:id},function(err,result){
//     if(err)
//       console.log("error in getting the individual data");
//     else
//       res.json(result);
//   })
// }
module.exports.getMyData = function(req,res){
  var id=req.params.MongoID;
  Movie.findOne({_id:id}).lean().exec(function (err, docs) {
    // docs are plain javascript objects instead of model instances
    if(err)
      console.log("error in getting the individual data");
    else
      res.json(docs);
  })
}
module.exports.updateMyData = function(req,res){
  var id=req.params.MongoID;
  var query = {'_id':id};
  console.log(req.body);
  Movie.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.json(doc);
});


}
