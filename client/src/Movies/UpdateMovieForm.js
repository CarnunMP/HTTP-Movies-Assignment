import React from "react";
import { Formik, Form, Field } from "formik";

export default function UpdateMovieForm(props) {
    const { movies, onUpdateSubmit } = props;
    const id = props.match.params.id;
    const movie = movies.find(movie => movie.id = id);
    const initialValues = {
        title: movie.title, 
        director: movie.director, 
        metascore: movie.metascore, 
        stars: JSON.stringify(movie.stars),
    }

    return (
        <div className="update-movie-form">
            <Formik
                initialValues={initialValues}
                onSubmit={onUpdateSubmit(id)}
                render={props => (
                    <Form>
                        <div className="field">
                            Title
                            <Field name="title" type="text"/>
                        </div>
                        <div className="field">
                            Director
                            <Field name="director" type="text"/>
                        </div>
                        <div className="field">
                            Metascore
                            <Field name="metascore" type="number"/>
                        </div>
                        <div className="field">
                            Stars
                            <Field name="stars" type="text"/>
                        </div>
                        <button type="submit">Submit Changes</button>
                    </Form>
                )}
            />
        </div>
    )
}