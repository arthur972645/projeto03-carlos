function descryptId(id){
    return parseInt(id, 36)
}

async function loadCharacter(baseUrl, id){
    try { // vai receber os dados da Url base mas somento do personagem com o id selecionado
        const response = await fetch(`${baseUrl}/${id}`)
        if(!response.ok){
            throw new Error('Erro ao carregar o personagem')
        }
        return await response.json();
    } catch (error) { // se vier com algum erro
        console.error(error)
        throw error;
    }
}

async function load(){
    const UrlParams = new URLSearchParams(window.location.search)
    const idParam = UrlParams.get('id')
    console.log(descryptId(idParam))

    if(!idParam){
        console.error('ID não encontrado na URL')
        return
    }

    const idDescrypted = descryptId(idParam)
    const urlBase = `https://rickandmortyapi.com/api/character`

    try {
        const character = await loadCharacter(urlBase, idDescrypted)
        console.log('Character: ', character)
    } catch (error) {
        console.error('Erro ao carregar o personagem')
    }
}
load()         
async function showCharacter(character){
    
}