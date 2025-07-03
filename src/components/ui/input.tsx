import React from "react";

import { cn } from "@/utils/utils";

export const Input = ({
  label,
  className,
  inputClassName,
  type,
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
  inputClassName?: string;
}) => {
  const id = React.useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        id={id}
        type={type}
        data-slot="input"
        className={cn(
          "placeholder:text-muted-foreground selection:text-primary-foreground border-border flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          inputClassName
        )}
        {...props}
      />
    </div>
  );
};
