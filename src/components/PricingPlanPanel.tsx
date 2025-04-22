import { Button, Divider, Paper, Stack, Typography, IconButton, Collapse } from '@mui/material'
import React from 'react'
import Popup from 'reactjs-popup'
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type Props = {
    planId:number,
    planInfo:any
}
export default function PricingPlanPanel({ planId, planInfo }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper elevation={4} sx={{ width: '100%', backgroundColor: 'rgb(218,227,243)' }}>
      <Stack p={2} spacing={2}>
        {/* Clickable header */}
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          sx={{ cursor: 'pointer' }}
          onClick={toggleExpand}
        >
          <Typography variant='h6' color={'rgb(25,118,210)'}>
            <strong>{planId}. {planInfo.name}</strong>
          </Typography>
          <IconButton size="small" onClick={toggleExpand}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>
        
        <Divider sx={{ borderBottomWidth: '2px' }} />
        
        {/* Collapsible content */}
        <Collapse in={expanded}>
          <Stack px={4} spacing={2} py={1}>
            <Typography variant='h6'>
              <strong>Fee:</strong> {planInfo.fee}
            </Typography>
            <Typography variant='h6'>
              <strong>Reason:</strong> {planInfo.reason}
            </Typography>
            <Typography variant='h6'>
              <strong>Score:</strong> {planInfo.score}
            </Typography>
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
}