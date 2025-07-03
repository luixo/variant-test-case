"use client";

import { ActionButton } from "@/components/ui/action-button";
import { cn } from "@/utils/utils";
import { Application, DEFAULT_RESPONSE } from "@/utils/applications";
import React from "react";
import Image from "next/image";

const Controls: React.FC<{
  lastIndex: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}> = ({ lastIndex, currentIndex, setCurrentIndex }) => {
  const toPrev = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  }, [setCurrentIndex]);
  const toNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex < lastIndex ? prevIndex + 1 : prevIndex
    );
  }, [lastIndex, setCurrentIndex]);
  const itemClassName =
    "size-8 border rounded-sm cursor-pointer flex items-center justify-center select-none bg-white";
  const disabledClassName = "cursor-default bg-white/50";
  return (
    <div className="absolute top-4 right-4 gap-2 flex">
      <div
        className={cn(itemClassName, {
          [disabledClassName]: currentIndex <= 0,
        })}
        onClick={toPrev}
      >
        {"<"}
      </div>
      <div
        className={cn(itemClassName, {
          [disabledClassName]: currentIndex >= lastIndex,
        })}
        onClick={toNext}
      >
        {">"}
      </div>
    </div>
  );
};

export const ApplicationResult: React.FC<
  React.ComponentProps<"div"> & {
    application: Application | undefined;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
  }
> = ({
  application,
  className,
  currentIndex,
  setCurrentIndex,
  isLoading,
  ...props
}) => {
  const lastResponse = application?.responses[currentIndex] || DEFAULT_RESPONSE;
  return (
    <div
      className={cn(
        "rounded-xl bg-secondary-bg p-6 flex flex-col gap-4 justify-between text-primary-text min-h-72 overflow-x-auto relative",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="size-full flex items-center justify-center animate-bounce">
          <Image src="/ball.png" width={320} height={320} alt="Loading.." />
        </div>
      ) : (
        <span className="whitespace-pre-wrap">{lastResponse}</span>
      )}
      <ActionButton
        icon={{ src: "/copy.svg", alt: "Copy application to clipboard" }}
        reverse
        onClick={() => navigator.clipboard.writeText(lastResponse.trim())}
      >
        Copy to clipboard
      </ActionButton>
      <Controls
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        lastIndex={application ? application.responses.length - 1 : 0}
      />
    </div>
  );
};
