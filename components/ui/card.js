import * as React from 'react';
import { cn } from '../../lib/utils';

export const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />;
});

export const CardHeader = React.forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
});

export const CardTitle = React.forwardRef(function CardTitle({ className, ...props }, ref) {
  return <h3 ref={ref} className={cn('text-2xl font-semibold tracking-tight', className)} {...props} />;
});

export const CardContent = React.forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
});
