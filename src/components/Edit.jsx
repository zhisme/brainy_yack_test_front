import React, { Component } from 'react';
import { observer } from "mobx-react"
import { NavLink, withRouter } from "react-router-dom"
import EditField from './EditField';
import SelectField from './SelectField';

@observer
class Edit extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    const { store }  = this.props;

    store.loadArticle(id);
  }

  setArticleValues(fieldName, value) {
    const { foundArticle } = this.props.store;

    foundArticle[fieldName] = value;

    return foundArticle;
  }

  updateArticle() {
    const { store } = this.props;

    store.updateArticle().then(article => {
      this.props.history.push(`/articles/${article.id}`)
    }, () => {
      alert(`Validation failed`);
    });
  }

  render() {
    const { foundArticle, isLoading } = this.props.store;

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
                value={foundArticle.name}
                handleChange={(fieldName, value) => this.setArticleValues(fieldName, value)}
              />
            </div>
            <div className="card-body">
              <p className="card-text"> ID: { foundArticle.id} </p>
              <EditField
                fieldName="text"
                value={foundArticle.text}
                handleChange={(fieldName, value) => this.setArticleValues(fieldName, value)}
              />
              <SelectField
                fieldName="kind"
                collection={["blog", "facebook", "twitter"]}
                value={foundArticle.kind}
                handleChange={(fieldName, value) => this.setArticleValues(fieldName, value)}
              />
              <p className="card-text"> Story id: { foundArticle.story_id} </p>
              <p className="card-text"> Created At: { foundArticle.created_at} </p>
              <p className="card-text"> Updated At: { foundArticle.updated_at} </p>
              <ul className="nav">
                <li className="nav-item">
                  <button
                    type="submit"
                    className="nav-link btn-success"
                    onClick={() => this.updateArticle()}
                  >
                    Save
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

export default withRouter(Edit);
