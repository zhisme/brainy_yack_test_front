import React, { Component } from 'react';
import { FIELDS as ARTICLE_FIELDS } from '../../constants/article';
import HeaderCell from '../HeaderCell/HeaderCell';
import { observer } from "mobx-react"
import Octicon, { Pencil, Trashcan, Eye } from '@primer/octicons-react'
import { NavLink } from "react-router-dom"
import './Table.scss';

@observer
class Table extends Component {
  componentDidMount() {
    const { store } = this.props;

    store.loadArticles();
  }

  sortBy(field, direction) {
    const { store, setSortField } = this.props;

    store.loadSortedBy(field, direction);
    setSortField(field);
  }

  removeArticle(article) {
    const { store } = this.props;

    store.deleteArticle(article);
  }

  render() {
    const { sortByField } = this.props;
    const { isLoading, articles } = this.props.store;

    if (isLoading && articles.length === 0) {
      return (<div> Loading wait. </div>);
    }

    if (articles.length === 0) {
      return (
        <div className="article-preview">
          No articles are here... yet.
        </div>
      );
    }

    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {ARTICLE_FIELDS.map(field =>
              <HeaderCell
                key={field}
                active={field === sortByField}
                sortByField={sortByField}
                field={field}
                sortBy={(field, direction) => this.sortBy(field, direction)}
              />
            )}
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article =>
            <tr key={article.id}>
              { ARTICLE_FIELDS.map(field =>
                <td key={`${article.id}-${field}`}> {article[field]} </td>
              )}
              <td>
                <NavLink className="table__link" to={`/articles/${article.id}`}>
                  <Octicon icon={Eye}/>
                </NavLink>
                <NavLink className="table__link" to={`/articles/edit/${article.id}`}>
                  <Octicon icon={Pencil}/>
                </NavLink>
                <button className="table__link" onClick={() => this.removeArticle(article)}>
                  <Octicon icon={Trashcan}/>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}


export default Table;
