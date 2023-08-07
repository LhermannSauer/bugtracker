import fs from "fs";
import path from "path";
import YAML from "yaml";

const swaggerFile = fs.readFileSync(
  path.join(__dirname, "/swagger.yaml"),
  "utf8"
);

export const swaggerSpec = YAML.parse(swaggerFile);
