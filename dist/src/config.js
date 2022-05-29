import fs from "fs";
export const CONFIG = fs.existsSync(".react-templates/config.json")
    ? JSON.parse(fs.readFileSync(".react-templates/config.json", "utf-8"))
    : {};
export const DEFAULT_PATH = CONFIG.path || "src/components";
export const DIR = fs.existsSync(".react-templates")
    ? ".react-templates"
    : __dirname + "/../templates";
export const DEFAULT_DIR = ".react-templates";
