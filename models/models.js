const mongoose = require('mongoose'),
      removeId = require('mongoose-id'),
      Schema = mongoose.Schema;

const timestamps = {createdAt: 'createdDate', updatedAt: 'updatedDate'};

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
  },
  bucket: {type: Schema.Types.ObjectId, ref: 'Bucket'},
  bucketName: String
}, 
{ 
  versionKey: false, // removes __v field since we don't need
  timestamps
});

//TODO - handle this another way only requirement is to return `id` instead of `_id`
request.plugin(removeId)

const bucket = new Schema({
  //owner: {type: String, required: true},
  name: {type: String, required: true}
},
{
  versionKey: false,
  timestamps
})
//TODO - handle this another way only requirement is to return `id` instead of `_id`
bucket.plugin(removeId);


const models = {
  Request: mongoose.model('Request', request, 'Requests'),
  Bucket: mongoose.model('Bucket', bucket, 'Buckets')
}
module.exports = models;