import React, { Component } from 'react';
import { observer } from "mobx-react"
import { NavLink } from "react-router-dom"
import EditField from './EditField';
import SelectField from './SelectField';
import { withRouter } from "react-router-dom";

//TODO: errors

@observer
class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {
        kind: "blog"
      },
    }
  }

  setArticleValues(fieldName, value) {
    const { article } = this.state;

    article[fieldName] = value;

    return article;
  }

  createArticle() {
    const { store } = this.props;
    const { article } = this.state;

    store.createArticle(article).then(article => {
      this.props.history.push(`/articles/${article.id}`)
    }, () => {
      alert(`Validation failed`);
    });
  }

  render() {
    const { isLoading } = this.props.store;
    const { article } = this.state;

    if(isLoading) {
      return (
        <div>
          Loading please wait...
        </div>
      );
    }

    return(
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <EditField
                fieldName="name"
                value={article.name}
                handleChange={(fieldName, value) => this.setArticleValues(fieldName, value)}
              />
            </div>
            <div className="card-body">
              <EditField
                fieldName="text"
                value={article.text}
                handleChange={(fieldName, value) => this.setArticleValues(fieldName, value)}
              />
              <SelectField
                fieldName="kind"
                collection={["blog", "facebook", "twitter"]}
                value={article.kind}
                handleChange={(fieldName, value) => this.setArticleValues(fieldName, value)}
              />
              <ul className="nav">
                <li className="nav-item">
                  <button
                    type="submit"
                    className="nav-link btn-success"
                    onClick={() => this.createArticle()}
                  >
                    Create
                  </button>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">
                    To collection
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(New);
