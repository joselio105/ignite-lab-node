import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json"

const config: Config = {
    moduleFileExtensions: [
      "js",
      "json",
      "ts"
    ],
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
      "**/*.(t|j)s"
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/'
    }),
    coverageDirectory: "../coverage",
    testEnvironment: "node"
  }

  export default config;