import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // ou ta fonction de concat classnames

interface BadgeBorderAnimatedProps extends React.ComponentProps<typeof Badge> {
  children: React.ReactNode;
}

export function BadgeBorderAnimated({
  children,
  className,
  ...props
}: BadgeBorderAnimatedProps) {
  return (
    <Badge
      variant={"outline"}
      {...props}
      className={cn(
        "relative rounded-full border border-primary/20 px-4 py-1 duration-200",
        className
      )}
    >
      <div
        className={cn(
          "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent [mask-clip:padding-box,border-box]",
          "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
        )}
      >
        <motion.div
          className={cn(
            "absolute aspect-square bg-gradient-to-r from-transparent via-bg-primary/20 to-primary",
            "dark:from-transparent dark:bg-primary/20 dark:to-primary"
          )}
          animate={{ offsetDistance: ["0%", "100%"] }}
          style={{
            width: 20,
            offsetPath: `rect(0px auto auto 0px round 20px)`,
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
        />
      </div>
      <span className="relative z-10 text-primary-muted">{children}</span>
    </Badge>
  );
}
