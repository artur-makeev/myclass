const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyClass",
      version: "1.0.0"
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || "2115"}/`
      }
    ]
  },
  apis: ['./router.js']
};

module.exports = options;