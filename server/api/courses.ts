import { APIResponse, Course } from "../crosstypes"

export default defineEventHandler((event):APIResponse<Course[]> => {
    return {
        status: 200,
        message: 'OK',
        data: [
            {
                professor: {
                    name: 'Nuray Aksoy',
                    email: 'nuray@jurisoft.com',
                    avatar: 'profile6.png',
                    verified: true,
                    job: 'Gerente de produto',
                },
                name: 'Time Management',
                // Ago 21 - Set 04
                dateStart: new Date(new Date('2024-08-21').getTime()),
                dateEnd: new Date(new Date('2024-09-04').getTime()),
                progress: 30,
                status: 'Em andamento',
                id: '1',
            },
            {
                professor: {
                    name: 'Arthur Taylor',
                    email: 'arthur@jurisoft.com',
                    avatar: 'profile7.png',
                    verified: true,
                    job: 'CEO',
                },
                name: 'Leadership Skills',
                // Ago 02 - Ago 18
                dateStart: new Date(new Date('2024-08-02').getTime()),
                dateEnd: new Date(new Date('2024-08-18').getTime()),
                progress: 70,
                status: 'Em andamento',
                id: '2',
            },
            {
                professor: {
                    name: 'Lena Müller',
                    email: 'lena@jurisoft.com',
                    avatar: 'profile4.png',
                    verified: true,
                    job: 'Gerente de marketing',
                },
                name: 'Diversity Training',
                // Jun 24 - Jul 03
                dateStart: new Date(new Date('2024-06-24').getTime()),
                dateEnd: new Date(new Date('2024-07-03').getTime()),
                progress: 100,
                status: 'Concluído',
                id: '3',
            },
            {
                professor: {
                    name: 'Wei Chen',
                    email: 'wei@jurisoft.com',
                    avatar: 'profile8.png',
                    verified: true,
                    job: 'Gerente de operações',
                },
                name: 'Efficiency at Work',
                // Jun 04 - Jul 28
                dateStart: new Date(new Date('2024-06-04').getTime()),
                dateEnd: new Date(new Date('2024-07-28').getTime()),
                progress: 100,
                status: 'Concluído',
                id: '4',
            },
        ]
    }
})