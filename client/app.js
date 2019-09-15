
// Select element from HTML

const inputValue = document.getElementById("search")
const searchBtn = document.getElementsByClassName("search-btn")[0]
const username = document.getElementsByClassName("username-container")[0]
const name = document.getElementsByClassName("name-container")[0]
const bio = document.getElementsByClassName("bio-container")[0]
const repositories = document.getElementsByClassName("repositories-container")[0]
const searchBoxErrorMsg = document.getElementsByClassName("search-box_error-msg")[0]

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
 let errorBox = document.getElementsByClassName("error-box")[0]

  GetUsers(inputValue.value).then((res) => {
    if (errorBox) {
        searchBoxErrorMsg.removeChild(errorBox)
    }
      if (res.data.message === "Not Found") {
        let div = document.createElement('div')
        div.textContent = "Does not exist"
        div.setAttribute('class', 'error-box')
        searchBoxErrorMsg.appendChild(div)
        return
      } else {
        name.innerHTML = `Name : <span>${res.data.name}</span>`
        username.innerHTML = `Username : <span>${res.data.login}</span>`
        bio.innerHTML = `Bio : <span>${res.data.bio}</span>`
        repositories.innerHTML = `Number of repositories : <span>${res.data.public_repos}</span>`
        repositories.appendChild(document.createElement("br"))
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
  getRepos(inputValue.value).then((res) => {
    res.repos.forEach(element => {
      console.log(element.full_name)
      repositories.appendChild(document.createTextNode(element.full_name))
      repositories.appendChild(document.createTextNode(element.forks_count))
      repositories.appendChild(document.createTextNode(element.stargazers_count))
      repositories.appendChild(document.createElement("hr"))
    })
  })
}


// onclick function

searchBtn.onclick = function(){
showUsers()
showRepos()
}
