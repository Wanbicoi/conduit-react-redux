import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { isObjectEmpty } from "../../common/utils";
import { selectErrors, selectUser, updateUser } from '../auth/authSlice';
import { logOut as logout } from '../auth/authSlice'
function Settings() {
  let user = useSelector(selectUser)
  const errors = useSelector(selectErrors)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(user)
    if (isObjectEmpty(user)) navigate("/")
  }, [])
  function onSubmit(values) { dispatch(updateUser(values)) }
  function logOut() { dispatch(logout()) }
  return (
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>
            <Formik
              initialValues={{ email: user.email, name: user.username, password: user.password, url: user.image, bio: user.bio }}
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
                  <Field className="form-group form-control " type="url" name="url" placeholder="URL of profile picture" />

                  <Field className="form-group form-control form-control-lg" type="text" name="name" placeholder="Your Name" />
                  <Field as="textarea" rows="8" className="form-group form-control form-control-lg" type="text" name="bio" placeholder="Short bio about you" />
                  <Field className="form-group form-control form-control-lg" type="email" name="email" placeholder="Email" />
                  <Field className="form-group form-control form-control-lg" type="password" name="password" placeholder="Password" />

                  {errors &&
                    <ul class="error-messages">
                      <li>{JSON.stringify(errors)}</li>
                    </ul>
                  }
                  <button type="submit" disabled={isSubmitting}
                    className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                </Form>
              )}
            </Formik>
            <hr />
            <button class="btn btn-outline-danger"
              onClick={logOut()}>Or click here to logout.</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Settings
