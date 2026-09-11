import type { CarbonIcon } from "@crm/ui/components/icon";

export type AgentRecordKind = "contact" | "company" | "deal";

export type AgentRecord = { kind: AgentRecordKind; id: string };

type RecordCopy = {
	header: string;
	field: "contactId" | "companyId" | "dealId";
	title: string;
	blurb: string;
	placeholder: string;
	suggestions: string[];
};

type RecordCopyByKind = Record<AgentRecordKind, RecordCopy>;

export type AgentRecordHeader = Record<string, string>;

export type AgentRecordFilter = {
	contactId?: string;
	companyId?: string;
	dealId?: string;
};

const COPY: RecordCopyByKind = {
	contact: {
		header: "x-crm-contact",
		field: "contactId",
		title: "Pergunte sobre esta pessoa",
		blurb:
			"Cada etapa é mostrada conforme acontece — incluindo os leads que ele descarta.",
		placeholder: "Ainda está por aqui?",
		suggestions: [
			"Quem é essa pessoa?",
			"Ainda está por aqui?",
			"O que devo saber antes de uma ligação?",
		],
	},
	company: {
		header: "x-crm-company",
		field: "companyId",
		title: "Pergunte sobre esta empresa",
		blurb:
			"Ele lê o site deles e o nosso histórico com eles, e mostra o raciocínio.",
		placeholder: "O que eles vendem?",
		suggestions: [
			"O que eles fazem?",
			"Quem conhecemos aqui?",
			"O que mudou recentemente?",
		],
	},
	deal: {
		header: "x-crm-deal",
		field: "dealId",
		title: "Pergunte sobre este negócio",
		blurb:
			"Ele pode ler a conversa, as reuniões e as pessoas dos dois lados dela.",
		placeholder: "Onde isso empacou?",
		suggestions: [
			"Como está esse negócio?",
			"Quem mais deveria estar envolvido?",
			"Qual é o risco aqui?",
		],
	},
};

export function recordCopy(kind: AgentRecordKind): RecordCopy {
	return COPY[kind];
}

export function recordHeader(record: AgentRecord): AgentRecordHeader {
	return { [COPY[record.kind].header]: record.id };
}

export function recordFilter(record: AgentRecord): AgentRecordFilter {
	return { [COPY[record.kind].field]: record.id };
}

export type { CarbonIcon };
