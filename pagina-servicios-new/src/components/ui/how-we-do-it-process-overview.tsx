import React from 'react';
import { cn } from '../../lib/utils';

// Interface for individual process card props
interface ProcessCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

// Reusable Process Card Component
const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, className }) => (
  <div className={cn("group relative w-full rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-8 transition-all cursor-pointer duration-300 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10", className)}>
    {/* Decorative Line - Visible on larger screens */}
    <div className="absolute -left-[1px] top-1/2 hidden h-1/2 w-[2px] -translate-y-1/2 bg-gray-200 dark:bg-white/5 transition-colors group-hover:bg-purple-500/60 md:block" />
    <div className="absolute left-1/2 top-0 h-[2px] w-1/2 -translate-x-1/2 bg-gray-200 dark:bg-white/5 transition-colors group-hover:bg-purple-500/60 md:hidden" />

    {/* Icon Container */}
    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl duration-300 border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-white group-hover:border-primary">
      <Icon className="h-6 w-6" />
    </div>

    {/* Content */}
    <div className="flex flex-col">
      <h3 className="mb-2 text-xl font-heading font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="text-base text-gray-600 dark:text-textSecondary leading-relaxed">{description}</p>
    </div>
  </div>
);

// Interface for the main section props
interface ProcessSectionProps {
  subtitle: string;
  title: string;
  description: string;
  items: ProcessCardProps[];
}

// Main Process Section Component
export const ProcessSection: React.FC<ProcessSectionProps> = ({
  subtitle,
  title,
  description,
  items,
}) => {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
      {/* Left Content */}
      <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left lg:col-span-1">
        <span className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase">
          {subtitle}
        </span>
        <h2 className="mb-6 text-3xl font-heading font-light tracking-tight text-gray-900 dark:text-white md:text-5xl">
          {title}
        </h2>
        <p className="mb-8 text-lg text-gray-600 dark:text-textSecondary max-w-2xl">
          {description}
        </p>
      </div>

      {/* Right Content - Grid of Process Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
        {items.map((item, index) => (
          <ProcessCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
