import { useFormik } from "formik";
import { useState } from "react";
import { Button, TextField, Checkbox, Alert, AlertTitle } from "@mui/material";

import axios from "axios";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E384FF",
      },
      "&:hover fieldset": {
        borderColor: "#E384FF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#E384FF",
      },
    },
  },
}));

const Form = () => {
  const [isAllDay, setIsAllDay] = useState(false);
  const [isAllWeek, setIsAllWeek] = useState(false);
  const [isSent, setIsSent] = useState(null);

  const classes = useStyles();

  const handleIsAllDay = (event) => {
    setIsAllDay(event.target.checked);
    formik.values.allDay = event.target.checked;
  };

  const handleIsAllWeek = (event) => {
    setIsAllWeek(event.target.checked);
    formik.values.allWeek = event.target.checked;
  };

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    const updatedCategory = [...formik.values.category];

    if (checked) {
      updatedCategory.push(name);
    } else {
      const index = updatedCategory.indexOf(name);
      if (index !== -1) {
        updatedCategory.splice(index, 1);
      }
    }

    formik.setFieldValue("category", updatedCategory);
  };
  const handleDayChange = (event) => {
    const { name, checked } = event.target;
    const updatedDay = [...formik.values.day];

    if (checked) {
      updatedDay.push(name);
    } else {
      const index = updatedDay.indexOf(name);
      if (index !== -1) {
        updatedDay.splice(index, 1);
      }
    }

    formik.setFieldValue("day", updatedDay);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Nazwa promocji jest wymagana";
    }

    if (!values.place) {
      errors.place = "Miejsce jest wymagane";
    }

    if (!values.price) {
      errors.price = "Cena jest wymagana";
    }

    if (!values.startHours && !isAllDay) {
      errors.startHours = "Godziny startu promocji są wymagane";
    }

    if (!values.endHours && !isAllDay) {
      errors.endHours = "Godziny końca promocji są wymagane";
    }

    if (values.category.length === 0) {
      errors.category = "Kategoria jest wymagana";
    }

    if (!values.link) {
      errors.link = "Link do promocji jest wymagany";
    }

    /*     if (!values.image) {
      errors.image = "Dowód promocji w postaci zdjęcia jest wymagany";
    } */
    if (values.website && !isValidURL(values.website)) {
      errors.website = "Strona internetowa lokalu jest nieprawidłowa";
    } else if (!values.website) {
      errors.website = "Strona internetowa lokalu jest wymagana";
    }

    if (values.googleMaps && !isValidURL(values.googleMaps)) {
      errors.googleMaps = "Link do map Google jest nieprawidłowy";
    } else if (!values.googleMaps) {
      errors.googleMaps = "Link do map Google jest wymagany";
    }

    if (values.category.length === 0) {
      errors.category = "Wybierz przynajmniej jedną kategorię";
    }
    if (values.day.length === 0 && !isAllWeek) {
      errors.day = "Wybierz przynajmniej jeden dzień";
    }

    return errors;
  };

  const isValidURL = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      place: "",
      price: "",
      allDay: isAllDay,
      allWeek: isAllWeek,
      startHours: "",
      endHours: "",
      description: "",
      category: [],
      day: [],
      link: "",
      googleMaps: "",
      website: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {

        const response = await axios.post(
          "http://localhost:8000/promotions",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        resetForm({ values: "" });
        setIsAllDay(false);
        setIsAllWeek(false);
        setIsSent(true);

        console.log(response);
      } catch (error) {
        console.error(error);
        setIsSent(false);
      }
    },
    validate: validateForm,
  });

  return (
    <div className="form-content">
      <h2 className="form-header">Dodaj swoją promocję!</h2>
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          id="name"
          name="name"
          label="Nazwa promocji"
          value={formik.values.name}
          onChange={formik.handleChange}
          className={classes.root}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="place"
          name="place"
          label="Miejsce"
          value={formik.values.place}
          onChange={formik.handleChange}
          className={classes.root}
          error={formik.touched.place && !!formik.errors.place}
          helperText={formik.touched.place && formik.errors.place}
        />
        <TextField
          id="price"
          name="price"
          label="Cena"
          value={formik.values.price}
          onChange={(e) => {
            const input = e.target.value;
            const regex = /^\d*$/; // Regular expression to match digits only

            if (regex.test(input)) {
              formik.handleChange(e);
            }
          }}
          InputProps={{
            endAdornment: (
              <p
                className={`${classes.root} price ${
                  formik.touched.price && formik.errors.price
                    ? "error-text"
                    : ""
                }`}
              >
                zł
              </p>
            ),
          }}
          className={`${classes.root} price`}
          error={formik.touched.price && !!formik.errors.price}
          helperText={formik.touched.price && formik.errors.price}
        />
        <h3>Kategoria:</h3>
        <div
          className={`category ${
            formik.touched.category && !!formik.errors.category
              ? "errorCheckbox"
              : ""
          }`}
        >
          {[
            { name: "beer", label: "beer", text: "Piwo" },
            { name: "aperol", label: "aperol", text: "Aperol" },
            { name: "whisky", label: "whisky", text: "Whisky" },
            { name: "gin", label: "gin", text: "Gin" },
            { name: "vodka", label: "vodka", text: "Wódka" },
            { name: "prosecco", label: "prosecco", text: "Prosecco" },
            { name: "martini", label: "martini", text: "Martini" },
            { name: "wine", label: "wine", text: "Wino" },
            { name: "rum", label: "rum", text: "Rum" },
            { name: "tequila", label: "tequila", text: "Tequila" },
            { name: "other", label: "other", text: "Inne" },
          ].map(({ name, label, text }) => (
            <div className="checkbox-div" key={name}>
              <Checkbox
                name={name}
                label={label}
                onChange={handleCategoryChange}
                checked={formik.values.category.includes(label)}
              />
              <span>{text}</span>
            </div>
          ))}
        </div>
        {formik.touched.category && !!formik.errors.category && (
          <div className="error error-text">{formik.errors.category}</div>
        )}
        <h3>Dzień promocji:</h3>
        <div className="promotion-day">
          <Checkbox
            id="isAllWeek"
            name="isAllWeek"
            label="Cały tydzień"
            checked={isAllWeek}
            onChange={handleIsAllWeek}
          />
          <span>Cały tydzień</span>
          {[
            { name: "Monday", label: "Poniedziałek" },
            { name: "Tuesday", label: "Wtorek" },
            { name: "Wednesday", label: "Środa" },
            { name: "Thursday", label: "Czwartek" },
            { name: "Friday", label: "Piątek" },
            { name: "Saturday", label: "Sobota" },
            { name: "Sunday", label: "Niedziela" },
          ].map(({ name, label }) => (
            <div className="checkbox-div" key={name}>
              <Checkbox
                name={name}
                onChange={handleDayChange}
                disabled={isAllWeek}
                checked={formik.values.day.includes(name)}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
        {formik.touched.day && !!formik.errors.day && (
          <div className="error error-text">{formik.errors.day}</div>
        )}
        <h3>Godziny promocji:</h3>
        <div className="all-day">
          <Checkbox
            id="isAllDay"
            name="isAllDay"
            label="Cały dzień"
            checked={isAllDay}
            onChange={handleIsAllDay}
          />
          <span>Cały dzień</span>
        </div>
        {!isAllDay && (
          <div className="hours">
            <TextField
              id="startHours"
              name="startHours"
              type="time"
              value={formik.values.startHours}
              disabled={isAllDay}
              onChange={formik.handleChange}
              className={classes.root}
              sx={{
                '& input[type="time"]::-webkit-calendar-picker-indicator': {
                  filter:
                    "invert(65%) sepia(98%) saturate(2385%) hue-rotate(227deg) brightness(103%) contrast(101%)",
                },
              }}
              error={formik.touched.startHours && !!formik.errors.startHours}
              helperText={formik.touched.startHours && formik.errors.startHours}
            />
            <TextField
              id="endHours"
              name="endHours"
              type="time"
              value={formik.values.endHours}
              disabled={isAllDay}
              onChange={formik.handleChange}
              className={classes.root}
              sx={{
                '& input[type="time"]::-webkit-calendar-picker-indicator': {
                  filter:
                    "invert(65%) sepia(98%) saturate(2385%) hue-rotate(227deg) brightness(103%) contrast(101%)",
                },
              }}
              error={formik.touched.endHours && !!formik.errors.endHours}
              helperText={formik.touched.endHours && formik.errors.endHours}
            />
          </div>
        )}

        <h3>Dodatkowe informacje:</h3>
        <TextField
          id="description"
          name="description"
          label="Dodatkowy opis"
          multiline
          rows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
          className={classes.root}
        />
        <TextField
          id="googleMaps"
          name="googleMaps"
          label="Link do map googla"
          value={formik.values.googleMaps}
          onChange={formik.handleChange}
          className={classes.root}
          error={formik.touched.googleMaps && !!formik.errors.googleMaps}
          helperText={formik.touched.googleMaps && formik.errors.googleMaps}
        />
        <TextField
          id="website"
          name="website"
          label="Strona internetowa lokalu"
          value={formik.values.website}
          onChange={formik.handleChange}
          className={classes.root}
          error={formik.touched.website && !!formik.errors.website}
          helperText={formik.touched.website && formik.errors.website}
        />
        <h3>Dowód promocji w postaci linku:{/* lub zdjęcia: */}</h3>
        <div className="proof">
          <TextField
            id="link"
            name="link"
            label="link do promocji"
            value={formik.values.link}
            onChange={formik.handleChange}
            className={classes.root}
            error={formik.touched.link && !!formik.errors.link}
            helperText={formik.touched.link && formik.errors.link}
          />
          {/*   <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
                         value={formik.values.image} 
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
            error={formik.touched.image && !!formik.errors.image}
            helperText={formik.touched.image && formik.errors.image}
          /> */}
        </div>
        <Button variant="contained" type="submit" className="submit-btn">
          Wyślij
        </Button>
        {isSent && (
          <Alert severity="success" className="alert">
            <AlertTitle>Sukces</AlertTitle>
            Twoja promocja została przesłana do sprawdzenia.
            <strong> Możesz przesłać kolejną!</strong>
          </Alert>
        )}
        {isSent === false && (
          <Alert severity="error" className="alert">
            <AlertTitle>Błąd</AlertTitle>
            Formularz nie został wysłany, pojawił się niespodziewany błąd.
            <strong> Spróbuj ponownie później.</strong>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Form;