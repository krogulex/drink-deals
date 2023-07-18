import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Checkbox,
} from "@mui/material";

import axios from "axios";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      color: "#fff", // Replace with your desired color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff", // Replace with your desired color
    },
    "& .MuiInputLabel-root": {
      color: "#fff", // Replace with your desired color
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E384FF", // Replace with your desired color
      },
      "&:hover fieldset": {
        borderColor: "#E384FF", // Replace with your desired color
      },
      "&.Mui-focused fieldset": {
        borderColor: "#E384FF", // Replace with your desired color
      },
    },
  },
}));

const Form = () => {
  const [isAllDay, setIsAllDay] = useState(false);
  const [isAllWeek, setIsAllWeek] = useState(false);

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

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    allDay: Yup.boolean(),
    allWeek: Yup.boolean(),
    description: Yup.string(),
    category: Yup.array(),
    /*     startHours: Yup.string().when("allDay", (allDay, schema) => {
      if (allDay) {
        return schema.required("Start Hours are required");
      }
      return schema;
    }), */
    // Add more validation rules for other fields
  });

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
      image: null,
      googleMaps: "",
      website: "",
    },
    onSubmit: async (values, { resetForm }) => {
      // Submit form data
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("place", values.place);
        formData.append("price", values.price);
        formData.append("allDay", values.allDay);
        formData.append("allWeek", values.allWeek);
        formData.append("startHours", values.startHours);
        formData.append("endHours", values.endHours);
        formData.append("description", values.description);
        formData.append("category", JSON.stringify(values.category));
        formData.append("day", JSON.stringify(values.day));
        formData.append("link", values.link);
        formData.append("image", values.image); // Append the image file to the formData
        formData.append("googleMaps", values.googleMaps);
        formData.append("website", values.website);

        const response = await axios.post(
          "http://localhost:8000/promotions",
          formData, // Send the formData as the data for the POST request
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to 'multipart/form-data'
            },
          }
        );
        resetForm({ values: "" });
        setIsAllDay(false)
        setIsAllWeek(false)

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: validationSchema,
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
        />
        <TextField
          id="place"
          name="place"
          label="Miejsce"
          value={formik.values.place}
          onChange={formik.handleChange}
          className={classes.root}
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
            endAdornment: <p>zł</p>,
          }}
          className={`${classes.root} price`}
        />
        <h3>Kategoria:</h3>
        <div className="category">
          <Checkbox
            name="beer"
            label="beer"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("beer")}
          ></Checkbox>
          <span>Piwo</span>
          <Checkbox
            name="aperol"
            label="aperol"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("aperol")}
          ></Checkbox>{" "}
          <span>Aperol</span>
          <Checkbox
            name="whisky"
            label="whisky"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("whisky")}
          ></Checkbox>
          <span>Whisky</span>
          <Checkbox
            name="gin"
            label="gin"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("gin")}
          ></Checkbox>
          <span>Gin</span>
          <Checkbox
            name="vodka"
            label="vodka"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("vodka")}
          ></Checkbox>
          <span>Wódka</span>
          <Checkbox
            name="prosecco"
            label="prosecco"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("prosecco")}
          ></Checkbox>{" "}
          <span>Prosecco</span>
          <Checkbox
            name="martini"
            label="martini"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("martini")}
          ></Checkbox>
          <span>Martini</span>
          <Checkbox
            name="wine"
            label="wine"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("wine")}
          ></Checkbox>
          <span>Wino</span>
          <Checkbox
            name="rum"
            label="rum"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("rum")}
          ></Checkbox>
          <span>Rum</span>
          <Checkbox
            name="tequila"
            label="tequila"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("tequila")}
          ></Checkbox>
          <span>Tequila</span>
          <Checkbox
            name="other"
            label="other"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("other")}
          ></Checkbox>
          <span>Inne</span>
        </div>
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
          <Checkbox
            name="Monday"
            onChange={handleDayChange}
            disabled={isAllWeek}
            checked={formik.values.day.includes("Monday")}
          />
          <span> Poniedziałek</span>
          <Checkbox
            name="Tuesday"
            onChange={handleDayChange}
            disabled={isAllWeek}
            checked={formik.values.day.includes("Tuesday")}
          />
          <span>Wtorek</span>
          <Checkbox
            name="Wednesday"
            onChange={handleDayChange}
            disabled={isAllWeek}
            checked={formik.values.day.includes("Wednesday")}
          />
          <span>Środa</span>
          <Checkbox
            name="Thursday"
            onChange={handleDayChange}
            disabled={isAllWeek}
            checked={formik.values.day.includes("Thursday")}
          />
          <span>Czwartek</span>
          <Checkbox
            name="Friday"
            onChange={handleDayChange}
            disabled={isAllWeek}
            checked={formik.values.day.includes("Friday")}
          />
          <span> Piątek</span>
          <Checkbox
            name="Saturday"
            onChange={handleDayChange}
            disabled={isAllWeek}
            checked={formik.values.day.includes("Saturday")}
          />
          <span> Sobota</span>
          <Checkbox
            name="Sunday"
            onChange={handleDayChange}
            disabled={isAllWeek}
            checked={formik.values.day.includes("Sunday")}
          />
          <span> Niedziela</span>
        </div>
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
          />
        </div>

        <h3>Dodatkowe informacje:</h3>
        <TextField
          id="description"
          name="description"
          label="Opis promocji"
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
        />
        <TextField
          id="website"
          name="website"
          label="Strona internetowa lokalu"
          value={formik.values.website}
          onChange={formik.handleChange}
          className={classes.root}
        />
        <h3>Dowód promocji w postaci linku lub zdjęcia:</h3>
        <div className="proof">
          <TextField
            id="link"
            name="link"
            label="link do promocji"
            value={formik.values.link}
            onChange={formik.handleChange}
            className={classes.root}
          />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            /*             value={formik.values.image} */
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
          />
        </div>
        <Button variant="contained" type="submit">
          Wyślij
        </Button>
      </form>
    </div>
  );
};

export default Form;
