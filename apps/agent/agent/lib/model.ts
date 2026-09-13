import { openai } from "@ai-sdk/openai";
import { db } from "@crm/db";
import { readAgentModel } from "@crm/db/settings";

const DIRECT_OPENAI_MODEL = "gpt-4.1";
const DIRECT_OPENAI_CONTEXT_WINDOW_TOKENS = 1_047_576;

export interface ModelSelection {
	model: string | ReturnType<typeof openai>;
	modelContextWindowTokens: number;
}

export async function selectedModel(): Promise<ModelSelection | null> {
	if (process.env.OPENAI_API_KEY) {
		return {
			model: openai(DIRECT_OPENAI_MODEL),
			modelContextWindowTokens: DIRECT_OPENAI_CONTEXT_WINDOW_TOKENS,
		};
	}

	try {
		const setting = await readAgentModel(db);

		if (setting.isDefault) return null;

		return {
			model: setting.id,
			modelContextWindowTokens: setting.contextWindowTokens,
		};
	} catch (error) {
		console.error(
			`[agent] could not read the configured model, falling back: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);
		return null;
	}
}
