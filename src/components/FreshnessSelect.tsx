import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

type Props = {
    propFreshness:string,
    onFreshnessChange: (e:SelectChangeEvent<string>)=>void
}

export default function FreshnessSelect({propFreshness,onFreshnessChange}: Props) {
  return (
    <FormControl>
        <InputLabel id="demo-select-freshness-label">Freshness</InputLabel>
        <Select
            id='demo-select-freshness'
            labelId='demo-select-freshness-label'
            value={propFreshness}
            onChange={onFreshnessChange}
            input={<OutlinedInput fullWidth id="demo-select-freshness-chip" label="freshness"/>}
            
        >
            {freshness.map((name) => (
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

const freshness = [
    'Weekly update',
    'Real-time',
    'Daily update',
    'Monthly update',
    'Half-year update',
    'Yearly update or longer',
    'Aperiodical update',
    'No update'
]