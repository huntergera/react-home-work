import React from "react";
import styles from "./Article.module.css"
import Spinner from "../../shared/Spinner/Spinner";

class Article extends React.Component {
    constructor(props) {
        super(props);
        const {currentItem} = props;
        this.state = {
            error: null,
            isLoaded: true,
            inputTitle: currentItem.title
        }
    }

    onDeleteArticle = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.currentItem.id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(response => this.props.onArticleDeleted(response))
            .catch(error => this.setState({
                ...this.state,
                error: error
            }))
    }

    onTitleChange = event => {
        this.setState({
            inputTitle: event.target.value
        });
    }

    onUpdateArticles = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.currentItem.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: this.state.inputTitle,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(response => {
                this.setState({
                    isLoaded: false,
                });
                this.props.onArticleUpdated(response)

            })
            .catch(error => this.setState({
                ...this.state,
                error: error
            }))
    }

    render() {
        const {inputTitle, error, isLoaded} = this.state;
        const {title, body} = this.props.currentItem;

        if (error) return <p className='errorText'>Error</p>;
        if (!isLoaded) return <Spinner height="80" width="50" color="#ffe07d"/>;

        return (
            <article className={styles.article}>
                <p>{title}</p>
                <div className="input-wrap">
                    <input className={styles.input} type="text" value={inputTitle} onChange={this.onTitleChange}/>
                    <button className="button" onClick={this.onUpdateArticles}>Send</button>
                </div>
                <p>{body}</p>
                <button className="button button--red" onClick={this.onDeleteArticle}>Delete</button>
            </article>
        )
    }
}

export default Article;
