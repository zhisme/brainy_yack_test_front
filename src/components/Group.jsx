import React, { Component } from 'react';
import { FIELDS as ARTICLE_FIELDS, STORY_FIELDS } from '../constants/article';

export default class Group extends Component {
  render() {
    const { groupBy, groupArticlesByStory, groupArticlesBy, groupArticlesByLastCreated } = this.props;

    return(
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Group by {groupBy}
        </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {ARTICLE_FIELDS.map(field =>
            <button
              key={field}
              className="dropdown-item"
              onClick={() => groupArticlesBy(field)}
            >
              {field}
            </button>
          )}

          {STORY_FIELDS.map(field =>
            <button
              key={field}
              className="dropdown-item"
              onClick={() => groupArticlesByStory(field)}
            >
              {field}
            </button>
          )}

          <button
            className="dropdown-item"
            onClick={() => groupArticlesByLastCreated()}
          >
            last_created_sort
          </button>
        </div>
      </div>
    );
  }
}
