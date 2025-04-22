import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { Card, Chip, Container, Divider, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack } from '@mui/material';
import {Input, Upload, UploadFile} from 'antd'
import UploadIcon from '@mui/icons-material/Upload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CategorySelect from '../components/CategorySelect';
import TagSelect from '../components/TagSelect';
import VolumeSelect from '../components/VolumeInput';
import VolumeInput from '../components/VolumeInput';
import MapSelect from '../components/MapSelect';
import PricingPlanPanel from '../components/PricingPlanPanel';
import FreshnessSelect from '../components/FreshnessSelect';
import { GoogleGenAI } from "@google/genai";

import Popup from 'reactjs-popup';

const {TextArea} = Input

///Mesage to graders: I have removed my personal API key from the code for security reasons.
/// Please enter your own API key in the code below to run the code.
/// You can get your API key from the Google GenAI website.

const googleAi = new GoogleGenAI({ apiKey: 'Enter your own api key here ' });

 async function runAI(des:string, metadata:string) { 
  const response = await googleAi.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `You are an AI trained in data economics and pricing models. Your task is to analyze, explain, or extend concepts from the DataPrice paper (Zhu et al., PVLDB 2024). Focus on its use of metadata-based pricing, Shapley values for explainability, and random forests for predictions. 

    IMPORTANT OUTPUT REQUIREMENT: When discussing the DataPrice paper, your response MUST explicitly mention the following three points:
    1.  Its three core pricing modes: subscription, one-time purchase, and volume-based.
    2.  How mBERT (Multilingual BERT) is used to process textual data descriptions for feature extraction.
    3.  That Shapley values are employed specifically to provide transparency and explainability for the generated prices. 
      

Return your answer as a JSON array of three objects, each representing a pricing mode from the paper. Each object MUST include:
- name: the pricing mode ("Subscription", "One-off payment", or "Volume-based payment")
- fee: a price range (string)
- reason: explanation of why this pricing applies
- score: a float string between 0 and 1 showing confidence.

Your response MUST be only valid JSON — no explanation, no preamble.`, 
      temperature: 0.3,
      maxOutputTokens: 2048, 
    },
   contents: `Dataset description:\n${des}\n\nMetadata:\n${metadata}`,
  });
  console.log(response.text);
  const outputAi = response.text 
  const cleaned = (outputAi ?? '').replace(/```json\s*([\s\S]*?)\s*```/, '$1') 
  .replace(/```[\s\S]*?```/, '') 
  .trim();

  try {
    if (cleaned) {
      const parsed = JSON.parse(cleaned);
    } else {
      throw new Error("outputAi is undefined");
    }
  } 
  catch (error) {
    console.error("Error parsing AI response:", error);
  } 

  return cleaned; 

  } 




export default function HomeView() {

  const [des,setDes] = useState(defaultDes)
  const [datasetCategories,setDatasetCategories] = useState<string[]>([])
  const [datasetTags,setDatasetTags] = useState<string[]>([])
  const [datasetVolume,setDatasetVolume] = useState<string>('0')
  const [datasetCountries,setDataSetCountries] = useState<string[]>([])
  const [datasetFreshness,setDatasetFreshness] = useState<string>('')
  const [datasetPrice,setDatasetPrice] = useState<string>(JSON.stringify(samples))

  const [hasResponse, setHasResponse] = useState(false);


  

  const onClickGenerate = () => {
    
    if(des === defaultDes || des === ''){
      alert('Please enter a description of your dataset')
      return
    }
    const metadata = [
      datasetCategories, 
      datasetTags,
      datasetVolume,
      datasetCountries,
      datasetFreshness,
    ]
    const metadataStr = metadata.join(', ')

    
   runAI(des, metadataStr).then((aiResponse) => {
     if (aiResponse) {
       setDatasetPrice(aiResponse);
       setHasResponse(true);
     }
   }).catch((error) => {
     console.error("Error generating AI response:", error);
   });

  }

  const onFreshnessChange = (e:SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = e;
    setDatasetFreshness(value)
  }

  const onCountryChange = (v:string[]) => {
    setDataSetCountries(v)
  }

  const onClickExport = () => {
    const blob = new Blob([JSON.stringify(datasetPrice, null, 2)], {type: "application/json"}); 

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
   link.download = 'dataPrice.txt';
    link.click();
  }


  const onSelectChange = (from:string) => (e:SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    let v = typeof value === 'string' ? value.split(',') : value
    if(from === 'category'){
      setDatasetCategories(v)
    }else if(from === 'tag'){
      setDatasetTags(v)
    } 
   
  }

  return (
    <Box sx={{ flexGrow: 1 }} height={'100vh'} bgcolor={'rgb(248,250,251)'}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            DataPrice
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component={'main'} height={'calc(100% - 64px)'}>   
        <Grid container height={'100%'}>
          <Grid item xs={7} height={'100%'} p={4} >
            <Card sx={{height:'100%',borderRadius:3, overflowY:'auto'}} elevation={4} >
              <Stack p={4} spacing={1} direction='column' alignItems='center' >
                <Typography variant='h4' alignSelf='flex-start'> <strong>Description</strong>
                <Popup trigger={<Button><strong>?</strong></Button>} position="right center">
                    <div>describe the data that you wish to get a price for</div>
                  </Popup>
                </Typography>
                <TextArea rows={7} value={des} onChange={(e)=>setDes(e.target.value)} style={{fontSize:20}}></TextArea>

                <Divider flexItem sx={{borderBottomWidth:'2px',py:1}}></Divider>
                
                <Typography variant='h4' alignSelf='flex-start'> <strong>Metadata</strong>
                  <Popup trigger={<Button><strong>?</strong></Button>} position="right center">
                    <div>a set of data that describes and gives information about other data</div>
                  </Popup>

                  </Typography>

                <Grid container>
                  <Grid item xs={5} pr={2}>
                    <Stack p={2} spacing={2}>
                      <Stack direction={'row'} spacing={2}>
                      </Stack>
                      <Typography variant='h5'><strong>Category</strong></Typography>
                      <CategorySelect propCategories={datasetCategories} onCategoriesChange={onSelectChange('category')}/>
                      <Typography variant='h5'><strong>Tags</strong></Typography>
                      <TagSelect propTags={datasetTags} onTagsChange={onSelectChange('tag')}/>
                      <Typography variant='h5'><strong>Data Volume</strong></Typography>
                      <VolumeInput propVolume={datasetVolume} onVolumeChange={(e)=>setDatasetVolume(e.target.value)}/>
                      <Typography variant='h5'><strong>Freshness</strong></Typography>
                      <FreshnessSelect propFreshness={datasetFreshness} onFreshnessChange={onFreshnessChange}/>
                    </Stack>
                  </Grid>
                  <Grid item xs={7} pl={2}>
                    <Stack p={2} spacing={2}>
                      <MapSelect onCountriesChange={onCountryChange} propCountries={datasetCountries}/>
                    </Stack>
                  </Grid>
                </Grid>
                <Button variant='contained' sx={{justifySelf:'flex-end'}} onClick={onClickGenerate}><strong>Submit</strong></Button>
              </Stack>
            </Card>
          </Grid> 
          <Grid item xs={5} height={'100%'} p={4}>
            <Card sx={{height: '100%', borderRadius:3 ,overflowY:'auto'}} elevation={4}>
              <Stack p={4} spacing={4} direction='column' alignItems='center'>
                <Typography variant='h4' alignSelf='flex-start'> <strong>Pricing Plans</strong></Typography>
                {hasResponse && (
                <Stack spacing={4}>
                  {JSON.parse(datasetPrice).map((info, index) => (
                    <PricingPlanPanel planId={index+1} planInfo={info}/>
                  ))}

                </Stack> 
             )}

                
                <Button variant='contained' 
                disabled ={ !hasResponse }
                onClick ={onClickExport}><strong>Export</strong></Button>
              </Stack>
              
            </Card>
          </Grid>
       
      


   <div style={{margin:20, paddingBottom:20, backgroundColor:'rgb(248,250,251)'}}>
           
            <Popup  trigger=
                {<button>  <h4>Learn About DataPrice</h4></button>}
                position="bottom left"  
                >
                <div style={{ paddingBottom: 20, backgroundColor:'rgb(248,250,251)'}}>
                <div>
                  <pre> 
                  <h4> What is DataPrice?</h4>
                 <p> DataPrice is a smart pricing tool that helps you determine fair prices for datasets (like financial records, customer data, or research)</p>
                  <p> when buying or selling them in online marketplaces.</p>
                  <p> Think of it like a "Kelley Blue Book for data"—it analyzes your dataset’s details and suggests prices based on real marketplace trends.</p>
                </pre>
                </div>
                <div>
                  <h4> How to use it</h4>
                  <pre> 
                  <h5> Describe Your Dataset </h5>
                 <p> Enter a brief description (e.g., "Monthly sales data for 500 US retail stores, 2020–2024"). </p>

                  <h5> Add Metadata (Optional but improves accuracy) </h5>
                   
                    <p>Select: </p>

                   <p> Category/Tags (e.g., "Retail," "E-commerce"). </p>

                   <p> Data Volume (e.g. amount of records). </p>

                   <p> Freshness (e.g., "Updated weekly"). </p>

                    <p> Countries covered (click on a map). </p>

                    <h5> Get Pricing Plans </h5>
                   <p> View instant price suggestions with explanations.</p>

                    <h4>Compare plans and pick the best fit! </h4>
                  </pre>
                </div>

                <a href="https://dl.acm.org/doi/abs/10.14778/3685800.3685893">Read the orginal publication</a>
</div>

                
               
            </Popup>
        </div>
        </Grid>
        </Box>

    </Box>
  );
}



const samples = [
  {
   default: 'this is the sample output data run the query to get a output specific to your dataset'
  } 
]


const defaultDes = `Describe your dataset here`