# specio
Small app for generating buckets and storing requests

![spectacles](http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/glasses.png)

## Setup

### Typical Setup
1. Align _configs.js_ and environment with Mongo info
2. `npm install`
3. `npm start`
4. Navigate to `localhost:<PORT_USED>/api-docs`

### Docker
```
$ docker-compose -f deploy/compose/docker-compose.yaml up --build
```

## New Mongo DB setup (_if using mlab_)
1. Visit https://mlab.com/home
2. Click 'Create New'
3. You can choose whatever free plan you like, (_typically AWS_)
4. Create a db user in mlab (_typically system:system1_)
5. Finally, copy the `mongoUrl` and `dbName` into the `configs.js`

## Deploy
> Execute `npm run publish` to publish to NOW

> **Protip: If you don't have Mongo, make sure to setup/install [that](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) first**
>  * After install, do `$ mongo` to kick off the Mongo shell and on prompt, type `$ use neverland`
>  * Do `$ mongod` to start the db