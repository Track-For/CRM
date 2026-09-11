"use client";

import {
	KanbanBoard,
	KanbanCard,
	KanbanColumn,
} from "@crm/ui/components/kanban-board";
import { formatMoney } from "@crm/ui/lib/format";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { CompanyCell } from "@/components/crm/company-cell";
import { DealStageIndicator } from "@/components/crm/deal-stage";
import { OwnerCell } from "@/components/crm/owner-cell";
import { usePrefetchRecord } from "@/components/crm/record-sheet/record-prefetch";
import { useOpenRecord } from "@/components/crm/record-sheet/record-stack";
import { useDealStageChange } from "@/components/crm/stage-change";
import { DEAL_STAGE_OPTIONS, LOSING_STAGES } from "@/lib/deal-stage";
import { useCrmCache } from "@/lib/trpc/cache";
import { useTRPC } from "@/lib/trpc/client";
import type { RouterOutputs } from "@/lib/trpc/types";
import { DEALS_BOARD_INPUT } from "./deals-board-input";

type DealRow = RouterOutputs["deals"]["list"]["rows"][number];
type DealListResult = RouterOutputs["deals"]["list"];

export function DealsBoard() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const cache = useCrmCache();
	const openRecord = useOpenRecord();
	const prefetchRecord = usePrefetchRecord();
	const { change } = useDealStageChange();

	const boardListKey = trpc.deals.list.queryKey(DEALS_BOARD_INPUT);

	const deals = useQuery({
		...trpc.deals.list.queryOptions(DEALS_BOARD_INPUT),
		placeholderData: (previous) => previous,
	});

	const setStage = useMutation(
		trpc.deals.setStage.mutationOptions({
			onMutate: async ({ id, stage }) => {
				await queryClient.cancelQueries({ queryKey: boardListKey });
				const previous = queryClient.getQueryData<DealListResult>(boardListKey);
				if (previous) {
					queryClient.setQueryData<DealListResult>(boardListKey, {
						...previous,
						rows: previous.rows.map((row) =>
							row.id === id ? { ...row, stage } : row,
						),
					});
				}
				return { previous };
			},
			onError: (error, _variables, context) => {
				if (context?.previous) {
					queryClient.setQueryData(boardListKey, context.previous);
				}
				toast.error(error.message);
			},
			onSettled: (_data, _error, variables) => cache.deal(variables.id),
		}),
	);

	const rows = deals.data?.rows ?? [];
	const total = deals.data?.total ?? 0;

	const byStage = useMemo(() => {
		const groups = new Map<string, DealRow[]>();
		for (const row of rows) {
			const bucket = groups.get(row.stage);
			if (bucket) bucket.push(row);
			else groups.set(row.stage, [row]);
		}
		return groups;
	}, [rows]);

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-2">
			{total > rows.length ? (
				<p className="text-muted-foreground text-xs">
					Mostrando os {rows.length} mais ativos recentemente de {total}{" "}
					negócios. Use a visualização em tabela para ver o restante.
				</p>
			) : null}
			<KanbanBoard
				id="deals-board"
				onDrop={(dealId, stageId) => {
					const deal = rows.find((row) => row.id === dealId);
					const nextStage = stageId as DealRow["stage"];
					if (!deal || deal.stage === nextStage) return;
					if (LOSING_STAGES.includes(nextStage)) {
						change(deal.id, deal.stage, nextStage);
						return;
					}
					setStage.mutate({ id: deal.id, stage: nextStage });
				}}
			>
				{DEAL_STAGE_OPTIONS.map((option) => {
					const column = byStage.get(option.value) ?? [];
					return (
						<KanbanColumn
							key={option.value}
							id={option.value}
							header={<DealStageIndicator stage={option.value} />}
							count={column.length}
						>
							{column.map((deal) => (
								<KanbanCard
									key={deal.id}
									id={deal.id}
									onClick={() => openRecord({ kind: "deal", id: deal.id })}
									onMouseEnter={() =>
										prefetchRecord({ kind: "deal", id: deal.id })
									}
								>
									<p className="truncate font-medium text-sm">{deal.name}</p>
									<div className="mt-1.5 text-muted-foreground text-xs">
										<CompanyCell company={deal.company} />
									</div>
									<div className="mt-2.5 flex items-center justify-between gap-2">
										<span className="tabular-nums text-xs">
											{deal.amountCents === null
												? null
												: formatMoney(deal.amountCents, deal.currency)}
										</span>
										<OwnerCell owner={deal.owner} compact />
									</div>
								</KanbanCard>
							))}
						</KanbanColumn>
					);
				})}
			</KanbanBoard>
		</div>
	);
}
