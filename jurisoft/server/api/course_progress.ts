import { APIResponse } from "../crosstypes"

export default defineEventHandler((event):APIResponse<number> => {
    return {
        status: 200,
        message: 'OK',
        data: 25
    }
})