import React from "react";
import { cn } from "@/utils/utils";

const variants = {
  default:
    "bg-button-background text-white disabled:bg-border disabled:text-disabled-text",
  white: "bg-white text-ternary-text border",
};
const sizes = {
  md: "h-11 px-4 py-2",
  lg: "h-15 rounded-md px-6 text-lg",
};

export const Button = ({
  className,
  variant = "default",
  size = "md",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}) => (
  <button
    data-slot="button"
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none shrink-0 outline-none cursor-pointer",
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  />
);
