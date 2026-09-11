import { cn } from "@crm/ui/lib/utils";
import type * as React from "react";

function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cn(
				"flex flex-col overflow-hidden rounded-lg border bg-card shadow-xs",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min items-center gap-x-4 gap-y-1 p-4 has-data-[slot=card-action]:grid-cols-[minmax(0,1fr)_auto] sm:has-data-[slot=card-description]:grid-rows-[auto_auto] md:p-5",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
	return (
		<h2
			data-slot="card-title"
			className={cn(
				"text-pretty font-heading font-semibold text-base tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="card-description"
			className={cn(
				"max-w-2xl text-pretty text-sm/relaxed text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 flex items-center gap-2 self-center justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn(
				"flex flex-col gap-4 border-t bg-card p-4 md:p-5",
				className,
			)}
			{...props}
		/>
	);
}

function CardPanel({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-panel"
			className={cn(
				"flex h-80 min-h-0 flex-col overflow-hidden border-t bg-card",
				className,
			)}
			{...props}
		/>
	);
}

function CardPanelEmpty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-panel-empty"
			className={cn(
				"flex flex-1 items-center justify-center p-6 text-center text-muted-foreground text-xs",
				className,
			)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center gap-3 border-t bg-card p-4 md:px-5",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardPanel,
	CardPanelEmpty,
	CardTitle,
};
