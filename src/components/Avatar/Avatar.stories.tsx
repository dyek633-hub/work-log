import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: '김철수',
    size: 'md',
  },
}

export const WithName: Story = {
  args: {
    name: '김철수',
    size: 'lg',
  },
}

export const Fallback: Story = {
  args: {
    src: 'broken-url.jpg',
    name: '이영희',
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar name="김철수" size="xs" />
      <Avatar name="이영희" size="sm" />
      <Avatar name="박민준" size="md" />
      <Avatar name="최수연" size="lg" />
      <Avatar name="정하늘" size="xl" />
    </div>
  ),
}

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <Avatar name="온라인" status="online" size="md" />
        <span className="text-xs text-neutral-500">온라인</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar name="자리비움" status="away" size="md" />
        <span className="text-xs text-neutral-500">자리비움</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar name="바쁨" status="busy" size="md" />
        <span className="text-xs text-neutral-500">바쁨</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar name="오프라인" status="offline" size="md" />
        <span className="text-xs text-neutral-500">오프라인</span>
      </div>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar name="김철수" shape="square" size="sm" />
      <Avatar name="이영희" shape="square" size="md" />
      <Avatar name="박민준" shape="square" size="lg" />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      <Avatar name="김철수" size="md" />
      <Avatar name="이영희" size="md" />
      <Avatar name="박민준" size="md" />
      <Avatar name="최수연" size="md" />
      <Avatar name="정하늘" size="md" />
      <Avatar name="오승현" size="md" />
    </AvatarGroup>
  ),
}
