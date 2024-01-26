export default defineEventHandler((event) => {
    return {
        status: 200,
        data: {
            user: {
                name: 'Sophia Williams',
                email: 'sophia@jurisoft.com',
                avatar: 'profile.png',
                verified: true,
                job: 'Advogada',
            }
        }
    }
})