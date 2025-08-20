'use client'
import { cva } from 'class-variance-authority'
import { Airplay, Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { type HTMLAttributes, useLayoutEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const themes = [
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
  {
    key: 'system',
    icon: Airplay,
    label: 'System theme',
  },
]

const itemVariants = cva(
  'relative size-6.5 rounded-full p-1.5 text-fd-muted-foreground',
  {
    variants: {
      active: {
        true: 'text-fd-accent-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  }
)

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: HTMLAttributes<HTMLElement> & {
  mode?: 'light-dark' | 'light-dark-system'
}) {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  const container = cn(
    'relative inline-flex items-center rounded-full p-1 ring-1 ring-border',
    className
  )

  if (mode === 'light-dark') {
    const value = mounted ? resolvedTheme : null

    return (
      <button
        className={container}
        aria-label={`Toggle Theme`}
        onClick={() => setTheme(value === 'light' ? 'dark' : 'light')}
        data-theme-toggle=''
        {...props}
      >
        {themes
          // biome-ignore lint/suspicious/useIterableCallbackReturn: we intentionally skip 'system'
          .map(({ key, icon: Icon }) => {
            const isActive = value === key

            if (key === 'system') return

            return (
              <div key={key} className={cn(itemVariants({ active: isActive }))}>
                {isActive && (
                  <motion.div
                    layoutId='activeTheme'
                    className='absolute inset-0 rounded-full bg-fd-accent'
                    transition={{
                      type: 'spring',
                      duration: 0.4,
                    }}
                  />
                )}
                <Icon className='size-full' fill='currentColor' />
              </div>
            )
          })}
      </button>
    )
  }

  const value = mounted ? theme : null

  return (
    <div className={container} data-theme-toggle='' {...props}>
      {themes.map(({ key, icon: Icon }) => (
        <button
          type='button'
          key={key}
          aria-label={key}
          className={cn(itemVariants({ active: value === key }))}
          onClick={() => setTheme(key)}
        >
          {value === key && (
            <motion.div
              layoutId='activeTheme'
              className='absolute inset-0 rounded-full bg-fd-accent'
              transition={{
                type: 'spring',
                duration: 0.4,
              }}
            />
          )}
          <Icon className='size-full' fill='currentColor' />
        </button>
      ))}
    </div>
  )
}
