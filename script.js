const form = document.querySelector("form")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let inputSearch = document.querySelector("input").value
    searchMovie(inputSearch)
    console.log(inputSearch)
})

//---------------METHODE-----------------------//
const api_key = apiKey

function searchMovie(inputSearch) {
    const url = `https://www.omdbapi.com/?s=${inputSearch}&apikey=${api_key}`
    fetch(url, {
        method: "GET",
    })
        .then((response) => res = response.json())
        .then((res) => {

            let data = res.Search
            let result = document.querySelector(".searchResult")
            console.log(res)
            result.innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                const title = data[i].Title
                const year = data[i].Year
                const poster = data[i].Poster
                const idMovie = data[i].imdbID
                let notFound = document.querySelector(".not-found-message")
                notFound.innerHTML = ""
                showResult(result, title, year, poster, idMovie)
            }
        })
        .catch((error) => {
            let notFound = document.querySelector(".not-found-message")
            notFound.innerHTML = ""
            let result = document.querySelector(".searchResult")
            result.innerHTML = ""
            showErrorMessage(notFound)
        });
}


function readMore(idMovie) {
    const url = `http://www.omdbapi.com/?i=${idMovie}&apikey=${api_key}`
    fetch(url)
        .then((response) => res = response.json())
        .then((res) => {
            let popUpDetail = res
            console.log(popUpDetail)
            const title = popUpDetail.Title
            const released = popUpDetail.Released
            const plot = popUpDetail.Plot
            const poster = popUpDetail.Poster
            const pop = document.querySelector(".detail")
            console.log(plot)
            pop.innerHTML = ""
            pop.classList.add('detail-active')
            showPopup(pop, title, released, plot, poster)
        })
        .catch((error) => {
            console.log(error)
        });
}


const showPopup = (selector, title, released, plot, poster) => {
    console.log("here")
    selector.innerHTML += `<div class="card popup text-left">
                                <div class="row no-gutters">
                                    <div class="col-md-4 img-card">
                                        <img class="img-fluid" src="${poster}" alt="posterMovie">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h2 class="card-title">Title: ${title}</h2>
                                            <h3 class="card-title">Released in: ${released}</h3>
                                            <p class="card-text">Description: ${plot}</p>
                                        </div>
                                    </div>
                                    <a class="close btn btn-secondary" onClick="closePopup()">Close</a>
                                </div>   
                            </div>`

}

const showResult = (selector, title, year, poster, idMovie) => {
    console.log("here")
    selector.innerHTML += `<div class="card result mb-3">
                                <div class="row no-gutters wrap">
                                    <div class="col-md-4 img-card">
                                        <img class="img-fluid" src="${poster}" alt="posterMovie">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${title}</h5>
                                            <p class="card-text">${year}</p>
                                            <button class="btn btn-primary" onclick="readMore('${idMovie}')">Read More</button>
                                        </div>
                                    </div>
                                </div>
                            <div/>`

}

const showErrorMessage = (selector, data) => {
    selector.innerHTML += `<p class= not-found> Any result match with your keyword</p>`
}

const closePopup = () => {
    const detail = document.querySelector(".detail")
    detail.innerHTML = ""
    const pop = document.querySelector(".detail")
    pop.classList.remove('detail-active')
}


