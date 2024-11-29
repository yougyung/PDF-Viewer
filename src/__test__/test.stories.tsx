import type { Meta, StoryObj } from '@storybook/react';

function TestButton() {
  return <div>buttons</div>;
}

const meta = {
  title: 'ui/view/atom/Button',
  component: TestButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Button의 Variant를 설정합니다.',
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'primary' },
      },
      options: ['primary', 'secondary', 'text', 'list', 'outlined'],
      control: {
        type: 'radio',
      },
    },
    size: {
      description: 'Button의 size를 설정합니다.',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'md' },
      },
      options: ['lg', 'md', 'sm', 'xs', 'default'],
      control: {
        type: 'radio',
      },
    },
    label: {
      description: 'Button의 label을 설정합니다',
      table: {
        type: { summary: 'ButtonLabel' },
        defaultValue: { summary: '' },
      },
    },
    loading: {
      description: 'Button의 loading 여부를 설정합니다',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'md' },
      },
      options: [true, false],
      control: {
        type: 'radio',
      },
    },
  },
} satisfies Meta<typeof TestButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButton: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    label: '버튼 내용',
  },
};

export const SecondaryButton: Story = {
  args: {
    size: 'xs',
    variant: 'secondary',
    label: '버튼 내용',
  },
};

export const OutlinedButton: Story = {
  args: {
    size: 'sm',
    variant: 'outlined',
    label: '버튼 내용',
  },
};

export const ListActionButton: Story = {
  args: {
    size: 'default',
    variant: 'list',
    label: '버튼 내용',
  },
};

export const TextButton: Story = {
  args: {
    size: 'default',
    variant: 'text',
    label: '버튼 내용',
  },
};

export const DisabledButton: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    label: '버튼',
    disabled: true,
  },
};

export const LoadingButton: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    label: '버튼 내용',
    loading: true,
  },
};
