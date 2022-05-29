"use strict";
var fs = require("fs");
var CONFIG = fs.existsSync(".react-templates/config.json")
    ? JSON.parse(fs.readFileSync(".react-templates/config.json", "utf-8"))
    : {};
var DEFAULT_PATH = CONFIG.path || "src/components";
var DIR = fs.existsSync(".react-templates")
    ? ".react-templates"
    : __dirname + "/../templates";
var DEFAULT_DIR = ".react-templates";
module.exports = { CONFIG: CONFIG, DEFAULT_PATH: DEFAULT_PATH, DIR: DIR, DEFAULT_DIR: DEFAULT_DIR };
