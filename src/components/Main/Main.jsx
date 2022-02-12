import React from "react";
import styles from "./Main.module.css"
import Article from "./Article/Article";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    getArticles = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(result => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                }
            )
            .catch(error => {
                this.setState({
                   error: error
                });
            });
    }

    onArticleUpdated = article => {
        console.log(article)
        this.setState({
            ...this.state,
            items: this.state.items.map(item => article.id === item.id ? article : item)
        })
    }

    onArticleDeleted = article => {
        console.log(article)
        this.setState({
            ...this.state,
            items: this.state.items.filter(item => article.id !== item.id )
        })
    }

    componentDidMount() {
        this.getArticles()
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) return (
            <main className={styles.main}>
                <div className="container">
                    <p className='errorText'>Error</p>
                </div>
            </main>
        )
        if (!isLoaded) return(
            <main className={styles.main}>
                <div className="container">
                    <p className='loadingText'>Loading...</p>
                </div>
            </main>
        )

        return (
            <main className={styles.main}>
                <div className="container">
                    {items.map(item => (
                        <Article
                            currentItem={item}
                            key={item.id}
                            onArticleUpdated={this.onArticleUpdated}
                            onArticleDeleted={this.onArticleDeleted}/>
                    ))}
                </div>
            </main>
        )
    }
}

export default Main;
