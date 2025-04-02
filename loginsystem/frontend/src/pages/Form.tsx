

import { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/form.css";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

const EmployeeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeEmail: "",
    employeePassword: "",
    birthDate: "",
    employeeID: "",
    agreeToTerms: false,
    employmentType: "",
    address: "",
    department: "",
    resume: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    });
  };

  // Validate the form inputs
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.employeeName) newErrors.employeeName = "Employee name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.employeeEmail)) newErrors.employeeEmail = "Invalid email";
    if (!formData.birthDate) newErrors.birthDate = "Date of joining is required";
    if (!formData.employeeID || isNaN(Number(formData.employeeID)))
      newErrors.employeeID = "Enter a valid Employee ID";
    if (!formData.employeePassword) newErrors.employeePassword = "Password is required";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";
    if (!captchaToken) newErrors.captcha = "Please verify CAPTCHA";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prepare form data with FormData for file upload
    const formPayload = new FormData();
    formPayload.append("employeeName", formData.employeeName);
    formPayload.append("employeeEmail", formData.employeeEmail);
    formPayload.append("employeePassword", formData.employeePassword);
    formPayload.append("birthDate", formData.birthDate);
    formPayload.append("employeeID", formData.employeeID);
    formPayload.append("agreeToTerms", formData.agreeToTerms.toString());
    formPayload.append("employmentType", formData.employmentType);
    formPayload.append("address", formData.address);
    formPayload.append("department", formData.department);
    if (formData.resume) formPayload.append("file", formData.resume);
    if (captchaToken) formPayload.append("captchaToken", captchaToken);
console.log(formPayload, 'formPayload');

    try {
      const response = await axios.post("http://localhost:5000/api/auth/submit", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Removed invalid 'body' property
      });
      alert('Employee registered successfully')
      console.log(response.data);
      // if(response){
        <Snackbar
        open={true}
        autoHideDuration={6000}
        // onClose={handleClose}
        message="Note archived"
        // action={action}
      />

      // }
      // setSuccessMessage("Employee registered successfully!");
      setFormData({
        employeeName: "",
        employeeEmail: "",
        employeePassword: "",
        birthDate: "",
        employeeID: "",
        agreeToTerms: false,
        employmentType: "",
        address: "",
        department: "",
        resume: null,
      });
      setCaptchaToken(null); // Reset CAPTCHA after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle CAPTCHA
  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Employee Name:</label>
      {errors.employeeName && <span style={{color: 'red'}}>{errors.employeeName}</span>}
      <input
        type="text"
        name="employeeName"
        value={formData.employeeName}
        onChange={handleChange}
        placeholder="enter your name"
      />

      <label>Email Address:</label>
      {errors.employeeEmail && <span style={{color: 'red'}}>{errors.employeeEmail}</span>}
      <input
        type="email"
        name="employeeEmail"
        value={formData.employeeEmail}
        onChange={handleChange}
        placeholder="email@example.com"
      />

      <label>Password:</label>
      <input
        type="password"
        name="employeePassword"
        value={formData.employeePassword}
        onChange={handleChange}
        placeholder="Create a password"
      />
      {errors.employeePassword && <span style={{color: 'red'}}>{errors.employeePassword}</span>}

      <label>Birth Date:</label>
      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
      {errors.birthDate && <span style={{color: 'red'}}>{errors.birthDate}</span>}

      <label>Employee ID:</label>
      <input
        type="number"
        name="employeeID"
        value={formData.employeeID}
        onChange={handleChange}
        placeholder="Employee ID"
      />
      {errors.employeeID && <span style={{color: 'red'}}>{errors.employeeID}</span>}

      <label>Employment Type:</label>
      <input
        type="radio"
        name="employmentType"
        value="Full-Time"
        checked={formData.employmentType === "Full-Time"}
        onChange={handleChange}
      />
      Full-Time
      <input
        type="radio"
        name="employmentType"
        value="Part-Time"
        checked={formData.employmentType === "Part-Time"}
        onChange={handleChange}
      />
      Part-Time
      <br />
      <label>Department:</label>
      <select name="department" value={formData.department} onChange={handleChange}>
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="developer">Developer</option>
        <option value="manager">Manager</option>
      </select>

      <label>Address:</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Enter your address"
      ></textarea>

      <label>Upload Resume:</label>
      <input type="file" name="resume" onChange={handleChange} />

      <input
        type="checkbox"
        name="agreeToTerms"
        checked={formData.agreeToTerms}
        onChange={handleChange}
      />
      <label>I agree to the terms and conditions</label>
      {errors.agreeToTerms && <span>{errors.agreeToTerms}</span>}

      <ReCAPTCHA sitekey="6Ld2ugIrAAAAAKcFKAVsWSdpw-l_ql3AvRn258N5" onChange={handleCaptcha} />
      {errors.captcha && <span>{errors.captcha}</span>}

      <button type="submit">Submit</button>
      <button
        type="reset"
        onClick={() =>
          setFormData({
            employeeName: "",
            employeeEmail: "",
            employeePassword: "",
            birthDate: "",
            employeeID: "",
            agreeToTerms: false,
            employmentType: "",
            address: "",
            department: "",
            resume: null,
          })
        }
      >
        Reset
      </button>

      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default EmployeeRegistrationForm;
////
