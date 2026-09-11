import type { Metadata } from "next";
import { AuthHeading, AuthShell } from "@/components/auth-shell";
import { requireMailboxAccess } from "@/lib/session";
import { ResearchForm } from "./research-form";

export const metadata: Metadata = {
	title: "Chave de pesquisa",
};

export const instant = false;

export default async function ResearchKeyPage() {
	await requireMailboxAccess();

	return (
		<AuthShell>
			<AuthHeading
				title="Leve os dados do seu CRM a outro nível"
				description="Potencialize seu agente de pesquisa com o Context para pesquisar toda empresa adicionada ao seu CRM."
			/>

			<ResearchForm />
		</AuthShell>
	);
}
