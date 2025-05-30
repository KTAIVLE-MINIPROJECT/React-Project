import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import CategorySelector from "./CategorySelector"
import axios from "axios"
import { domain } from "../const/http"

const BookDetail = ({ selectedBook, updateBook, categories }) => {
    const [currentBook, setCurrentBook] = useState(selectedBook)
    const [apiKey, setApiKey] = useState("")

    const changeBook = (key) => (e) => {
        setCurrentBook((state) => ({
            ...state,
            [key]: e.target.value,
        }))
    }

    const handleUpdateBook = async () => {
        const res = await axios(domain + '/api/v1/book', { method: 'PUT', data: currentBook })
        console.info('update:', res.data)
        updateBook()
    }

    const handleDeleteBook = async () => {
        const res = await axios(domain + '/api/v1/book', { method: 'DELETE', data: currentBook })
        console.info('delete:', res.data)
        updateBook()
    }

    const changeApiKey = (e) => {
        setApiKey(e.target.value)
    }

    useEffect(() => {
        setCurrentBook(selectedBook)
    }, [selectedBook])

    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {currentBook?.cover_url ? 
                        <img src={currentBook?.cover_url} width='100px' height='150px' /> :
                        <span style={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '400px', 
                            height: '500px', 
                            backgroundColor: 'gray', 
                            color: 'white', 
                        }}>표지가 없습니다.</span>                
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ minWidth: '100px', fontWeight: 'bold' }}>책 제목</span>
                        <TextField
                            id="title"
                            hiddenLabel
                            value={currentBook?.title}
                            placeholder="데이터가 존재하지 않습니다."
                            disabled={!currentBook}
                            onChange={changeBook('title')}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ minWidth: '100px', fontWeight: 'bold' }}>저자</span>
                        <TextField
                            id="author"
                            hiddenLabel
                            value={currentBook?.author}
                            placeholder="데이터가 존재하지 않습니다."
                            disabled={!currentBook}
                            onChange={changeBook('author')}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ minWidth: '100px', fontWeight: 'bold' }}>출판사</span>
                        <TextField
                            id="publisher"
                            hiddenLabel
                            value={currentBook?.publisher}
                            placeholder="데이터가 존재하지 않습니다."
                            disabled={!currentBook}
                            onChange={changeBook('publisher')}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ minWidth: '100px', fontWeight: 'bold' }}>등록일</span>
                        <CategorySelector
                            hiddenLabel
                            isNotNull
                            categories={categories} 
                            selectedCategory={categories.find(({ id }) => id == currentBook?.category_id)}
                            selectCategory={changeBook('category_id')}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ minWidth: '100px', fontWeight: 'bold' }}>등록일</span>
                        <TextField
                            id="createdAt"
                            hiddenLabel
                            value={currentBook?.created_at}
                            disabled
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ minWidth: '100px', fontWeight: 'bold' }}>최종 수정일</span>
                        <TextField
                            id="updatedAt"
                            hiddenLabel
                            value={currentBook?.updated_at}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                    <span style={{ fontWeight: 'bold' }}>소개글</span>
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
                    <TextField
                        id="api_key"
                        label="api_key"
                        value={apiKey}
                        onChange={changeApiKey}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="contained" onClick={() => console.log('표지 생성')} color="secondary">표지 생성</Button>
                    <Button variant="contained" onClick={handleUpdateBook} color="success">수정</Button>
                    <Button variant="contained" onClick={handleDeleteBook} color="error">삭제</Button>
                </div>
            </div>
        </section>
    )
}

export default BookDetail
