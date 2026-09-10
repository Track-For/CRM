import { createLoader, parseAsStringLiteral } from "nuqs/server";
import { SEARCH_PARAM } from "@/lib/search-param-keys";

export const DEAL_VIEWS = ["table", "board"] as const;

export type DealView = (typeof DEAL_VIEWS)[number];

export const dealViewParsers = {
	[SEARCH_PARAM.list.view]:
		parseAsStringLiteral(DEAL_VIEWS).withDefault("table"),
};

export const loadDealViewSearchParams = createLoader(dealViewParsers);
