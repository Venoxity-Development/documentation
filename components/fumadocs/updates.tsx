"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { LinkIcon } from "lucide-react";

export interface UpdatesProps {
  children: ReactNode;
  className?: string;
}

export interface UpdateProps {
  children: ReactNode;
  label: string;
  id?: string;
  className?: string;
}

export function Updates({ children, className }: UpdatesProps) {
  return (
    <div className={cn("flex flex-col space-y-8 fd-updates", className)}>{children}</div>
  );
}

export function Update({ children, label, id, className }: UpdateProps) {
  const updateId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      id={updateId}
      className={cn(
        "flex flex-col relative items-start w-full lg:flex-row gap-2 lg:gap-6 py-8 fd-update",
        className
      )}
    >
      <div className="lg:sticky top-[112px] group flex flex-col w-full lg:w-[160px] items-start flex-shrink-0 justify-start">
        <div className="cursor-pointer px-2 py-1 rounded-lg text-sm flex items-center flex-grow-0 justify-center font-medium bg-primary/10 text-primary dark:text-primary-light">
          {label}
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-0.5 max-w-full prose prose-gray dark:prose-invert">
        {children}
      </div>
    </div>
  );
}
