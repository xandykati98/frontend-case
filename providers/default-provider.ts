import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator()

/**
 * @description Retorna a imagem com as modificações
 * @param src 
 * @param { modifiers: { [key: string]: string }, baseURL: string } options
 */
export const getImage: ProviderGetImage = (
    src,
    { modifiers = {}, baseURL } = {}
) => {

    if (!baseURL) {
        // Se não for passado um baseURL, pega o siteUrl do runtimeConfig
        baseURL = useRuntimeConfig().public.siteUrl
    }
    
    const operations = operationsGenerator(modifiers)

    return {
        url: joinURL(baseURL, src + (operations ? '?' + operations : '')),
    }
}
