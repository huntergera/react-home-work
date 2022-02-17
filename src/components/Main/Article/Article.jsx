import React from "react";
import styles from "./Article.module.css"

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            inputTitle: ""
        }
    }

    componentDidMount() {
        this.setState({
            inputTitle: this.props.currentItem.title
        });
    }

    onDeleteArticle = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.currentItem.id}`, {
            method: 'DELETE',
        })
        this.props.onArticleDeleted(this.props.currentItem);
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
                this.props.onArticleUpdated(response)

            })
            .catch(error => this.setState({
                ...this.state,
                error: error
            }))
    }

    render() {
        const {inputTitle, error} = this.state;
        const {title, body} = this.props.currentItem;

        if (error) return <p className='errorText'>Error</p>;

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
