import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const CategorySelector = ({ selectedCategory, categories, selectCategory, hiddenLabel, isNotNull }) => {
    const { id: selectedId } = selectedCategory ?? { id: null }

    return (
        <FormControl disabled={!selectedCategory} fullWidth>
            {hiddenLabel ? null : <InputLabel id="category-select-label">Category</InputLabel>}
            <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedId}
                hiddenLabel
                label={hiddenLabel ? null : "Category"}
                onChange={selectCategory}
            >
                {isNotNull ? null : <MenuItem style={{ color: 'gray' }} value={-1}>-- 미선택 --</MenuItem>}
                {categories.map(({ id, name }) => 
                    <MenuItem value={id}>{name}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default CategorySelector
