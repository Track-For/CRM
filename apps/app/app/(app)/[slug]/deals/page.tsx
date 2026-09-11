import type { Metadata } from "next";
import { Suspense } from "react";
import {
	PageShell,
	PageShellActions,
	PageShellContent,
	PageShellDescription,
	PageShellHeader,
	PageShellHeading,
	PageShellLoading,
	PageShellTitle,
} from "@/components/page-shell";
import { requireSession } from "@/lib/session";
import { HydrateClient } from "@/lib/trpc/hydrate";
import { getServerQueryClient, getServerTrpc } from "@/lib/trpc/server";
import { CreateDealSheet } from "./create-deal-sheet";
import { DealsBoard } from "./deals-board";
import { DEALS_BOARD_INPUT } from "./deals-board-input";
import { dealsSearchParams } from "./deals-search-params";
import { DealsTable } from "./deals-table";
import { loadDealViewSearchParams } from "./deals-view-search-params";
import { DealsViewToggle, DealsViewToggleFallback } from "./deals-view-toggle";

export const metadata: Metadata = {
	title: "Negócios",
};

export default function DealsPage({
	searchParams,
}: PageProps<"/[slug]/deals">) {
	return (
		<PageShell className="min-h-0">
			<PageShellHeader>
				<PageShellHeading>
					<PageShellTitle>Negócios</PageShellTitle>
					<PageShellDescription>
						O pipeline, e tudo que já foi encerrado.
					</PageShellDescription>
				</PageShellHeading>
				<PageShellActions>
					<Suspense fallback={<DealsViewToggleFallback />}>
						<DealsViewToggle />
					</Suspense>
					<CreateDealSheet />
				</PageShellActions>
			</PageShellHeader>

			<PageShellContent className="min-h-0">
				<Suspense fallback={<PageShellLoading />}>
					<Deals searchParams={searchParams} />
				</Suspense>
			</PageShellContent>
		</PageShell>
	);
}

async function Deals({
	searchParams,
}: Pick<PageProps<"/[slug]/deals">, "searchParams">) {
	const [, values, { view }] = await Promise.all([
		requireSession(),
		dealsSearchParams.load(searchParams),
		loadDealViewSearchParams(searchParams),
	]);

	const trpc = getServerTrpc();
	const queryClient = getServerQueryClient();
	await Promise.all([
		queryClient.prefetchQuery(
			view === "board"
				? trpc.deals.list.queryOptions(DEALS_BOARD_INPUT)
				: trpc.deals.list.queryOptions(dealsSearchParams.toInput(values)),
		),
		queryClient.prefetchQuery(trpc.users.list.queryOptions()),
		queryClient.prefetchQuery(trpc.companies.options.queryOptions({ q: "" })),
	]);

	return (
		<HydrateClient>
			{view === "board" ? <DealsBoard /> : <DealsTable />}
		</HydrateClient>
	);
}
