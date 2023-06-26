import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
  Checkbox,
  Grid,
} from "@mui/material";

import axios from "axios";

const Form = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <h2 className="form-header">Dodaj swoją promocję!</h2>
      <form className="form">
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <TextField id="name" name="name" label="Nazwa promocji" />
          </Grid>
          <Grid xs={12} item>
            <TextField id="place" name="place" label="Miejsce" />
          </Grid>
          <Grid xs={12} item>
            <TextField id="price" name="price" label="Cena" />
          </Grid>
          <Grid>
            <Checkbox label="beer"></Checkbox>Piwo
          </Grid>
          <Grid>
            <Checkbox label="aperol"></Checkbox>Aperol
          </Grid>
          <Grid>
            <Checkbox label="gin"></Checkbox>Gin
          </Grid>
          <Grid>
            <Checkbox label="vodka"></Checkbox>Wódka
          </Grid>
          <Grid>
            <Checkbox label="Sunday"></Checkbox>Niedziela
          </Grid>
          <Grid>
            <Checkbox label="Sunday"></Checkbox>Niedziela
          </Grid>
          <Grid>
            <Checkbox label="Monday"></Checkbox>Poniedziałek
          </Grid>
          <Grid>
            <Checkbox label="Teusday"></Checkbox>Wtorek
          </Grid>
          <Grid>
            <Checkbox label="Wendsday"></Checkbox>Środa
          </Grid>
          <Grid>
            <Checkbox label="Thursday"></Checkbox>Czwartek
          </Grid>
          <Grid>
            <Checkbox label="Friday"></Checkbox>Piątek
          </Grid>
          <Grid>
            <Checkbox label="Saturday"></Checkbox>Sobota
          </Grid>
          <Grid>
            <Checkbox label="Sunday"></Checkbox>Niedziela
          </Grid>

          <Grid xs={12} item>
            <Checkbox
              label="Cały dzień"
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
            Cały dzień
          </Grid>
          <Grid xs={6} item className="time-field-left">
            <TextField
              id="startHours"
              name="startHours"
              type="time"
              disabled={isChecked}
            />
          </Grid>
          <Grid xs={6} item className="time-field">
            <TextField
              id="endHours"
              name="endHours"
              type="time"
              disabled={isChecked}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="description"
              name="description"
              label="Opis promocji"
              multiline
              rows={3}
            />
          </Grid>
          <Grid xs={12} item>
            <Button variant="contained">Wyślij</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
