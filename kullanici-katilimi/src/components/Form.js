import React from "react";
import { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
const formSchema = yup.object().shape({
  isim: yup
    .string()
    .required("İsim giriniz")
    .min(2, "En az 2 karakter giriniz"),
  soyIsim: yup
    .string()
    .required("soyisim giriniz")
    .min(2, "En az 2 karakter giriniz"),

  sifre: yup
    .string()
    .min(6, "En az 6 karakter giriniz")
    .required("Birazcık uzun bir şifre lütfen, en az 6 karakter."),
  email: yup
    .string()
    .email("Eposta adresiniz yanlış.Tekrar deneyiniz!")
    .required("Eposta zorunlu"),
  sartlar: yup
    .boolean()
    .oneOf(
      [true],
      "Uygulamayı kullanmak için okuyup, koşulları kabul eder misiniz?"
    ),
});

function Form() {
  const emptyForm = {
    isim: "",
    soyIsim: "",
    sifre: "",
    email: "",
    sartlar: false,
  };
  const [formData, setformData] = useState(emptyForm);
  const [formError, setFormError] = useState();
  const [disabled, setDisabled] = useState(true);

  const checkErrors = (name, value) => {
    // console.log(checkErrors)
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormError({
          ...formError,
          [name]: formSchema.name,
        });
      })
      .catch((err) => {
        setFormError({
          ...formError,
          [name]: err.errors[0],
        });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        const nextState = {
          ...res.formData,
          [name]: value,
        };
        setformData(nextState);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    const inputValueSelector = type === "checkbox" ? checked : value;
    checkErrors(name, inputValueSelector);
    const nextState = {
      ...formData,
      [name]: inputValueSelector,
    };
    setformData(nextState);
  };
  console.log(formData);
  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabled(!valid));
  }, [formData]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <fieldset className="form-fieldset">
          <legend>Kullanıcı Formu:</legend>
          <div className="form-item">
            <label htmlFor="ffirstname">İsim:</label>
            <input
              onChange={handleChange}
              type="text"
              id="ffirstname"
              value={formData.isim}
              name="isim"
              data-cy="newIsım"
            />{" "}
            <div className="error">{formError?.isim}</div>
          </div>
          <div className="form-item">
            <label htmlFor="flastname">Soyisim:</label>
            <input
              onChange={handleChange}
              type="text"
              id="flastname"
              value={formData.soyIsim}
              name="soyIsim"
              data-cy="newSoyisim"
            />{" "}
            <div className="error">{formError?.soyIsim}</div>
          </div>
          <div className="form-item">
            <label htmlFor="femail">E-mail:</label>
            <input
              onChange={handleChange}
              type="email"
              id="femail"
              value={formData.email}
              name="email"
              data-cy="newEmail"
            />{" "}
            <div className="error">{formError?.email}</div>
          </div>
          <div className="form-item">
            <label htmlFor="fsifre">Şifre:</label>
            <input
              onChange={handleChange}
              type="password"
              id="fsifre"
              value={formData.sifre}
              name="sifre"
              data-cy="newSifre"
            />{" "}
            <div className="error">{formError?.sifre}</div>
          </div>
          <div className="form-item checkbox-container">
            <label htmlFor="fsartlar">
              <input
                onChange={handleChange}
                type="checkbox"
                id="fsartlar"
                value={formData.sartlar}
                name="sartlar"
                data-cy="newSartlar"
              />
            </label>
            <span>Kullanım koşullarını kabul ediyorum</span>{" "}
            <div className="error">{formError?.sartlar}</div>
          </div>

          <button
            type="submit"
            className="submitBtn"
            disabled={disabled}
            data-cy="newButton"
          >
            Gönder
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;
