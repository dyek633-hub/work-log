import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
  },
}

export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
}

export const WithHelperText: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    helperText: '업무용 이메일을 입력해주세요.',
  },
}

export const WithError: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    errorMessage: '비밀번호가 올바르지 않습니다.',
    defaultValue: 'wrongpassword',
  },
}

export const WithSuccess: Story = {
  args: {
    label: '사용자명',
    placeholder: '사용자명',
    status: 'success',
    helperText: '사용 가능한 사용자명입니다.',
    defaultValue: 'johndoe',
  },
}

export const WithLeftAddon: Story = {
  args: {
    placeholder: '검색',
    leftAddon: <SearchIcon />,
  },
}

export const Disabled: Story = {
  args: {
    label: '비활성화된 입력',
    placeholder: '입력 불가',
    disabled: true,
    defaultValue: '비활성화',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium (기본값)" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <Input label="전체 너비 입력" placeholder="전체 너비로 확장됩니다" fullWidth />
    </div>
  ),
}
