import { APIResponse } from "../crosstypes";

export default defineEventHandler(async (event):Promise<APIResponse<string>> => {
    const body = await readBody(event)
    const mood = body.mood
    const message = body.message

    /**
     * enviar "message" e "mood" para o backend
     */

    await sleep(1000)
    return {
        status: 200,
        message: 'OK',
        data: mood
    }
});

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
