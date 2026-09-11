"use client";

import Building from "@carbon/icons-react/es/Building";
import Close from "@carbon/icons-react/es/Close";
import Dashboard from "@carbon/icons-react/es/Dashboard";
import Partnership from "@carbon/icons-react/es/Partnership";
import Settings from "@carbon/icons-react/es/Settings";
import UserMultiple from "@carbon/icons-react/es/UserMultiple";
import { Button } from "@crm/ui/components/button";
import type { CarbonIcon } from "@crm/ui/components/icon";
import { Icon } from "@crm/ui/components/icon";
import Bot from "@crm/ui/components/icons/bot";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@crm/ui/components/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@crm/ui/components/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { AgentBuilderSidebar } from "@/components/agent-builder/agent-builder-sidebar";
import { usePrefetchSection } from "@/components/crm/section-prefetch";
import { useMobileNav } from "@/components/mobile-nav";
import { useWorkspaceUrl } from "@/lib/use-workspace-url";

type RailItem = {
	title: string;
	href: string;
	icon: CarbonIcon;
	iconClassName?: string;
	match: "exact" | "prefix";
	related?: string[];
};

const ITEMS: RailItem[] = [
	{ title: "Visão geral", href: "/", icon: Dashboard, match: "exact" },
	{
		title: "Chat",
		href: "/chat",
		icon: Bot,
		iconClassName: "size-5",
		match: "prefix",
		related: ["/agents"],
	},
	{ title: "Empresas", href: "/companies", icon: Building, match: "prefix" },
	{
		title: "Contatos",
		href: "/contacts",
		icon: UserMultiple,
		match: "prefix",
	},
	{ title: "Negócios", href: "/deals", icon: Partnership, match: "prefix" },
	{
		title: "Configurações",
		href: "/settings",
		icon: Settings,
		match: "prefix",
	},
];

function isActive(item: RailItem, pathname: string): boolean {
	return (
		pathname === item.href ||
		(item.match === "prefix" && pathname.startsWith(item.href)) ||
		Boolean(item.related?.some((prefix) => pathname.startsWith(prefix)))
	);
}

function RailLink({
	item,
	active,
	onPrefetch,
	compact = false,
}: {
	item: RailItem;
	active: boolean;
	onPrefetch: () => void;
	compact?: boolean;
}) {
	const control = (
		<Button
			asChild
			variant="navigation"
			size={compact ? "icon" : "navigation"}
			data-active={active}
		>
			<Link
				href={item.href}
				prefetch
				onMouseEnter={onPrefetch}
				onFocus={onPrefetch}
				aria-current={active ? "page" : undefined}
				transitionTypes={["nav-lateral"]}
			>
				<Icon icon={item.icon} className={item.iconClassName} />
				<span className={compact ? "sr-only" : "min-w-0 truncate"}>
					{item.title}
				</span>
			</Link>
		</Button>
	);

	if (!compact) return control;

	return (
		<Tooltip>
			<TooltipTrigger asChild>{control}</TooltipTrigger>
			<TooltipContent side="right">{item.title}</TooltipContent>
		</Tooltip>
	);
}

function MobileRailLink({
	item,
	active,
	onNavigate,
	onPrefetch,
}: {
	item: RailItem;
	active: boolean;
	onNavigate: () => void;
	onPrefetch: () => void;
}) {
	return (
		<Button asChild variant="navigation" size="navigation" data-active={active}>
			<Link
				href={item.href}
				prefetch
				onMouseEnter={onPrefetch}
				onFocus={onPrefetch}
				aria-current={active ? "page" : undefined}
				onClick={onNavigate}
				transitionTypes={[
					item.title === "Chat" ? "nav-forward" : "nav-lateral",
				]}
			>
				<Icon icon={item.icon} className={item.iconClassName} />
				<span>{item.title}</span>
			</Link>
		</Button>
	);
}

function MobileRailIconLink({
	item,
	active,
	onNavigate,
	onPrefetch,
}: {
	item: RailItem;
	active: boolean;
	onNavigate: () => void;
	onPrefetch: () => void;
}) {
	return (
		<Button asChild variant="navigation" size="icon" data-active={active}>
			<Link
				href={item.href}
				prefetch
				onMouseEnter={onPrefetch}
				onFocus={onPrefetch}
				aria-current={active ? "page" : undefined}
				onClick={onNavigate}
			>
				<Icon icon={item.icon} className={item.iconClassName} />
				<span className="sr-only">{item.title}</span>
			</Link>
		</Button>
	);
}

export function AppIconRailFallback() {
	return (
		<>
			<nav
				aria-label="Principal"
				aria-busy="true"
				className="hidden w-16 shrink-0 flex-col items-center gap-1 border-r bg-sidebar p-2 md:flex xl:hidden [view-transition-name:app-rail]"
			>
				{ITEMS.map((item) => (
					<Button key={item.href} variant="navigation" size="icon" disabled>
						<Icon icon={item.icon} className={item.iconClassName} />
						<span className="sr-only">{item.title}</span>
					</Button>
				))}
			</nav>
			<nav
				aria-label="Principal"
				aria-busy="true"
				className="hidden w-56 shrink-0 flex-col gap-1 border-r bg-sidebar p-3 xl:flex [view-transition-name:app-rail]"
			>
				{ITEMS.map((item) => (
					<Button
						key={item.href}
						variant="navigation"
						size="navigation"
						disabled
					>
						<Icon icon={item.icon} className={item.iconClassName} />
						<span>{item.title}</span>
					</Button>
				))}
			</nav>
		</>
	);
}

export function AppIconRail() {
	const pathname = usePathname();
	const workspaceUrl = useWorkspaceUrl();
	const { open, setOpen } = useMobileNav();
	const prefetchSection = usePrefetchSection();

	const items = useMemo(
		() =>
			ITEMS.map((item) => ({
				...item,
				section: item.href,
				href: workspaceUrl(item.href),
				related: item.related?.map((path) => workspaceUrl(path)),
			})),
		[workspaceUrl],
	);
	const inChat = items.some(
		(item) => item.title === "Chat" && isActive(item, pathname),
	);

	return (
		<>
			<nav
				aria-label="Principal"
				className="hidden w-16 shrink-0 flex-col items-center gap-1 border-r bg-sidebar p-2 md:flex xl:hidden [view-transition-name:app-rail]"
			>
				{items.map((item) => (
					<RailLink
						key={item.href}
						item={item}
						active={isActive(item, pathname)}
						onPrefetch={() => prefetchSection(item.section)}
						compact
					/>
				))}
			</nav>
			<nav
				aria-label="Principal"
				className="hidden w-56 shrink-0 flex-col gap-1 border-r bg-sidebar p-3 xl:flex [view-transition-name:app-rail]"
			>
				<p className="px-3 pt-1 pb-2 font-medium text-muted-foreground text-xs">
					Workspace
				</p>
				{items.slice(0, -1).map((item) => (
					<RailLink
						key={item.href}
						item={item}
						active={isActive(item, pathname)}
						onPrefetch={() => prefetchSection(item.section)}
					/>
				))}
				<div className="mt-auto border-t pt-2">
					{items.slice(-1).map((item) => (
						<RailLink
							key={item.href}
							item={item}
							active={isActive(item, pathname)}
							onPrefetch={() => prefetchSection(item.section)}
						/>
					))}
				</div>
			</nav>

			<Sheet open={open} onOpenChange={setOpen}>
				{inChat ? (
					<SheetContent
						side="left"
						showCloseButton={false}
						className="w-5/6 max-w-md flex-row gap-0 p-0"
					>
						<SheetHeader className="sr-only">
							<SheetTitle>Navegação e conversas dos agentes</SheetTitle>
						</SheetHeader>
						<nav
							aria-label="Principal"
							className="flex w-16 shrink-0 flex-col items-center gap-1 border-r bg-sidebar p-2"
						>
							<Button
								variant="ghost"
								size="icon"
								aria-label="Fechar navegação"
								onClick={() => setOpen(false)}
							>
								<Icon icon={Close} />
							</Button>
							<div className="my-1 h-px w-5 bg-border" />
							{items.map((item) => (
								<MobileRailIconLink
									key={item.href}
									item={item}
									active={isActive(item, pathname)}
									onNavigate={() => setOpen(false)}
									onPrefetch={() => prefetchSection(item.section)}
								/>
							))}
						</nav>
						<AgentBuilderSidebar
							className="flex flex-1"
							onNavigate={() => setOpen(false)}
						/>
					</SheetContent>
				) : (
					<SheetContent side="left" className="w-72 gap-0 p-0">
						<SheetHeader>
							<SheetTitle>Navegação</SheetTitle>
						</SheetHeader>
						<nav
							aria-label="Principal"
							className="flex flex-1 flex-col gap-1 bg-sidebar p-3"
						>
							{items.map((item) => (
								<MobileRailLink
									key={item.href}
									item={item}
									active={isActive(item, pathname)}
									onNavigate={() => setOpen(false)}
									onPrefetch={() => prefetchSection(item.section)}
								/>
							))}
						</nav>
					</SheetContent>
				)}
			</Sheet>
		</>
	);
}
