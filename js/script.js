// profile information overview that will appear at the top of the page
const overview = document.querySelector(".overview");
const username = "atgorman1";
// unordered list that lists all of the repos
const repoUl = document.querySelector(".repo-list");

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
    `https://api.github.com/users/${username}/repos?sort=updated&direction=asc&per_page=100`
  );
  const repos = await res.json();
  console.log(repos);
  displayRepoInfo(repos);
};

const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoUl.append(repoItem);
  }
};
