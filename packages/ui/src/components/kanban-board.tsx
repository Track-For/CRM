"use client";

import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useDraggable,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import { cn } from "@crm/ui/lib/utils";

export function KanbanBoard({
	id,
	onDrop,
	children,
}: {
	id: string;
	onDrop: (cardId: string, columnId: string) => void;
	children: ReactNode;
}) {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
		useSensor(KeyboardSensor),
	);

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;
		onDrop(String(active.id), String(over.id));
	};

	return (
		<DndContext id={id} sensors={sensors} onDragEnd={onDragEnd}>
			<div className="flex h-full min-h-0 gap-3 overflow-x-auto pb-2">
				{children}
			</div>
		</DndContext>
	);
}

export function KanbanColumn({
	id,
	header,
	count,
	className,
	children,
}: {
	id: string;
	header: ReactNode;
	count?: number;
	className?: string;
	children: ReactNode;
}) {
	const { setNodeRef, isOver } = useDroppable({ id });

	return (
		<div
			ref={setNodeRef}
			className={cn(
				"flex w-72 shrink-0 flex-col rounded-lg border bg-muted/30 transition-colors",
				isOver && "bg-muted/60",
				className,
			)}
		>
			<div className="flex items-center justify-between gap-2 border-b px-3 py-2.5">
				{header}
				{count !== undefined ? (
					<span className="shrink-0 text-muted-foreground text-xs tabular-nums">
						{count}
					</span>
				) : null}
			</div>
			<div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2">
				{children}
			</div>
		</div>
	);
}

export function KanbanCard({
	id,
	className,
	onClick,
	onMouseEnter,
	children,
}: {
	id: string;
	className?: string;
	onClick?: () => void;
	onMouseEnter?: () => void;
	children: ReactNode;
}) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({ id });

	return (
		<div
			ref={setNodeRef}
			style={{ transform: CSS.Translate.toString(transform) }}
			className={cn(
				"cursor-grab touch-none select-none rounded-lg border bg-card p-3 text-left shadow-xs active:cursor-grabbing",
				isDragging && "relative z-10 opacity-50",
				className,
			)}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			{...attributes}
			{...listeners}
		>
			{children}
		</div>
	);
}
