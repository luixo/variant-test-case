import Image from "next/image";
import { cn } from "@/utils/utils";

export const ActionButton: React.FC<
  React.PropsWithChildren<{
    icon?: { src: string; alt: string };
    reverse?: boolean;
    onClick: () => void;
  }>
> = ({ children, icon, reverse, onClick }) => {
  return (
    <div
      className={cn(
        "flex gap-2 font-bold text-secondary-text cursor-pointer items-center",
        {
          ["flex-row-reverse text-end"]: reverse,
        }
      )}
      onClick={onClick}
    >
      {icon ? (
        <Image src={icon.src} alt={icon.alt} width={20} height={20} />
      ) : null}
      {children}
    </div>
  );
};
