type Title = {
    title: string;
}

export function ContentHeaderTitle(props: Title) {
    return (
        <header>
            <span className="category">Categoria:<span> {props.title}</span></span>
        </header>
    );
}