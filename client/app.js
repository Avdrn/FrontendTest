
// Select element from HTML

const inputValue = document.getElementById("search")
const searchBtn = document.getElementsByClassName("search-btn")[0]
const username = document.getElementsByClassName("username-container")[0]
const name = document.getElementsByClassName("name-container")[0]
const bio = document.getElementsByClassName("bio-container")[0]
const img = document.getElementsByClassName("img-container")[0]
const repositories = document.getElementsByClassName("repositories-container")[0]
const searchBoxErrorMsg = document.getElementsByClassName("search-box_error-msg")[0]
const app = document.getElementsByClassName("app")[0]

// API infos

const client_id = "Iv1.ac9d51bedd230a1f"
const client_secret = "524701ddf0dd063868dd7af0a9dc5fe06e0dcb9b"
const url = "https://api.github.com"

// Get users and display info

const GetUsers = async(user) => {
  const api_call = await fetch(`${url}/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
  const data = await api_call.json()
  return {data}
}

const showUsers = () => {

  GetUsers(inputValue.value).then((res) => {

      if (res.data.message === "Not Found") {
        let div = document.createElement('div')
        div.textContent = "Does not exist"
        div.setAttribute('class', 'error-box')
        searchBoxErrorMsg.appendChild(div)
        app.removeChild(userInfoContainer)
        return
      } else {
        img.src = `${res.data.avatar_url}`
        name.innerHTML = `${res.data.name}`
        username.innerHTML = `@${res.data.login}`
        bio.innerHTML = `${res.data.bio}`
        showRepos()
      }
  })
}

// Get repos of user and display info

const getRepos = async(user) => {
  const api_call = await fetch(`${url}/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`)
  const repos = await api_call.json()
  return {repos}
}

const showRepos = () => {
  let repoTitle = document.createElement("div")
  repoTitle.setAttribute('class', 'repo-title')
  repoTitle.innerHTML = "Repositories"
  repositories.appendChild(repoTitle)

  getRepos(inputValue.value).then((res) => {
    res.repos.forEach(element => {

      // Create a div

      let repoElement = document.createElement("div")
      repoElement.setAttribute('class', 'repo-element')
      repositories.appendChild(repoElement)  

      // set name of repo

      let repoName = document.createElement("div")
      repoName.setAttribute('class', 'repo-name')
      repoElement.appendChild(repoName)
      repoName.innerHTML = `${element.full_name}`

      // Fork count and image creation

      let repoFork = document.createElement("div")
      repoFork.setAttribute('class', 'repo-fork')
      repoElement.appendChild(repoFork)
      
      let forkP = document.createElement("p")
      forkP.setAttribute('class', 'fork-p')
      forkP.innerHTML = `${element.forks_count}`
      repoFork.appendChild(forkP)


      let forkImg = document.createElement("img")
      forkImg.setAttribute('class', 'fork-img')
      forkImg.setAttribute('src', 'https://user-images.githubusercontent.com/17777237/54873012-40fa5b00-4dd6-11e9-98e0-cc436426c720.png')
      repoFork.appendChild(forkImg)

      // Stars count and image creation

      let repoStars = document.createElement("div")
      repoStars.setAttribute('class', 'repo-stars')
      repoElement.appendChild(repoStars)

      let starsP = document.createElement("p")
      starsP.setAttribute('class', 'stars-p')
      starsP.innerHTML = `${element.stargazers_count}`
      repoStars.appendChild(starsP)


      let starImg = document.createElement("img")
      starImg.setAttribute('class', 'star-img')
      starImg.setAttribute('src', 'https://image.flaticon.com/icons/png/512/130/130188.png')
      repoStars.appendChild(starImg)

    })
  })
}


// onclick function

searchBtn.onclick = function(){

  let errorBox = document.getElementsByClassName("error-box")[0]
 
  if (errorBox) {
   searchBoxErrorMsg.removeChild(errorBox)
 }

 showUsers()
}
