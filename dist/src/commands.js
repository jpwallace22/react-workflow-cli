"use strict";
var fs = require("fs");
var inquirer = require("inquirer");
var messages = require("./messages");
var parser = require("comment-parser");
var _ = require("lodash");
var CONFIG = require("./config").CONFIG;
var DEFAULT_PATH = require("./config").DEFAULT_PATH;
var DIR = require("./config").DIR;
var DEFAULT_DIR = require("./config").DEFAULT_DIR;
var Commands = /** @class */ (function () {
    function Commands() {
    }
    /**
     * HELP
     */
    Commands.prototype.help = function () {
        console.log(messages.HELP_MSG);
    };
    /**
     * INIT
     */
    Commands.prototype.init = function () {
        var _this = this;
        try {
            if (DIR === DEFAULT_DIR)
                warnAndExit(messages.ALREADY_INIT);
            fs.mkdirSync(DEFAULT_DIR, { recursive: true });
            var files = fs.readdirSync(DIR);
            var _loop_1 = function (file) {
                var data = fs.readFileSync("".concat(DIR, "/").concat(file), "utf-8");
                fs.writeFile("".concat(DEFAULT_DIR, "/").concat(file), data, function (err) {
                    if (err) {
                        console.log("Cannot create \"".concat(file, "\""));
                    }
                    else {
                        console.log("\"".concat(file, "\" created"));
                    }
                });
            };
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                _loop_1(file);
            }
            setTimeout(function () { return _this.config(); }, 200);
            console.log(messages.PROJ_INIT);
        }
        catch (err) {
            console.log(err);
            warnAndExit("Cannot create the directory \"".concat(DEFAULT_DIR, "\"."));
        }
    };
    /**
     * CONFIG
     */
    Commands.prototype.config = function () {
        var questions = [
            {
                type: "input",
                name: "path",
                message: "Please, provide the path where your components will be stored",
                default: "src/components"
            },
            {
                type: "confirm",
                name: "storybook",
                message: "Do you want to enable the support for Storybook?",
                default: true
            }
        ];
        inquirer.prompt(questions).then(function (answers) {
            try {
                fs.writeFileSync("".concat(DEFAULT_DIR, "/config.json"), JSON.stringify(answers));
            }
            catch (err) {
                warnAndExit("You need to initialize the cli before you configure it.");
            }
        });
    };
    /**
     * ADD
     */
    Commands.prototype.add = function (name, path) {
        path = path || DEFAULT_PATH;
        if (!fs.existsSync(path))
            warnAndExit(messages.WRONG_PATH_MSG);
        try {
            fs.mkdirSync("".concat(path, "/").concat(name, "/"), { recursive: true });
        }
        catch (err) {
            warnAndExit("Cannot create the directory \"".concat(path, "/").concat(name, "\"."));
        }
        var templates = fs
            .readdirSync(DIR)
            .filter(function (file) {
            return file !== "config.json" &&
                (CONFIG.storybook === true || file !== "$name.stories.js");
        });
        for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
            var template = templates_1[_i];
            createFile(template, name, path);
        }
    };
    return Commands;
}());
/**
 * CREATE FILE
 */
var createFile = function (file, name, path) {
    var fileName = file.replace("$name", name);
    if (fs.existsSync("".concat(path, "/").concat(name, "/").concat(fileName))) {
        console.log("File \"".concat(fileName, "\" already exists, skipping."));
        return;
    }
    var data = fs.readFileSync("".concat(DIR, "/").concat(file), "utf-8");
    var parsed = parser(data);
    var tags = _.get(parsed, "0.tags", []);
    tags.map(function (_a) {
        var tag = _a.tag, name = _a.name;
        if (tag === "caseType") {
            var splittedFilename = fileName.split(".");
            fileName = "".concat(_[name](splittedFilename.slice(0, splittedFilename.length - 1).join(".")), ".").concat(splittedFilename.slice(splittedFilename.length - 1)[0]);
        }
    });
    var regex = /\$+(\()?name+(, )?(\{([\D]{0,})?\})?(\))?/gm;
    var finalData = data.replace(regex, function (match, _p1, _p2, p3) {
        var newName = name;
        if (p3) {
            _.map(JSON.parse(p3), function (value, key) {
                if (key === "caseType")
                    newName = _[value](newName);
            });
        }
        return newName;
    });
    fs.writeFileSync("".concat(path, "/").concat(name, "/").concat(fileName), finalData, function (err) {
        if (err) {
            console.log("Cannot create \"".concat(fileName, "\""));
        }
        else {
            console.log("\"".concat(fileName, "\" has been created"));
        }
    });
};
/**
 * WARN AND EXIT
 */
var warnAndExit = function (error) {
    console.warn(error);
    process.exit(-1);
};
module.exports = Commands;
