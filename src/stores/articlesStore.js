import { observable, action, computed } from 'mobx';
import agent from '../agent';
class ArticlesStore {
  @observable articlesList = [];
  @observable isLoading = false;
  @observable article = {};

  @computed get articles() {
    return this.articlesList;
  };

  @computed get foundArticle() {
    return this.article;
  }

  clear() {
    this.articlesList.clear();
  }

  getArticle(id) {
    return this.articlesList.find(article => article.id === id);
  }

  isCurrentArticle(article) {
    return this.article.id === article.id;
  }

  removeArticleFromStore(article) {
    if(this.articlePresentInStore(article)) {
      const articleIdx = this.articlesList.indexOf(article);
      this.articlesList.splice(articleIdx, 1);
    }

    if(this.isCurrentArticle(article)) {
      this.article = {markedForRedirect: true};
    }
  }

  addArticleToStore(article) {
    if(!this.articlePresentInStore(article)) {
      this.articlesList.push(article);
    }

    return article;
  }

  updateArticleInStore(article) {
    this.removeArticleFromStore(article);
    this.addArticleToStore(article);

    if(this.isCurrentArticle(article)) {
      this.article = article;
    }
  }

  articlePresentInStore(article) {
    return this.articlesList.find(a => a.id === article.id);
  }

  @action loadArticle(id) {
    const article = this.getArticle(id);
    if(article) return Promise.resolve(article);

    this.isLoading = true;

    return agent.Articles.get(id)
      .then(action((article) => {
        this.article = article;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action loadArticles() {
    this.isLoading = true;

    return agent.Articles.all()
      .then(action((articles) => {
        this.clear();
        this.articlesList = articles;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action loadSortedBy(field, direction) {
    return agent.Articles.sortBy(field, direction)
      .then(action(articles => {
        this.clear();
        this.articlesList = articles;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action loadFoundArticles(term) {
    return agent.Articles.search(term)
      .then(action(articles => {
        this.clear();
        this.articlesList = articles;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action loadArticlesGroupBy(field) {
    return agent.Articles.groupBy(field)
      .then(action(articles => {
        this.clear();
        this.articlesList = Object.keys(articles).map(key => articles[key]).flat();
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action loadArticlesGroupByStory(field) {
    return agent.Articles.groupByStory(field)
      .then(action(articles => {
        this.clear();
        this.articlesList = Object.keys(articles).map(key => articles[key]).flat();
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action deleteArticle(article) {
    return agent.Articles.delete(article.id)
      .then(action(() => (this.removeArticleFromStore(article))))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action updateArticle() {
    return agent.Articles.update(this.article)
      .then(article => {
        this.article = article;
        return article;
      })
      .finally(action(() => { this.isLoading = false; }));
  }

  @action createArticle(article) {
    return agent.Articles.create(article)
      .then(action(article => (this.addArticleToStore(article))))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action groupArticlesByLastCreated() {
    return this.articlesList = this.articlesList.slice().sort((a,b) => (Date.parse(b["created_at"]) - Date.parse(a["created_at"])));
  }
}

export default new ArticlesStore();
