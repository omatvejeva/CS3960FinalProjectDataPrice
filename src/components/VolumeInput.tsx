import { FormControl, InputAdornment, InputLabel, OutlinedInput, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent } from 'react'

type Props = {
  propVolume:string,
  onVolumeChange:(e:ChangeEvent<HTMLInputElement>)=>void
}

export default function VolumeInput({propVolume,onVolumeChange}: Props) {
  return (
    <FormControl>
        <InputLabel htmlFor='demo-input-volume'>Volume</InputLabel>
        <OutlinedInput
            id='demo-input-volume'
            type='number'
            value={propVolume}
            onChange={onVolumeChange}
            endAdornment={<InputAdornment position="end">Records</InputAdornment>}
            label='Volume'
        >

        </OutlinedInput>
    </FormControl>
  )
}