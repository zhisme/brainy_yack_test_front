import React, { Component } from 'react';
import Table from './Table/Table';
import Search from './Search';
import Group from './Group';
import { NavLink } from "react-router-dom"

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupBy: null,
      sortByField: null,
      search: "",
    }
  }

  softReset() {
    this.setState({groupBy: null, sortByField: null, search: ""});
  }

  reset() {
    const { store } = this.props;

    this.softReset();

    store.loadArticles();
  }

  updateSearch(value) {
    const { store } = this.props;

    this.softReset();
    this.setState({search: value});

    if(!value) return;

    store.loadFoundArticles(value);
  }

  groupArticlesBy(field) {
    const { store } = this.props;

    this.softReset();
    this.setState({groupBy: field});

    store.loadArticlesGroupBy(field);
  }

  groupArticlesByStory(field) {
    const { store } = this.props;

    this.softReset();
    this.setState({groupBy: field});

    store.loadArticlesGroupByStory(field);
  }

  groupArticlesByLastCreated() {
    const { store } = this.props;

    this.softReset();
    this.setState({groupBy: "last_created_sort"})

    store.groupArticlesByLastCreated();
  }

  setSortField(field) {
    this.softReset();

    this.setState({sortByField: field});
  }

  render() {
    const { groupBy, search, sortByField } = this.state;
    const { store } = this.props;

    return (
      <div className="parent">
        <div className="row">
          <div className="col-md-4">
            <Group
              groupBy={groupBy}
              groupArticlesBy={field => this.groupArticlesBy(field)}
              groupArticlesByStory={field => this.groupArticlesByStory(field)}
              groupArticlesByLastCreated={() => this.groupArticlesByLastCreated()}
            />
          </div>

          <div className="col-md-4 text-md-center">
            <Search
              search={search}
              handleChange={evt => this.updateSearch(evt)}
              handleClick={() => this.reset()}
            />
          </div>

          <div className="col-md-4">
            <div className="float-right">
              <NavLink className="btn btn-secondary" to="/articles/new">
                New +
              </NavLink>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-12">
            <Table sortByField={sortByField} store={store} setSortField={field => this.setSortField(field)}/>
          </div>
        </div>
      </div>
    );
  }
}
