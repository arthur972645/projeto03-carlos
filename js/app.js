// "characters": "https://rickandmortyapi.com/api/character",
//   "locations": "https://rickandmortyapi.com/api/location",
//   "episodes": "https://rickandmortyapi.com/api/episode"

const page = 2
const baseUrl = 'https://rickandmortyapi.com/api/'

const loadCharacter = async() => {
    const res =  await fetch(`${baseUrl}/character?page=${page}`)
    const data= await res.json()
    const limitData = data.results.slice(0,9)
    return {results: limitData}
}
const loadLocation = async () => {
    const res =  await fetch(`${baseUrl}/location`)
    return await res.json()
}
const loadEpisode = async () => {
    const res =  await fetch(`${baseUrl}/episode`)
    return await res.json()
}

const loadAllWithPromiseAll = async () =>{
    const [character, location, episode] = await Promise.all([
        loadCharacter(),
        loadLocation(),
        loadEpisode()

    ])
    showChatacter(character.results)
    showChatacter(location.results)
   showChatacter(episode.results)
}
loadAllWithPromiseAll()

function showChatacter(character){
    const charactersContainer = document.getElementById("character-container");
    character.map((character) => {
        const divCharacter = document.createElement('div')
        divCharacter.innerHTML = `
            <img src = "${character.image}" alt="imagem do personagem">
            <article>
                <h3>${character.name}</h3>
                <span>${character.status} - ${character.species}</span>

                <span classe = "location"> Location: </span>
                <a href="${character.location.url}">${character.location.name}</a>
        
                <span classe = "origin"> Origin: </span>
                <a href="${character.origin.url}">${character.origin.name}</a>
            </article>
        `;
        
        divCharacter.classList.add('character-box')
        charactersContainer.appendChild(divCharacter)

    })
}