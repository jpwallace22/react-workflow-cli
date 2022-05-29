"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALREADY_INIT = exports.PROJ_INIT = exports.WRONG_PATH_MSG = exports.HELP_MSG = void 0;
var config_1 = require("./config");
var chalk_1 = __importDefault(require("chalk"));
exports.HELP_MSG = "\n".concat(chalk_1.default.blue("Name"), "\n    react-workflow-cli \u2014 react cli to create templated component\n\nDESCRIPTION\n    react-workflow-cli allows to create react components easily providing an interface\n    implement your own template.\n\nSYNOPSIS\n    react-workflow-cli <command> [name] [options]\n\nAVAILABLE COMMAND:\n    init    initialize the cli\n    config  change the default settings of the cli. you need to initialize the cli before\n    add     creates a new component using the provided name. default path: '").concat(config_1.DEFAULT_PATH, "'\n\nOPTIONS\n    -path   override default path.\n\nCOPYRIGHT\n    react-workflow-cli is available under the MIT license.\n    react-workflow-cli also includes external libraries that are available under MIT license.\n\nSEE ALSO\n    GitHub repository & Issue Tracker: https://github.com/gventuri/create-react-component\n    Npmjs: https://www.npmjs.com/package/react-workflow-cli\n    Website:\n    Documentation:\n\nAUTHORS\n    Justin Wallace (https://github.com/jpwallace22)\n\nCONTRIBUTORS\n    Gianni Valdambrini (https://github.com/gvaldambrini)\n    Roberto Di Lillo (https://github.com/koop4)\n    Valentino Gagliardi (https://github.com/valentinogagliardi/)\n");
exports.WRONG_PATH_MSG = "The path provided is wrong";
exports.PROJ_INIT = "The project has been initialized";
exports.ALREADY_INIT = "The project has already been initialized";
