
const API_ROOT = 'https://api.realworld.io/api';
let token = null;

const agent = async (url, body, method = 'GET') => {
  const headers = new Headers();
  if (body) {
    headers.set("Content-Type", "application/json")
  }
  if (token) {
    // console.log("logged in")
    headers.set("Authorization", `Token ${token}`)
  }
  const response = await fetch(`${API_ROOT}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  let result;
  try {
    result = await response.json()
  } catch (error) {
    result = { errors: { [response.status]: [response.statusText] } };
  }

  if (!response.ok) throw result;
  return result
}
function serialize(object) {
  const params = [];

  for (const param in object) {
    if (Object.hasOwnProperty.call(object, param) && object[param] != null) {
      params.push(`${param}=${encodeURIComponent(object[param])}`);
    }
  }

  return params.join('&');
}
const requests = {
  get: (url, query = {}) => {
    const isEmptyQuery = query == null || Object.keys(query).length === 0;
    return agent(isEmptyQuery ? url : `${url}?${serialize(query)}`);
  },
  post: (url, body) => agent(url, body, "POST"),
  put: (url, body) => agent(url, body, 'PUT'),
}
const Home = {
  getGlobalTags: () => requests.get("/tags"),
  getGlobalArticles: ({ tag, limit, offset }) => {
    return requests.get("/articles", { tag, limit, offset })
  }
}
const Auth = {
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username, email, password) =>
    requests.post("/users", { user: { username, email, password } }),
  updateUser: ({ email, password, username, bio, image }) =>
    requests.put("/user", { user: { email, password, username, bio, image } })

}
const Article = {
  getArticle: (slug) => requests.get(`/articles/${slug}`),

}
const Editor = {
  createArticle: (article) => requests.post('/articles', article),
  updateArticle: (slug, article) => requests.post(`/articles/${slug}`, article),
}
export default {
  Home,
  Auth,
  Article,
  Editor,
  setToken: (_token) => { token = _token }
}
