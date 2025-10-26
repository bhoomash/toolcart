import MobileStepper from '@mui/material/MobileStepper';
import { Box, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export const ProductBanner = ({images}) => {

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    // Auto-play functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prevActiveStep) => 
                prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1
            );
        }, 3000); // 3 seconds

        return () => clearInterval(timer);
    }, [maxSteps]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => 
            prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1
        );
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => 
            prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
        );
    };

  return (
    <>
    <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
    }}>
        <IconButton 
            onClick={handleBack}
            sx={{ position: 'absolute', left: 8, zIndex: 1, bgcolor: 'rgba(255,255,255,0.7)' }}
        >
            <KeyboardArrowLeft />
        </IconButton>
        
        <Box sx={{ 
            display: 'flex',
            width: '100%',
            height: '100%',
            transform: `translateX(-${activeStep * 100}%)`,
            transition: 'transform 0.3s ease-in-out'
        }}>
            {images.map((image, index) => (
                <Box 
                    key={index} 
                    sx={{ 
                        minWidth: '100%', 
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box 
                        component="img" 
                        sx={{ width: '100%', objectFit: "contain" }} 
                        src={image} 
                        alt={`Banner Image ${index + 1}`} 
                    />
                </Box>
            ))}
        </Box>
        
        <IconButton 
            onClick={handleNext}
            sx={{ position: 'absolute', right: 8, zIndex: 1, bgcolor: 'rgba(255,255,255,0.7)' }}
        >
            <KeyboardArrowRight />
        </IconButton>
    </Box>
    <div style={{alignSelf:'center'}}>
        <MobileStepper 
            steps={maxSteps} 
            position="static" 
            activeStep={activeStep}
            nextButton={<div />}
            backButton={<div />}
        />
    </div>
    </>
  )
}
