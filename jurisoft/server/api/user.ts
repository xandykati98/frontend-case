import { APIResponse, User } from "../crosstypes"

export default defineEventHandler((event):APIResponse<User> => {
    return {
        status: 200,
        message: 'OK',
        data: {
            name: 'Sophia Williams',
            email: 'sophia@jurisoft.com',
            avatar: 'profile.png',
            verified: true,
            job: 'Advogada',
        }
    }
})