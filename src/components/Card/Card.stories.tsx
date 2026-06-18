import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <p className="text-neutral-600 text-sm">기본 카드 컴포넌트입니다.</p>
    </Card>
  ),
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-900">카드 제목</h3>
          <Badge variant="primary">새 글</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-neutral-600">
          카드 본문 내용입니다. 여기에 다양한 콘텐츠를 배치할 수 있습니다.
        </p>
      </CardBody>
      <CardFooter>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm">취소</Button>
          <Button size="sm">확인</Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

export const Hoverable: Story = {
  render: () => (
    <div className="flex gap-4">
      {['프로젝트 A', '프로젝트 B', '프로젝트 C'].map((name) => (
        <Card key={name} hoverable className="w-48">
          <h4 className="text-sm font-semibold text-neutral-900 mb-1">{name}</h4>
          <p className="text-xs text-neutral-500">최근 업데이트: 오늘</p>
        </Card>
      ))}
    </div>
  ),
}

export const ShadowVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card shadow="none" className="w-44 text-center">
        <p className="text-sm font-medium">No shadow</p>
      </Card>
      <Card shadow="sm" className="w-44 text-center">
        <p className="text-sm font-medium">Small</p>
      </Card>
      <Card shadow="md" className="w-44 text-center">
        <p className="text-sm font-medium">Medium</p>
      </Card>
      <Card shadow="lg" className="w-44 text-center">
        <p className="text-sm font-medium">Large</p>
      </Card>
    </div>
  ),
}

export const ProfileCard: Story = {
  render: () => (
    <Card className="w-72">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-lg">
          김
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">김철수</p>
          <p className="text-xs text-neutral-500">프론트엔드 개발자</p>
        </div>
        <Badge variant="success" dot className="ml-auto">재직 중</Badge>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" fullWidth>메시지</Button>
        <Button size="sm" fullWidth>팔로우</Button>
      </div>
    </Card>
  ),
}
