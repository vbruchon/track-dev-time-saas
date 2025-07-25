import { TooltipProps } from "recharts";
import { cn } from "@/lib/utils";

type Props = {
  valueFormatter?: (value: number) => string;
  nameMap?: Record<string, string>;
  labelClassName?: string;
};

export function CustomTooltip({
  active,
  payload,
  label,
  valueFormatter = (v) => `${v}`,
  nameMap = {},
  labelClassName,
}: TooltipProps<number, string> & Props) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-md bg-popover p-4 shadow-lg border w-fit">
      {label && (
        <p className={cn("text-sm font-medium mb-2", labelClassName)}>
          {label}
        </p>
      )}
      {payload.map((entry, i) => {
        const name = nameMap[entry.name!] ?? entry.name;
        const value = valueFormatter(Number(entry.value));

        return (
          <div
            key={`tooltip-item-${i}`}
            className="flex justify-between gap-4 text-sm"
          >
            <span>{name}</span>
            <span className="font-semibold">{value}</span>
          </div>
        );
      })}
    </div>
  );
}
