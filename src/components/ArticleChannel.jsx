import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

export default class ArticleChannel extends Component {
  handleReceived(message) {
    const { store } = this.props;

    switch(message.action) {
      case "update":
        store.updateArticleInStore(message.data);
        break;
      case "create":
        store.addArticleToStore(message.data);
        break;
      case "destroy":
        store.removeArticleFromStore(message.data);
        break;
      default:
        console.error(`Not found action: ${message.action}`);
    }
  }

  render() {
    return(
        <ActionCableConsumer
          channel="ArticlesChannel"
          onReceived={(msg) => this.handleReceived(msg)}
        />
    );
  }
}
