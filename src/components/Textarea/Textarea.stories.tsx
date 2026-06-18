import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요',
  },
}

export const WithLabel: Story = {
  args: {
    label: '오늘의 업무',
    placeholder: '오늘 한 일을 적어보세요',
  },
}

export const WithHelperText: Story = {
  args: {
    label: '메모',
    placeholder: '메모를 입력하세요',
    helperText: '자유롭게 작성해주세요.',
  },
}

export const WithError: Story = {
  args: {
    label: '내용',
    errorMessage: '내용을 입력해주세요.',
  },
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <Textarea label="전체 너비" placeholder="전체 너비로 확장됩니다" fullWidth />
    </div>
  ),
}
