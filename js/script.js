// profile information overview that will appear at the top of the page
const overview = document.querySelector(".overview");
const username = "atgorman1";
// unordered list that lists all of the repos
const repoUl = document.querySelector(".repo-list");
// repo class where all the repo info appears
const repoInfoSpace = document.querySelector(".repos");
// repo-data class where indicidual repo data appears
const repoData = document.querySelector(".repo-data");

// async function that will pull the GH profile info
const getProfile = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const profile = await res.json();
  console.log(profile);
  displayProfileData(profile);
};
getProfile();

const displayProfileData = async function (profile) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `<figure>
      <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Bio:</strong> ${profile.bio}</p>
      <p><strong>Location:</strong> ${profile.location}</p>
      <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div>`;
  overview.append(div);
  getRepos();
};

// async function that will pul the GH repos
const getRepos = async function () {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`
  );
  const repos = await res.json();
  console.log(repos);
  displayRepoName(repos);
};

const displayRepoName = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoUl.append(repoItem);
  }
};

repoUl.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoDetails(repoName);
  }
});

const getRepoDetails = async function (repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await res.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  const languages = [];
  for (language in languageData) {
    languages.push(language);
  }
  console.log(languages);
  displayRepoDetails(repoInfo, languages);
};

const displayRepoDetails = function (repoInfo, languages) {
  repoData.innerHTML = "";
  const repoInfoDiv = document.createElement("div");
  repoInfoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.defualt_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(repoInfoDiv);
  repoInfoSpace.classList.add("hide");
  repoData.classList.remove("hide");
};
