import {Select, SelectChangeEvent, FormControl, InputLabel, OutlinedInput, Box, Chip, MenuItem } from '@mui/material'
import React from 'react'

type Props = {
    propTags:string[],
    onTagsChange: (e:SelectChangeEvent<string []>)=>void
}

export default function TagSelect({propTags,onTagsChange}: Props) {
    const tags = sampleTags
  return (
    <FormControl>
        <InputLabel id="demo-select-tag-label">Tag</InputLabel>
        <Select
            id='demo-select-tag'
            labelId='demo-select-tag-label'
            multiple
            fullWidth
            value={propTags}
            onChange={onTagsChange}
            input={<OutlinedInput fullWidth id="demo-select-tag-chip" label="Tag"/>}
            renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                <Chip key={value} label={value} />
                ))}
            </Box>
            )}
        >
            {tags.map((name) => (
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


const sampleTags = [
    'Social Media',
  'Customer View',
  'Market Analysis',
  'Real World Data (RWD)',
  'Time Series',
  'Transaction Logs',
  'User Behavior',
  'Geo-tagged',
  'Anonymized',
  'Survey Data',
  'Sensor Readings',
  'Financial Forecasting',
  'API-sourced',
  'Third-party Aggregated',
  'Multilingual',
  'Labeled',
  'Unstructured',
  'Cleaned',
  'Synthetic Data',
  'Clickstream',
  'Open Data',
  'Proprietary',
  'Real-time',
  'Batch Updates'

]