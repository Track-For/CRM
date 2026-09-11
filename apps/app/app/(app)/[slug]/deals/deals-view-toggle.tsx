"use client";

import Column from "@carbon/icons-react/es/Column";
import List from "@carbon/icons-react/es/List";
import { Icon } from "@crm/ui/components/icon";
import { ToggleGroup, ToggleGroupItem } from "@crm/ui/components/toggle-group";
import { useQueryState } from "nuqs";
import { SEARCH_PARAM } from "@/lib/search-param-keys";
import {
	DEAL_VIEWS,
	type DealView,
	dealViewParsers,
} from "./deals-view-search-params";

function isView(value: string): value is DealView {
	return (DEAL_VIEWS as readonly string[]).includes(value);
}

export function DealsViewToggleFallback() {
	return (
		<ToggleGroup
			type="single"
			variant="outline"
			size="sm"
			spacing={0}
			disabled
			aria-label="Visualização de negócios"
		>
			<ToggleGroupItem value="table" aria-label="Visualização em tabela">
				<Icon icon={List} />
			</ToggleGroupItem>
			<ToggleGroupItem value="board" aria-label="Visualização em quadro">
				<Icon icon={Column} />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}

export function DealsViewToggle() {
	const [view, setView] = useQueryState(
		SEARCH_PARAM.list.view,
		dealViewParsers[SEARCH_PARAM.list.view],
	);

	return (
		<ToggleGroup
			type="single"
			variant="outline"
			size="sm"
			spacing={0}
			value={view}
			onValueChange={(next) => {
				if (isView(next)) void setView(next);
			}}
			aria-label="Visualização de negócios"
		>
			<ToggleGroupItem value="table" aria-label="Visualização em tabela">
				<Icon icon={List} />
			</ToggleGroupItem>
			<ToggleGroupItem value="board" aria-label="Visualização em quadro">
				<Icon icon={Column} />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
