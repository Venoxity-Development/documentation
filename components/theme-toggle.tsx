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
    label: 'Light theme'
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme'
  },
  {
    key: 'system',
    icon: Airplay,
    label: 'System theme'
  }
]

const itemVariants = cva(
  'relative size-6.5 rounded-full p-1.5 text-fd-muted-foreground',
  {
    variants: {
      active: {
        true: 'text-fd-accent-foreground',
        false: 'text-fd-muted-foreground'
      }
    }
  }
)

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  mode?: 'light-dark' | 'light-dark-system'
}) {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const container = cn(
    'relative flex items-center rounded-full p-1 ring-1 ring-border',
    className
  )

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  const handleChangeTheme = async (theme: Theme) => {
    setTheme(theme)
  }

  const value = mounted
    ? mode === 'light-dark'
      ? resolvedTheme
      : currentTheme
    : null

  return (
    <div
      className={container}
      onClick={() => {
        if (mode !== 'light-dark') return
        handleChangeTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
      data-theme-toggle=''
      aria-label={mode === 'light-dark' ? 'Toggle Theme' : undefined}
      {...props}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = value === key
        if (mode === 'light-dark' && key === 'system') return

        return (
          <button
            type='button'
            key={key}
            className={itemVariants({ active: isActive })}
            onClick={() => {
              if (mode === 'light-dark') return
              handleChangeTheme(key as Theme)
            }}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId='activeTheme'
                className='absolute inset-0 rounded-full bg-accent'
                transition={{
                  type: 'spring',
                  duration: 0.4
                }}
              />
            )}
            <Icon
              className={'relative m-auto size-full'}
              fill={'currentColor'}
            />
          </button>
        )
      })}
    </div>
  )
}
