const mongoose = require('mongoose'),
      Schema = mongoose.Schema;



  const request = new Schema({
    url: {type: String, required: true},
    headers: {
      type: Map,
      of: Schema.Types.Mixed
    },
    body: Schema.Types.Mixed,
    method: {type: String, required: true},
    params: {
      type: Map,
      of: Schema.Types.Mixed
    }
  },
  {
    versionKey: false // removes __v field since we don't need
  });

  const bucket = new Schema({
    //owner: {type: String, required: true},
    bucket: {type: Schema.Types.ObjectId, ref: 'Bucket'},
    createdDate: {type: Date, required: true},
    updatedDate: {type: Date, required: true}
  },
  {
    versionKey: false 
  })

  const models = {
    Request: mongoose.model('Request', request, 'Requests'),
    Bucket: mongoose.model('Bucket', bucket, 'Buckets')
  }
  module.exports = models;
