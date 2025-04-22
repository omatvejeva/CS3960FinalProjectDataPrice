import { FormControl, InputLabel, OutlinedInput, Box, Chip, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

type Props = {
    propCategories:string[],
    onCategoriesChange: (e:SelectChangeEvent<string []>)=>void
}

export default function CategorySelect({propCategories,onCategoriesChange}: Props) {
    const categories = sampleCategories
  return (
    <FormControl>
        <InputLabel id="demo-select-category-label">Category</InputLabel>
        <Select
            id='demo-select-category'
            labelId='demo-select-category-label'
            multiple
            value={propCategories}
            onChange={onCategoriesChange}
            input={<OutlinedInput fullWidth id="demo-select-category-chip" label="Category"/>}
            renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                <Chip key={value} label={value} />
                ))}
            </Box>
            )}
        >
            {categories.map((name) => (
            <MenuItem
                key={name}
                value={name}
            >
                {name}
            </MenuItem>
            ))}
        </Select>
    </FormControl>
  )
}

const sampleCategories = [
   'Demographic',
  'Financial',
  'Healthcare',
  'Retail',
  'E-commerce',
  'Transportation',
  'Education',
  'Energy',
  'Environment',
  'Weather',
  'Geospatial',
  'Government',
  'Social Media',
  'Telecommunications',
  'Agriculture',
  'IoT / Sensor',
  'Cybersecurity',
  'Sports',
  'Entertainment',
  'Marketing & Advertising',
  'Real Estate',
  'Science & Research',
  'Employment & HR',
  'Insurance',
  'Travel & Tourism',
  'Legal / Regulatory'
  ]