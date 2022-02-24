import axios from "axios";
const jwt = require("jsonwebtoken");
//Question: is the config folder a shared resource in that we should verify the token
// or should we just decode the token?

const BASE_URL = "https://jobly-backend-final.herokuapp.com" || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = localStorage.token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log(err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  ///COMPANY FUNCTIONS-----------------------------------

  /** Get details on a company by handle. 
   * input: handle - company handle as a string
   * output: { handle, name, description, numEmployees, logoUrl, jobs }
   *     where jobs is [{ id, title, salary, equity }, ...]
  */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies matching filerQuery. 
   *  input: filterQuery - string to filter for company names.
   *  output: [{ handle, name, description, numEmployees, logoUrl }, ...]
  */

  static async getCompanies(filterQuery) {
    const query = (filterQuery)
      ? { name: filterQuery }
      : {};
    let res = await this.request(`companies`, query);
    return res.companies;
  }

  /** Get all jobs matching filterQuery. 
   * input: filterQuery - string to filter for job titles.
   * output: [{ id, title, salary, equity, companyHandle, companyName }, ...]
  */

  static async getJobs(filterQuery) {
    const query = (filterQuery)
      ? { title: filterQuery }
      : {};
    let res = await this.request(`jobs`, query);
    return res.jobs;
  }

  ///AUTH FUNCTIONS-----------------------------------

  /**Login user with {username, passsword}. Returns token. */
  static async login({ username, password }) {
    console.log('in JoblyApi.js login', { username, password });
    let res = await this.request(`auth/token`, { username, password }, "post");
    this.token = res.token;
    console.log('in JoblyApi.js login after token', this.token);
    return res.token;
  }
  /**Register user with { username, password, firstName, lastName, email }.
   * Returns token. */
  static async register({ username, password, firstName, lastName, email }) {
    let res = await this.request(
      `auth/register`,
      { username, password, firstName, lastName, email },
      "post");
    this.token = res.token;
    return res.token;
  }

  /**Logout user, update token, returns token */
  static logout() {
    this.token = "";
    return this.token;
  }

  ///USER FUNCTIONS-----------------------------------
  /** Gets user information
    * input: token
    * output: userData - { username, firstName, lastName, isAdmin, jobs }
    *     where jobs is { id, title, companyHandle, companyName, state }
  */
  static async getUser(token) {
    const username = jwt.decode(token).username;
    console.log('user', username);
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  /** Gets user jobs
  * input: username
  * output: user's job list: [{ id, title, companyHandle, companyName, state }, ...]
*/
  static async getUserJobs(username) {
    let res = await this.request(`users/${username}`);
    return res.user.jobs;
  }

  /** Updates user info if pw is valid
    * input: formData -  { username, firstName, lastName, password, email }
    * output: userData - { username, firstName, lastName, isAdmin }
  */
  static async updateUser(formData) {
    console.log('updateUser in api.js');
    let username;
    let password;
    let newUserData;
    ({ username, password, ...newUserData } = formData);
    console.log('in updateUser, above this.login', { username, password, newUserData });
    await this.login({ username, password });
    let res = await this.request(`users/${username}`, newUserData, "patch");
    console.log('res is:', res.user);
    return res.user;
  }

  /** Return status of user application
    * input: username, jobId
    * output: applicationStatus - jobId
  */
  static async getApplicationStatus(username, jobId) {
    let res = await this.request(`users/${username}/${jobId}`, {}, "post");
    return res.applied;
  }
}

export default JoblyApi;