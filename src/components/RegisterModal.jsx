import { useState } from "react";
import ModalWithForm from "./ModalWithForm.jsx";

export default function RegisterModal({ isOpen, onClose, onSubmit }) {
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Create account"
    >
      <label className="modal__label">
        <span className="modal__label-text">Name</span>
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        <span className="modal__label-text">Email</span>
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        <span className="modal__label-text">Password</span>
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </label>
    </ModalWithForm>
  );
}
