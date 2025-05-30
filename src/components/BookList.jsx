import { Button } from "@mui/material"
import { ellipsis } from "../const/style"

const BookList = ({ books, selectBook }) => {
    const makeHandleSelectBook = (book) => () => {
        selectBook(book)
    }

    return (
    <ul style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        listStyle: 'none', 
        padding: 0, 
        margin: 0, 
        marginTop: '2rem', 
        maxHeight: '300px', 
        overflowY: 'auto' 
    }} className="book-list">
        {books.map((book, index) => (
            <li style={{ marginRight: '1rem' }} key={index}>
                <Button variant="contained" style={{ display: 'flex', gap: '2rem', width: '100%' }} onClick={makeHandleSelectBook(book)}>
                    <span style={{ ...ellipsis, width: 150 }} title={book.title}>{book.title}</span>
                    <span style={{ ...ellipsis, width: 100 }} title={book.author}>{book.author}</span>
                    <span style={{ ...ellipsis, flex: 1 }} title={book.content}>{book.content}</span>
                </Button>
            </li>
        ))}
    </ul>
    )
}

export default BookList
