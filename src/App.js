import "./App.scss";
import { Clock } from "./components/Clock";
import { TodoList } from "./components/TodoList";

function App() {
    return (
        <>
            <header className="header">
                <img className="logo" src="/assets/logo.svg" alt="" />
                <Clock/>
            </header>
            <div className="gradient-1"/>
            <div className="gradient-2"/>
            <TodoList/>
            <footer className="footer">
                <p>Site créé en React par <a href="https://colin-lienard.fr/">Colin Lienard</a></p>
            </footer>
        </>
    )
}

export default App;
