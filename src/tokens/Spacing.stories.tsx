import type { Meta, StoryObj } from '@storybook/react'
import { spacing, borderRadius, shadows } from './spacing'

function SpacingPage() {
  const spacingEntries = Object.entries(spacing).filter(([key]) => !key.includes('.'))

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Spacing & Layout</h1>
      <p className="text-sm text-neutral-500 mb-10">간격, 모서리 반경, 그림자 스케일입니다.</p>

      {/* Spacing */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          Spacing
        </h2>
        <div className="flex flex-col gap-3">
          {spacingEntries.map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <div className="w-12 shrink-0 text-right">
                <span className="text-xs text-neutral-400">{key}</span>
              </div>
              <div
                className="bg-primary-400 rounded-sm h-4 shrink-0"
                style={{ width: value === '0px' ? '2px' : value }}
              />
              <span className="text-xs text-neutral-400">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          Border Radius
        </h2>
        <div className="flex flex-wrap gap-6">
          {Object.entries(borderRadius).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 bg-primary-100 border-2 border-primary-400"
                style={{ borderRadius: value }}
              />
              <div className="text-center">
                <p className="text-xs font-medium text-neutral-700">{key}</p>
                <p className="text-xs text-neutral-400">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          Shadows
        </h2>
        <div className="flex flex-wrap gap-8">
          {Object.entries(shadows).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center gap-3">
              <div
                className="w-24 h-24 bg-white rounded-xl"
                style={{ boxShadow: value }}
              />
              <div className="text-center">
                <p className="text-xs font-medium text-neutral-700">{key}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: 'Foundation/Spacing',
  component: SpacingPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SpacingPage>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {}
