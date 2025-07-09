import { ReactNode } from "react";

type SectionWrapperProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionWrapper({
  title,
  icon,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section className={`my-12 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
