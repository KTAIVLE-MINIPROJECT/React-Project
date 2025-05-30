import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"

const BookDetail = ({ selectedBook, updateBook, deleteBook }) => {
    const [currentBook, setCurrentBook] = useState(selectedBook)

    const changeBook = (key) => (e) => {
        setCurrentBook((state) => ({
            ...state,
            [key]: e.target.value,
        }))
    }

    const handleUpdateBook = () => {
        console.log(currentBook)
        updateBook()
    }

    useEffect(() => {
        setCurrentBook(selectedBook)
    }, [selectedBook])

    return (
        <section>
            <div>
                {currentBook?.cover_url ? 
                    <img src={currentBook?.cover_url} width='100%' height='100%' /> :
                    <span style={{ width: '100%', height: '100%', backgroundColor: 'gray', color: 'white' }}>표지가 없습니다.</span>                
                }
            </div>
            <div>
                <div>
                    <span>책 제목</span>
                    <TextField
                        id="title"
                        hiddenLabel
                        value={currentBook?.title}
                        placeholder="데이터가 존재하지 않습니다."
                        disabled={!currentBook}
                        onChange={changeBook('title')}
                    />
                </div>
                <div>
                    <span>저자</span>
                    <TextField
                        id="author"
                        hiddenLabel
                        value={currentBook?.author}
                        placeholder="데이터가 존재하지 않습니다."
                        disabled={!currentBook}
                        onChange={changeBook('author')}
                    />
                </div>
                <div>
                    <span>출판사</span>
                    <TextField
                        id="publisher"
                        hiddenLabel
                        value={currentBook?.publisher}
                        placeholder="데이터가 존재하지 않습니다."
                        disabled={!currentBook}
                        onChange={changeBook('publisher')}
                    />
                </div>
                    {/* <TextField category
                        id="title"
                        label="Search"
                        defaultValue={selectedBook.title}
                        placeholder="데이터가 존재하지 않습니다."
                        disabled={!currentBook}
                        onChange={changeBook('title')}
                    /> */}
                <div>
                    <span>등록일</span>
                    <TextField
                        id="createdAt"
                        hiddenLabel
                        value={currentBook?.created_at}
                        disabled
                    />
                </div>
                <div>
                    <span>최종 수정일</span>
                    <TextField
                        id="updatedAt"
                        hiddenLabel
                        value={currentBook?.updated_at}
                        disabled
                    />
                </div>
                
            </div>
            <div>
                <span>소개글</span>
                <TextField
                    id="content"
                    hiddenLabel
                    multiline
                    rows={4}
                    value={currentBook?.content}
                    placeholder="데이터가 존재하지 않습니다."
                    disabled={!currentBook}
                    onChange={changeBook('content')}
                />
            </div>
            <div>
                <Button variant="contained" onClick={handleUpdateBook}>수정</Button>
                <Button variant="contained" onClick={deleteBook}>삭제</Button>
            </div>
        </section>
    )
}

export default BookDetail
