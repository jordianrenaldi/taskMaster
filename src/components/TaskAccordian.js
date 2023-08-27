import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


// for gif
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';

export default function TaskAccordion({ maintask, subTasks }) {
  // State to track checked status of checkboxes
  const [checkedTasks, setCheckedTasks] = useState([]);

  // State to track the number of checkboxes that are ticked
  const [countChecked, setCountChecked] = useState(0);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    // Initialize the checkedTasks array based on subTasks.steps length
    setCheckedTasks(new Array(subTasks.steps.length).fill(false));
  }, [subTasks]);

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    const newCheckedTasks = [...checkedTasks];
    newCheckedTasks[index] = !newCheckedTasks[index];
    setCheckedTasks(newCheckedTasks);

    // Update the count of checked checkboxes
    const newCount = newCheckedTasks.filter(Boolean).length;
    setCountChecked(newCount);
  };


    // Handle the "Complete" button click
  const handleCompleteClick = () => {
    const totalChecked = checkedTasks.filter(Boolean).length;

    if (totalChecked === subTasks.steps.length){
      setOpenSnackbar(true);
      setOpenModal(true);

      // Play the sound
      const audio = new Audio('/AudioApplause.wav');
      audio.play();

    } else {
      alert(`Congratulations! You've completed ${countChecked} out of ${subTasks.steps.length} tasks.`);
    }
    
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{maintask}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {subTasks?.steps?.map((t, index) => (
          <React.Fragment key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedTasks[index] || false}
                  onChange={() => handleCheckboxChange(index)}
                />
              }
              label={
                <Typography
                  style={{
                    textDecoration: checkedTasks[index]
                      ? "line-through"
                      : "none",
                  }}
                >
                  {t.stepTitle} - {t.duration}
                </Typography>
              }
            />
            <Typography variant="caption" display="block">
              {t.stepDescription}
            </Typography>
          </React.Fragment>
        ))}
        
        <button onClick={handleCompleteClick}>Complete</button>

        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={() => setOpenSnackbar(false)}
          message="Congratulations! You've completed all tasks."
        />

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div>
            <h2>Congratulations!</h2>
            <img src="https://i.gifer.com/1rRk.gif" alt="Congratulations Gif" />
          </div>
        </Modal>

      </AccordionDetails>
    </Accordion>
  );
}
