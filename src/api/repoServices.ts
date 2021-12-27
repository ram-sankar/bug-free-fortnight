import HTTP from "./httpClient";

const getRepos = () => HTTP.get("/user/repos");

export default { getRepos }