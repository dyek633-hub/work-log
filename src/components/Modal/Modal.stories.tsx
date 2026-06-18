import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="기본 모달"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </div>
          }
        >
          <p className="text-sm text-neutral-600">
            모달 내용이 여기에 표시됩니다. 다양한 컴포넌트를 자유롭게 배치할 수 있습니다.
          </p>
        </Modal>
      </>
    )
  },
}

export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>팀원 초대</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="팀원 초대"
          size="sm"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>초대 보내기</Button>
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <Input label="이름" placeholder="홍길동" fullWidth />
            <Input label="이메일" placeholder="hong@example.com" type="email" fullWidth />
          </div>
        </Modal>
      </>
    )
  },
}

export const ConfirmModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>삭제</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="정말 삭제하시겠습니까?"
          size="sm"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>취소</Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>삭제</Button>
            </div>
          }
        >
          <p className="text-sm text-neutral-600">
            이 작업은 되돌릴 수 없습니다. 선택한 항목이 영구적으로 삭제됩니다.
          </p>
        </Modal>
      </>
    )
  },
}

export const LargeModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>큰 모달 열기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="상세 정보"
          size="lg"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>닫기</Button>
            </div>
          }
        >
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="p-3 bg-neutral-50 rounded-lg">
                <p className="text-sm font-medium text-neutral-800">항목 {i + 1}</p>
                <p className="text-xs text-neutral-500 mt-1">항목에 대한 설명 텍스트입니다.</p>
              </div>
            ))}
          </div>
        </Modal>
      </>
    )
  },
}
