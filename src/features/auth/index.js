import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, register, selectErrors } from "./authSlice";
function Auth({ isRegistered }) {
  const dispatch = useDispatch()
  const errors = useSelector(selectErrors)
  const navigate = useNavigate()
  async function onSubmit({ username, email, password }) {
    try {
      await dispatch(isRegistered ?
        login({ email, password }) :
        register(username, email, password)
      ).unwrap();
      navigate('/')
    } catch (e) { }
  }
  return (
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            {isRegistered ?
              <h1 class="text-xs-center">Sign in</h1>
              :
              <>
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                  <Link to="/login">Have an account?</Link>
                </p>
              </>
            }

            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required"
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email"
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                onSubmit(values)
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {!isRegistered &&
                    <>
                      <ErrorMessage className="error-messages" name="username" component="div" />
                      <Field className="form-group form-control form-control-lg" type="text" name="username" placeholder="Your Name" />
                    </>
                  }

                  <ErrorMessage className="error-messages" name="email" component="div" />
                  <Field className="form-group form-control form-control-lg" type="email" name="email" placeholder="Email" />

                  <ErrorMessage className="error-messages" name="password" component="div" />
                  <Field className="form-group form-control form-control-lg" type="password" name="password" placeholder="Password" />

                  {errors &&
                    <ul class="error-messages">
                      <li>{JSON.stringify(errors)}</li>
                    </ul>
                  }
                  <button type="submit" disabled={isSubmitting}
                    className="btn btn-lg btn-primary pull-xs-right">
                    {isRegistered ? "Sign in" : "Sign up"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Auth
