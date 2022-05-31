import fs from "fs";
import chalk from "chalk";
import path from "path";

/**
 * @param msg the message you want displayed on the warning
 */
export const warnAndExit = (msg: string) => {
  console.log(chalk.yellow(msg));
  process.exit(-1);
};

/**
 * @param file original filename
 * @param name new filename
 * @param originPath origin path of dir with files
 * @param newPath new path of dir with files
 */
export const readAndWrite = (
  file: string,
  name: string,
  originPath: string,
  newPath: string
) => {
  const regex = /\$+(\()?name+(, )?(\{([\D]{0,})?\})?(\))?/gm;
  try {
    const data = fs.readFileSync(originPath, "utf-8");
    const updatedData = data.replace(regex, name);

    fs.writeFileSync(`${newPath}/${file}`, updatedData, "utf-8");
    fs.renameSync(
      `${newPath}/${file}`,
      `${newPath}/${file.replace("$name", name)}`
    );
    console.log(`Created ${file.replace("$name", name)}`);
  } catch (err) {
    console.log(err);
    warnAndExit(`Error creating "${newPath}/${file.replace("$name", name)}".`);
  }
};

/**
 * @param originPath original path of dir to be copied
 * @param newPath new path of dir to be crated at
 * @param name name of new component
 */
export const makeDirAndWriteRecursive = (
  originPath: string,
  newPath: string,
  name: string
) => {
  try {
    fs.mkdirSync(newPath, { recursive: true });
  } catch (err) {
    console.log(err);
    warnAndExit(`Cannot create the directory "${newPath}/${name}".`);
  }

  const files = fs.readdirSync(originPath);
  files.forEach(file => {
    const newOrigin = path.resolve(originPath, file);
    if (fs.statSync(newOrigin).isDirectory()) {
      makeDirAndWriteRecursive(
        newOrigin,
        `${newPath}/${file.replace("$name", name)}`,
        name
      );
    } else {
      readAndWrite(file, name, newOrigin, newPath);
    }
  });
};
