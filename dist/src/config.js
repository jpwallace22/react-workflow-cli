"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DIR = exports.DIR = exports.DEFAULT_PATH = exports.CONFIG = void 0;
var fs_1 = __importDefault(require("fs"));
exports.CONFIG = fs_1.default.existsSync(".react-templates/config.json")
    ? JSON.parse(fs_1.default.readFileSync(".react-templates/config.json", "utf-8"))
    : {};
exports.DEFAULT_PATH = exports.CONFIG.path || "src/components";
exports.DIR = fs_1.default.existsSync(".react-templates")
    ? ".react-templates"
    : __dirname + "/../templates";
exports.DEFAULT_DIR = ".react-templates";
