import React, { Component } from 'react';
import { observer } from "mobx-react"
import { NavLink, withRouter, Redirect } from "react-router-dom"

@observer
class Show extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    const { store }  = this.props;

    store.loadArticle(id);
  }

  render() {
    const { foundArticle } = this.props.store;
    const { markedForRedirect } = foundArticle;

    if(markedForRedirect) return(<Redirect to="/" />);

    return(
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <h5 className="card-header">Name: { foundArticle.name }</h5>
            <div className="card-body">
              <p className="card-text"> ID: { foundArticle.id} </p>
              <p className="card-text"> Text: { foundArticle.text } </p>
              <p className="card-text"> Kind: { foundArticle.kind} </p>
              <p className="card-text"> Story id: { foundArticle.story_id} </p>
              <p className="card-text"> Created At: { foundArticle.created_at} </p>
              <p className="card-text"> Updated At: { foundArticle.updated_at} </p>
              <ul className="nav">
                <li className="nav-item">
                  <NavLink className="nav-link btn-primary" to={`/articles/edit/${foundArticle.id}`}>
                    Edit
                  </NavLink>
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

export default withRouter(Show);
