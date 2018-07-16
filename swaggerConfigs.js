module.exports = {
  swaggerDefinition: {
      info: {
          description: 'Create buckets and send requests to them for inspection',
          title: 'Specio',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      produces: [
          "application/json"
      ],
      schemes: ['http', 'https'],
  },
  basedir: __dirname,
  files: ['./routers/buckets.js','./routers/requests.js'] 
}