import fs from "fs";
import chalk from "chalk";

/**
 * @param name name you wish to change everything to
 * @param path the path of the directory
 */
export const renameEntireDir = (name: string, path: string) => {
  const files = fs.readdirSync(path);

  files.forEach(file => {
    const newName = file.replace("$name", name);
    fs.rename(
      `${path}/${file}`,
      `${path}/${newName}`,
      err => err && console.log(err)
    );
  });
};

/**
 * @param msg the message you want displayed on the warning
 */
export const warnAndExit = (msg: string) => {
  console.log(chalk.yellow(msg));
  process.exit(-1);
};

/**
 * CREATE FILE
 */
const createFile = (file: string, name: string, path: string) => {
  let fileName = file.replace("$name", name);

  if (fs.existsSync(`${path}/${name}/${fileName}`)) {
    console.log(`File "${fileName}" already exists, skipping.`);
    return;
  }

  const data = fs.readFileSync(`${TEMPLATE_DIR}/${file}`, "utf-8");

  const parsed = parser(data);
  const tags: { tag: string; name: string }[] = _.get(parsed, "0.tags", []);
  tags.map(({ tag, name }) => {
    if (tag === "caseType") {
      const splittedFilename = fileName.split(".");
      fileName = `${_[name](
        splittedFilename.slice(0, splittedFilename.length - 1).join(".")
      )}.${splittedFilename.slice(splittedFilename.length - 1)[0]}`;
    }
  });

  const regex = /\$+(\()?name+(, )?(\{([\D]{0,})?\})?(\))?/gm;
  const finalData = data.replace(regex, function (match, _p1, _p2, p3) {
    let newName = name;

    if (p3) {
      _.map(JSON.parse(p3), (value, key) => {
        if (key === "caseType") newName = _[value](newName);
      });
    }

    return newName;
  });

  fs.writeFileSync(`${path}/${name}/${fileName}`, finalData, (err: string) => {
    if (err) {
      console.log(chalk.yellow(`Cannot create "${fileName}"`));
    } else {
      console.log(chalk.green(`"${fileName}" has been created`));
    }
  });
};

/**
 * ADD
 */
//   add(name: string, path: string = DEFAULT_PATH) {
//     if (!fs.existsSync(path)) warnAndExit(messages.WRONG_PATH_MSG);

//     try {
//       fs.mkdirSync(`${path}/${name}/`, { recursive: true });
//     } catch (err) {
//       warnAndExit(`Cannot create the directory "${path}/${name}".`);
//     }

//     const templates = fs
//       .readdirSync(TEMPLATE_DIR)
//       .filter(
//         file =>
//           file !== "config.json" &&
//           (CONFIG.storybook === true || file !== "$name.stories.js")
//       );
//     for (let template of templates) createFile(template, name, path);
//   }
// }
