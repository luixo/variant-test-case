import * as React from "react";

import { cn } from "@/utils/utils";

export const Textarea = ({
  label,
  className,
  inputClassName,
  ...props
}: React.ComponentProps<"textarea"> & {
  label: string;
  inputClassName?: string;
}) => {
  const id = React.useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <textarea
        data-slot="textarea"
        className={cn(
          "border-border placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:text-sm",
          inputClassName
        )}
        {...props}
      />
    </div>
  );
};
