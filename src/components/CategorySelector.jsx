import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const CategorySelector = ({ selectedCategory, categories, selectCategory }) => {
    const { id: selectedId } = selectedCategory

    return (
        <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedId}
                label="Category"
                onChange={selectCategory}
            >
                <MenuItem style={{ color: 'gray' }} value={-1}>-- 미선택 --</MenuItem>
                {categories.map(({ id, name }) => 
                    <MenuItem value={id}>{name}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default CategorySelector
