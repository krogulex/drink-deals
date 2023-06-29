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
  const [isAllDay, setIsAllDay] = useState(false);
  const [isAllWeek, setIsAllWeek] = useState(false);

  const handleIsAllDay = (event) => {
    setIsAllDay(event.target.checked);
    formik.values.allDay = event.target.checked;
  };

  const handleIsAllWeek = (event) => {
    setIsAllWeek(event.target.checked);
    formik.values.allWeek = event.target.checked;
  };

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
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
    },
    onSubmit: async (values, { resetForm }) => {
      // Submit form data
      console.log(values);

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
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: validationSchema,
  });
  return (
    <div>
      <h2 className="form-header">Dodaj swoją promocję!</h2>
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          id="name"
          name="name"
          label="Nazwa promocji"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          id="place"
          name="place"
          label="Miejsce"
          value={formik.values.place}
          onChange={formik.handleChange}
        />
        <TextField
          id="price"
          name="price"
          label="Cena"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <h3>Kategoria:</h3>
        <div>
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
            name="other"
            label="other"
            onChange={handleCategoryChange}
            checked={formik.values.category.includes("other")}
          ></Checkbox>
          <span>Inne</span>
        </div>
        <div>
          <h3>Dzień promocji:</h3>{" "}
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
        <div>
          <h3>Godziny promocji:</h3>
          <Checkbox
            id="isAllDay"
            name="isAllDay"
            label="Cały dzień"
            checked={isAllDay}
            onChange={handleIsAllDay}
          />
          <span>Cały dzień</span>
        </div>
        <TextField
          id="startHours"
          name="startHours"
          type="time"
          value={formik.values.startHours}
          disabled={isAllDay}
          onChange={formik.handleChange}
        />
        <TextField
          id="endHours"
          name="endHours"
          type="time"
          value={formik.values.endHours}
          disabled={isAllDay}
          onChange={formik.handleChange}
        />
        <TextField
          id="description"
          name="description"
          label="Opis promocji"
          multiline
          rows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <TextField
          id="googleMaps"
          name="googleMaps"
          label="Link do map googla"
          value={formik.values.googleMaps}
          onChange={formik.handleChange}
        />
        <div className="proof">
          <h3>Dowód promocji w postaci linku lub zdjęcia:</h3>
          <TextField
            id="link"
            name="link"
            label="link do promocji"
            value={formik.values.link}
            onChange={formik.handleChange}
          />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            /*             value={formik.values.image} */
            onChange={handleImageChange}
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
