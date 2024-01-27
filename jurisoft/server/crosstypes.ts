
interface APIResponse<Type> {
    status: number,
    message: string,
    data: Type;
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

export { TimeReport, APIResponse };
