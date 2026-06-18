import type { Meta, StoryObj } from '@storybook/react'
import { colors } from './colors'

function ColorChip({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="w-full h-14 rounded-lg border border-black/10"
        style={{ backgroundColor: value }}
      />
      <div>
        <p className="text-xs font-medium text-neutral-800">{name}</p>
        <p className="text-xs text-neutral-400 uppercase">{value}</p>
      </div>
    </div>
  )
}

function ColorScale({
  label,
  scale,
}: {
  label: string
  scale: Record<string | number, string>
}) {
  return (
    <div className="mb-10">
      <h3 className="text-sm font-semibold text-neutral-700 mb-3 capitalize">{label}</h3>
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
        {Object.entries(scale).map(([key, value]) => (
          <ColorChip key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  )
}

function ColorPage() {
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Colors</h1>
      <p className="text-sm text-neutral-500 mb-10">디자인 시스템의 컬러 팔레트입니다.</p>

      <ColorScale label="Primary" scale={colors.primary} />
      <ColorScale label="Neutral" scale={colors.neutral} />

      <div className="mb-10">
        <h3 className="text-sm font-semibold text-neutral-700 mb-3">Semantic</h3>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {(['success', 'warning', 'error', 'info'] as const).map((key) => (
            <div key={key}>
              <p className="text-xs font-semibold text-neutral-600 mb-2 capitalize">{key}</p>
              <div className="flex flex-col gap-2">
                {Object.entries(colors[key]).map(([shade, value]) => (
                  <ColorChip key={shade} name={shade} value={value} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: 'Foundation/Colors',
  component: ColorPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ColorPage>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {}
