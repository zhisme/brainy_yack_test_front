import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import config from './config';

const superagent = superagentPromise(_superagent, global.Promise);

const handleErrors = err => err;
const responseBody = res => res.body;
const { API_ROOT } = config;

const requests = {
  delete: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .end(handleErrors)
      .then(responseBody),
};

const Articles = {
  all: () =>
    requests.get(`/articles`),
  sortBy: (field, direction) =>
    requests.get(`/articles?sort_by=${field}&sort_direction=${direction}`),
  search: term =>
    requests.get(`/articles?term=${term}`),
  groupBy: field =>
    requests.get(`/articles?group_by=${field}`),
  groupByStory: field =>
    requests.get(`/articles?group_by_story=${field}`),
  get: id =>
    requests.get(`/articles/${id}`),
  delete: id =>
    requests.delete(`/articles/${id}`),
  update: article =>
    requests.put(`/articles/${article.id}`, { article: article }),
  create: article =>
    requests.post('/articles', { article })
};

export default {
  Articles,
};
