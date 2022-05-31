import $name from "./$name";

const Template = args => <$name {...args} />;

export const $nameStory = Template.bind({});
$nameStory.parameters = {
  controls: {
    include: [],
  },
};
$nameStory.args = {};
