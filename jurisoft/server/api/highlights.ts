import { APIResponse, Tab, TabsInfo, User } from "../crosstypes"

export default defineEventHandler((event):APIResponse<TabsInfo<Tab>> => {
    return {
        status: 200,
        message: 'OK',
        data: {
            'Geral': {
                user: {
                    name: 'Matthew Johnson',
                    email: 'matthew@jurisoft.com',
                    avatar: 'profile2.png',
                    verified: true,
                    job: 'Engenheiro de Software',
                }
            },
            'Comentários': {
                comments: [
                    {
                        user: {
                            name: 'James Brown',
                            email: 'james@jurisoft.com',
                            avatar: 'profile3.png',
                            verified: true,
                            job: 'Advogado',
                        },
                        liked: true,
                        message: 'Parabéns, Matthew! 🔥',
                        id: '1',
                    },
                    {
                        user: {
                            name: 'Lena Müller',
                            email: 'lena@jurisoft.com',
                            avatar: 'profile4.png',
                            verified: true,
                            job: 'Advogado',
                        },
                        liked: true,
                        message: 'Ótimo trabalho! 🤗',
                        id: '2',
                    },
                    {
                        user: {
                            name: 'Juma Omondi',
                            email: 'juma@jurisoft.com',
                            avatar: 'profile5.png',
                            verified: true,
                            job: 'Advogado',
                        },
                        liked: false,
                        message: 'O céu é o limite! ⚡️',
                        id: '3',
                    }
                ]
            },
            'Prêmios': {
                user: {
                    name: 'Matthew Johnson',
                    email: 'matthew@jurisoft.com',
                    avatar: 'profile2.png',
                    verified: true,
                    job: 'Engenheiro de Software',
                }
            }
        }
    }
})