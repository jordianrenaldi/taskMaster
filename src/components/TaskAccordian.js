import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TaskAccordion({ maintask, subTasks }) {
  // State to track checked status of checkboxes
  const [checkedTasks, setCheckedTasks] = useState([]);

  useEffect(() => {
    // Initialize the checkedTasks array based on subTasks.steps length
    setCheckedTasks(new Array(subTasks.steps.length).fill(false));
  }, [subTasks]);

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    const newCheckedTasks = [...checkedTasks];
    newCheckedTasks[index] = !newCheckedTasks[index];
    setCheckedTasks(newCheckedTasks);
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
      </AccordionDetails>
    </Accordion>
  );
}
