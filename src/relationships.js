module.exports = module.exports = [
  {
    "name" : "accessProfileData",
    "request" : {
      "method" : "GET",
      "endpoint" : "http://localhost:8181/profile/"
    },
    "contracts" : [
      {
        "required" : {
          "params" : null,
          "headers" : null,
          "body" : null,
          "query" : {
            "key": "Chave de permissão de acesso aos meus dados pessoais"
          }
        }
      }
    ]
  }
];