import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bugtracker",
      version: "0.0.1",
    },
  },
  apis: ["**/*.ts"],
};

export const openapiSpecification = swaggerJSDoc(options);
