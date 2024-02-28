//   "characters": "https://rickandmortyapi.com/api/character",
//   "locations": "https://rickandmortyapi.com/api/location",
//   "episodes": "https://rickandmortyapi.com/api/episode"

const page = 1
const baseUrl = 'https://rickandmortyapi.com/api'

const loadCharacter = async ()=>{ // ja q essa função vai fazer uma requisição HTTP, ela precisa ser assincrona (async)
    const res = await fetch(`${baseUrl}/character?page=${page}`)
    const data = await res.json()
    const limitData = data.results.slice(3,9)
    
    return {results: limitData}
}

const loadLocation = async ()=>{
    const res = await fetch(`${baseUrl}/location`)
    const data = await res.json()
    const limitData = data.results.slice(0,10)
    
    return {results: limitData}
}

const loadEpisode = async ()=>{
    const res = await fetch(`${baseUrl}/episode`)
    return await res.json()
}


const loadAllWithPromiseAll = async ()=>{
    const [character, location, episode] = await Promise.all([
        loadCharacter(),
        loadLocation(),
        loadEpisode()
    ])
    showCharacter(character.results) // results pra mostrar só os dados especificos daquela api (nesse caso os personagens)
    showLocation(location.results)
    console.log("Episode: ",episode.results)
}

loadAllWithPromiseAll()

function showCharacter(characters){
    const characterContainer = document.getElementById('character-container');
    characters.map((character)=>{
        const divCharacter = document.createElement("div")
        
        divCharacter.id = `character-${character.id}`

        divCharacter.innerHTML = `
            <img src="${character.image}" alt="Imagem do personagem">
            <article class="character-info">
                <h3>${character.name}</h3>
                <span class="status"><div></div>${character.status} - ${character.species}</span>
                
                <div class="lastLocation">
                <span class="lastLocationText">Last know location:</span>

                    <div class="location-box">
                        <a href="${character.location.url}">${character.location.name}</a>
                    </div>
                </div>
                
                <div class="origin">
                <span class="firstSee">First seen in:</span>
                <a href="${character.origin.url}">${character.origin.name}</a>
                </div>

            </article>
            `;
            console.log(character.status)
            divCharacter.classList.add('character-box')
        characterContainer.appendChild(divCharacter) // tudo isso pra fazer aparecer as informações no HTML

        divCharacter.addEventListener(`click`, async()=>{
            characterDetails(character.id)
        })
    })

}

function characterDetails(id){ // parametro ID pois está recebendo o id do personagem
    // console.log(id)
    // console.log(encryptId(id))

    const idCrypted = encryptId(id)
    window.location.href = `./pages/character.html?id=${idCrypted}` // isso aqui vai fazer com que abre em outra página com as informações daquele personagem de acordo com o ID dele
}
function encryptId(id){
    return id.toString(36)
}
function showLocation(location){
    const locationContainer = document.getElementById('location-container')
    location.map((location) => {
        const divLocation = document.createElement('div')
        divLocation.innerHTML = `
        <p classe="title">${location.name}</p>
        <p classe="type">${location.type}</p>
        <p classe="dimension">${location.dimension}</p>
        <p classe="residents">${location.residents.length}</p>
        `;
        divLocation.classList.add('location-box')
        locationContainer.appendChild(divLocation)
    })
    console.log(location)
}