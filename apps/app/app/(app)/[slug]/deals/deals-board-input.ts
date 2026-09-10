import type { RouterInputs } from "@/lib/trpc/types";

export const DEALS_BOARD_INPUT: RouterInputs["deals"]["list"] = {
	q: "",
	sort: "lastActivity",
	dir: "desc",
	page: 1,
	pageSize: 100,
	status: "all",
	owner: [],
	stage: [],
	closing: [],
	fields: {},
	archived: false,
};
