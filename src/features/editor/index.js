import { Formik, Form, Field } from "formik";
import React from "react"

function Editor() {
  function onSubmit(values) {

  }
  return (
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                onSubmit(values)
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field className="form-group form-control " type="url" name="url" placeholder="Article Title" />

                  <Field className="form-group form-control form-control-lg" type="text" name="name" placeholder="What's this article about?" />
                  <Field as="textarea" rows="8" className="form-group form-control form-control-lg" type="text" name="bio" placeholder="Write your article (in markdown)" />
                  <Field className="form-group form-control form-control-lg" type="text" name="email" placeholder="Enter tag" />

                  <button type="submit" disabled={isSubmitting}
                    className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
