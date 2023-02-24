import { useState } from "react";
import { Formik } from "formik";
export default function Login() {
    //
    const [values, setValues] = useState({
        email: '', password: '', confirmPassword: '', isRead: false,
    });
    const [errors, setErrors] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();
    };

    /// add function when value change
    const handleChange = (event) => {
        event.persist();

        if (event.target.name === 'isRead') {
            setValues({
                ...values,
                [event.target.name]: !values.isRead,
            });
        } else {
            setValues({ ...values, [event.target.name]: event.target.value });
        }
    };




    const stringJson = JSON.stringify(values);
    return (
        <div className="container" style={{ width: "500px", height: "500px", backgroundColor: "gray", marginLeft: "35%" }}>
            <h1 style={{ width: "100%", borderBottom: "1px solid", textAlign: "center" }}>Đăng ký</h1>
            <Formik
                initialValues={{ email: '', confirmPassword: '', password: '', isRead: false }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    }
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Required';
                    }
                    if (values.confirmPassword !== values.password) {
                        errors.confirmPassword = 'Confirm password is not match';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        
                        />
                        {errors.email && touched.email && <div className="error">{errors.email}</div>}
                        <br />
                        <input
                            style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && <div className="error">{errors.password}</div>}
                        <br />
                        <input
                            style={{ width: "90%", height: "30px", border: "1px solid", textAlign: "center", marginTop: "10px", marginLeft: "20px" }}
                            type="confirmPassword"
                            placeholder="ConfirmPassword"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                        />
                        {errors.confirmPassword && touched.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                        <br />
                        <br />
                        <label>
                            <input
                                name="isRead"
                                type="checkbox"
                                checked={values.isRead}
                                onChange={handleChange} />I read and accept the privacy policy:
                        </label>
                        <br />
                        <button 
                        type="submit" disabled={isSubmitting}
                        style={{ marginLeft: "43%", marginTop: "10px" }}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
            <div className="show-json-string-setValues">{stringJson}</div>
            {errors.map((error) => (
                <p key={error}>Error: {error}</p>
            ))}
        </div>
    );
}
