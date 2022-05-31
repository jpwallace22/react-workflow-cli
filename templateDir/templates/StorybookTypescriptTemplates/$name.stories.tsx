import { ComponentStory } from "@storybook/react";

import $name from "./$name";

const Template: ComponentStory<typeof $name> = args => <$name {...args} />;

export const $nameStory = Template.bind({});
$nameStory.parameters = {
  controls: {
    include: [],
  },
};
$nameStory.args = {};
