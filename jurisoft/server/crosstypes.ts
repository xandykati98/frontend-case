
interface APIResponse<Type> {
    status: number,
    message: string,
    data: Type;
}
interface User {
    name: string,
    email: string,
    avatar: string,
    verified: boolean,
    job: string,
}
interface TimeReport {
    /**
     * Total em milissegundos trabalhados
     */
    total: number,
    /**
     * Total em milissegundos trabalhados por tag
     */
    tags: {
        Descanso: number,
        Ativo: number,
        'Hora extra': number,
    },
}

export { TimeReport, APIResponse, User };
