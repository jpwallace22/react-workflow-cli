import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const CONFIG = fs.existsSync(".react-templates/config.json")
    ? JSON.parse(fs.readFileSync(".react-templates/config.json", "utf-8"))
    : {};
export const DEFAULT_PATH = CONFIG.path || "src/components";
export const TEMPLATE_DIR = fs.existsSync(".react-templates")
    ? ".react-templates"
    : path.dirname(fileURLToPath(import.meta.url)) + "/../templates";
export const DEFAULT_TEMPLATE_DIR = ".react-templates";
