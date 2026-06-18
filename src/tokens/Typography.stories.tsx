import type { Meta, StoryObj } from '@storybook/react'
import { typography } from './typography'

function TypographyPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Typography</h1>
      <p className="text-sm text-neutral-500 mb-10">폰트 크기, 두께, 행간 스케일입니다.</p>

      {/* Font Size */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          Font Size
        </h2>
        <div className="flex flex-col gap-5">
          {Object.entries(typography.fontSize).map(([key, value]) => (
            <div key={key} className="flex items-baseline gap-4 border-b border-neutral-100 pb-4">
              <div className="w-16 shrink-0">
                <span className="text-xs text-neutral-400">{key}</span>
                <p className="text-xs text-neutral-300">{value}</p>
              </div>
              <p
                className="text-neutral-900 leading-none"
                style={{ fontSize: value }}
              >
                가나다라마바사
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weight */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          Font Weight
        </h2>
        <div className="flex flex-col gap-4">
          {Object.entries(typography.fontWeight).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 border-b border-neutral-100 pb-4">
              <div className="w-24 shrink-0">
                <span className="text-xs text-neutral-400 capitalize">{key}</span>
                <p className="text-xs text-neutral-300">{value}</p>
              </div>
              <p
                className="text-lg text-neutral-900"
                style={{ fontWeight: value }}
              >
                가나다라마바사 ABCDEFG
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Line Height */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          Line Height
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Object.entries(typography.lineHeight).map(([key, value]) => (
            <div key={key} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-neutral-600 capitalize">{key}</span>
                <span className="text-xs text-neutral-400">{value}</span>
              </div>
              <p
                className="text-sm text-neutral-800 bg-primary-50 rounded px-1"
                style={{ lineHeight: value }}
              >
                첫 번째 줄입니다.<br />두 번째 줄입니다.<br />세 번째 줄입니다.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: 'Foundation/Typography',
  component: TypographyPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TypographyPage>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {}
