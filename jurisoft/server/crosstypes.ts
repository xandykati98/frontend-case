
interface APIResponse<Type> {
    status: number,
    message: string,
    data: Type;
}

type Comment = {
    user: User,
    message: string,
    id: string,
    liked: boolean,
}
interface Tab {
    user?: User | null,
    comments?: Comment[] | null,
}
interface TabInfoFrontend extends Tab {
    description: string,
}
type TabsInfo<T = TabInfoFrontend> = {
    [tabName: string]: T
    
}
interface User {
    name: string,
    email: string,
    avatar: string,
    verified: boolean,
    job: string,
    pronouns?: 'ela/dela' | 'ele/dele' | 'neutro' | 'outro' | 'não informado',
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

export { TimeReport, APIResponse, User, TabsInfo, Comment, Tab };
