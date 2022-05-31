import { FC } from "react";

import styles from "./$name.module.scss";

interface $nameProps {}

const $name: FC<$nameProps> = () => {
  return (
    <>
      <h1>$name</h1>
    </>
  );
};

$name.defaultProps = {};

export default $name;
