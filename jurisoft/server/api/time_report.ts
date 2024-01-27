import { type TimeReport, type APIResponse } from '../crosstypes'

export default defineEventHandler((event):APIResponse<TimeReport> => {
    // 12 hours 27 minutes. to ms exactly = 12 * 60 * 60 * 1000 + 27 * 60 * 1000 = 44820000
    const total = 12 * 60 * 60 * 1000 + 27 * 60 * 1000
    const timeReport:TimeReport = {
        total: total, 
        tags: {
            // 8 hours 57 minutes 36 seconds, or, in ms, 8 * 60 * 60 * 1000 + 57 * 60 * 1000 + 36 * 1000 = 32256000
            Descanso: ((total / 100) * 72),
            // 2 hours 21 minutes 36 seconds, or, in ms, 2 * 60 * 60 * 1000 + 21 * 60 * 1000 + 36 * 1000 = 8496000
            Ativo: ((total / 100) * 188),
            // 5 hours 57 minutes 36 seconds, or, in ms, 5 * 60 * 60 * 1000 + 57 * 60 * 1000 + 36 * 1000 = 21456000
            'Hora extra': ((total / 100) * 48)
        },
    }
    return {
        status: 200,
        message: 'OK',
        data: timeReport
    }
})