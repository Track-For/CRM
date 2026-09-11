import { DEFAULT_WORKSPACE_NAME } from "@crm/auth";
import type { Metadata } from "next";
import { AuthHeading, AuthShell } from "@/components/auth-shell";
import { requireMailboxAccess } from "@/lib/session";
import { OnboardingForm } from "./onboarding-form";

export const metadata: Metadata = {
	title: "Configuração",
};

export const instant = false;

export default async function OnboardingPage() {
	await requireMailboxAccess();

	return (
		<AuthShell>
			<AuthHeading
				title="Fale sobre sua empresa"
				description="Duas coisas, uma vez. O nome é como o CRM vai te chamar; o site é como o agente aprende o que você vende."
			/>

			<OnboardingForm placeholder={DEFAULT_WORKSPACE_NAME} />
		</AuthShell>
	);
}
