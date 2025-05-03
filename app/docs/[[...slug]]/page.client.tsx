'use client';
import { useState } from 'react';
import { Check, Copy, GithubIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import Link from 'fumadocs-core/link';

const cache = new Map<string, string>();

export function LLMCopyButton() {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    setLoading(true);
    const url = window.location.pathname + '.mdx';
    try {
      const content: string =
        cache.get(url) ?? (await fetch(url).then((res) => res.text()));

      cache.set(url, content);
      await navigator.clipboard.writeText(content);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          variant: 'secondary',
          size: 'sm',
          className: 'gap-2',
        }),
      )}
      onClick={onClick}
    >
      {checked ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      Copy Markdown
    </button>
  );
}

export function EditOnGitHub({ url }: { url: string }) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: 'secondary',
          size: 'sm',
          className: 'gap-2',
        }),
      )}
      href={url}
    >
      <GithubIcon />
      Edit on GitHub
    </Link>
  );
}