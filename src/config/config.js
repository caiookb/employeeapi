const env = process.env.NODE_ENV || "dev";

const config = () => {
  switch (env) {
    case "dev":
      return {
        bd_string: "mongodb://localhost/employee-local",
        jwt_secret: "epapi",
        jwt_expires_in: "7d",
        jwtSession: { session: false },
      };

    case "hml":
      return {
        bd_string: "",
      };

    case "production":
      return {
        bd_string:
          "mongodb+srv://caio:wM5hrUqekIOsK9UG@employees.kgekk.mongodb.net/employee>?retryWrites=true&w=majority",
        jwt_secret: "epapi",
        jwt_expires_in: "7d",
        jwtSession: { session: false },
      };
  }
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
