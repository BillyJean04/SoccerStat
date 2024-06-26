import { fetcher } from "@/lib/utils";
import { ParticularTeamDataApi } from "@/services/teams/privateTypes";

const authToken = import.meta.env.VITE_API_KEY;

export async function getTeamName(id: number) {
    try {
        const data: ParticularTeamDataApi = await fetcher(`/api/teams/${id}`, {
            headers: {
                "X-Auth-Token": authToken,
            },
        });

        return data.name;
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message.includes("You reached your request limit.")) {
                throw new Error("Достигнут лимит на запросы. Попробуйте позже");
            }
        }
    }
}
