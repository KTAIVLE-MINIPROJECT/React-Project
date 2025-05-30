import { TextField } from "@mui/material"

const BookSearch = ({ searchBooks }) => {
    return <TextField
          id="search"
          label="Search"
          defaultValue=""
          placeholder="검색어를 입력해주세요."
          onChange={searchBooks}
        />
}

export default BookSearch
