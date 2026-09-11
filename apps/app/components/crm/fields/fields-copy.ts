import type { RecordKind } from "@/components/crm/record-sheet/record-stack";
import type { FieldEntity } from "./fields-entity";

export const SHEET_TITLE = "Campos";

const SUBTITLE = {
	company: "Isso molda toda empresa no seu CRM.",
	contact: "Isso molda todo contato no seu CRM.",
	deal: "Isso molda todo negócio no seu CRM.",
} satisfies Record<RecordKind, string>;

export function subtitleFor(kind: RecordKind): string {
	return SUBTITLE[kind];
}

export const STANDARD_ROW = "Campos padrão";
export const STANDARD_NOTE = "somente reordenar e ocultar";
export const SUGGESTED_ROW = "Campos sugeridos";
export const SUGGESTED_NOTE = "um clique para adicionar";
export const ADD = "Adicionar";
export const CUSTOM_GROUP = "Campos personalizados";
export const DRAG_NOTE = "Arraste para ordenar";
export const ARCHIVED_ROW = "Arquivados";
export const ARCHIVED_NOTE = "valores mantidos, ocultos em todo lugar";
export const NEW_FIELD = "Novo campo";
export const ORDER_NOTE = "A ordem aqui é a ordem na ficha";
export const MANUAL_ONLY = "Somente manual";
export const TABLE_NOTE = "também é coluna na tabela";
export const FILTER_NOTE = "também é filtro";

export const EMPTY_TITLE = "Ainda não há campos personalizados";
export const EMPTY_BODY =
	"Crie campos dinâmicos que seus agentes podem pesquisar e preencher.";

export const ERROR_TITLE = "Não foi possível carregar seus campos";
export const ERROR_BODY =
	"Seus campos continuam lá. Tente novamente em instantes, antes de criar algo novo.";
export const RETRY = "Tentar novamente";

export const LABEL_LABEL = "Rótulo";
export const KEY_LABEL = "Chave";
export const KEY_HELP =
	"O que a API e seus agentes usam para chamar este campo. Definida a partir do rótulo, fixada após salvar — renomear o rótulo depois nunca quebra quem consome.";
export const AGENT_LABEL = "Permitir que seus agentes preencham isso";
export const AGENT_HELP =
	"Eles propõem um valor com uma fonte, e nunca sobrescrevem o seu.";
export const BRIEF_LABEL = "O que conta como resposta";
export const BRIEF_HELP =
	"Deixe em branco e seus agentes trabalham apenas com o rótulo e o tipo.";
export const TYPE_LABEL = "Tipo";
export const OPTIONS_LABEL = "Opções";
export const ADD_OPTION = "Adicionar opção";
export const ALL_FILLED = "Nada mais para preencher";

export function optionLabel(index: number): string {
	return `Opção ${index + 1}`;
}
export const ADD_FIELD = "Criar campo";
export const CANCEL = "Cancelar";
export const SAVE = "Salvar alterações";
export const ARCHIVE = "Arquivar";
export const FILL_REST = "Preencher o restante";

const SHEET_PLACEMENT = {
	COMPANY: "Mostrar na ficha da empresa",
	CONTACT: "Mostrar na ficha do contato",
	DEAL: "Mostrar na ficha do negócio",
} satisfies Record<FieldEntity, string>;

const TABLE_PLACEMENT = {
	COMPANY: "Oferecer como coluna na tabela de Empresas",
	CONTACT: "Oferecer como coluna na tabela de Contatos",
	DEAL: "Oferecer como coluna na tabela de Negócios",
} satisfies Record<FieldEntity, string>;

const FILTER_PLACEMENT = {
	COMPANY: "Oferecer como filtro na tabela de Empresas",
	CONTACT: "Oferecer como filtro na tabela de Contatos",
	DEAL: "Oferecer como filtro na tabela de Negócios",
} satisfies Record<FieldEntity, string>;

export function sheetPlacement(entity: FieldEntity): string {
	return SHEET_PLACEMENT[entity];
}

export function tablePlacement(entity: FieldEntity): string {
	return TABLE_PLACEMENT[entity];
}

export function filterPlacement(entity: FieldEntity): string {
	return FILTER_PLACEMENT[entity];
}

export const ENTITY_TABS = [
	{ kind: "company", label: "Empresas" },
	{ kind: "contact", label: "Contatos" },
	{ kind: "deal", label: "Negócios" },
] as const satisfies readonly { kind: RecordKind; label: string }[];
