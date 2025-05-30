import { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import { domain } from '../../const/http'
import CategorySelector from '../../components/CategorySelector'
import BookSearch from '../../components/BookSearch'

const Book = () => {
    const [data, setData] = useState({ categories: [], books: [] })
    const [selectedCategory, setSelectedCategory] = useState({ id: -1, name: '-- 미선택 --' })
    const [searchText, setSearchText] = useState('')

    const filterdBooks = data.books.filter(
        ({ author, publisher, content }) => author.includes(searchText) || publisher.includes(searchText) || content.includes(searchText)
    )
    
    const getData = async () => {
        const responseBook = await axios(domain + '/api/v1/book')
        const responseCategory = await axios(domain + '/api/v1/category')

        setData({ books: responseBook.data, categories: responseCategory.data })
    }

    const handleSelectCategory = (_, { props }) => {
        const { children, value } = props
        setSelectedCategory({ id: value, name: children })
    }

    const handleSearchBooks = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className='book'>
        <section>
            <div className='category-selector'>
                <span>1. 카테고리를 선택해주세요.*</span>
                <CategorySelector categories={data.categories} selectedCategory={selectedCategory} selectCategory={handleSelectCategory}/>
            </div>
            <div className='category-selector'>
                <span>2. 검색 내용을 입력해주세요. (책 제목, 작가이름 포함)*</span>
                <BookSearch searchBooks={handleSearchBooks} />
            </div>
            <div>
                {filterdBooks.map((v) => <button>{v.title}</button>)}
            </div>
        </section>
    </div>
}

export default Book
