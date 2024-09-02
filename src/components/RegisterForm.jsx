import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

function RegisterForm() {
    const submit = (values, action) => {
        setTimeout(() => {
            action.resetForm();
        }, 2000)
    }

    const validation = yup.object().shape({
        email: yup.string().email("Geçerli bir E-Mail adresi giriniz").required("E-Mail adresi zorunludur"),
        age: yup.number().positive("Pozitif bir değer giriniz").integer("Tam sayı giriniz").required("Yas alanı zorunludur"),
        password: yup.string().required("Sifre alanı zorunludur"),
        confirmPassword: yup.string().required("Sifre tekrarı zorunludur").oneOf([yup.ref('password', yup.password)], 'Sifreler aynı olmak zorundadır'),
        term: yup.boolean().required("Lütfen sözleşmeyi onaylayınız")
    })
    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            age: '',
            password: '',
            confirmPassword: '',
            term: '',

        },
        validationSchema: validation,
        onSubmit: submit
    })
    console.log(errors)
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className='inputDiv'>
                    <label>E-Mail</label>
                    <input
                        type="text"
                        id="email"
                        placeholder='E-Mail giriniz'
                        value={values.email}
                        onChange={handleChange} />
                    {errors.email && <p className='input-eror'>{errors.email}</p>}
                </div>

                <div className='inputDiv'>
                    <label>Yas</label>
                    <input
                        type="number"
                        id="age"
                        placeholder='Yaşınızı giriniz'
                        value={values.age}
                        onChange={handleChange} />
                    {errors.age && <p className='input-eror'>{errors.age}</p>}
                </div>
                <div className='inputDiv'>
                    <label>Sifre</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Sifrenizi giriniz'
                        value={values.password}
                        onChange={handleChange} />
                    {errors.password && <p className='input-eror'>{errors.password}</p>}
                </div>
                <div className='inputDiv'>

                    <label>Sifre Tekrarı</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder='Sifrenizi tekrar giriniz'
                        value={values.confirmPassword}
                        onChange={handleChange} />
                    {errors.confirmPassword && <p className='input-eror'>{errors.confirmPassword}</p>}

                </div>
                <div className='inputDiv'>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: "flex-start" }}>
                        <input
                            style={{ width: "20px", height: "12px" }}
                            type="checkbox"
                            id="term"
                            value={values.term}
                            onChange={handleChange} />
                        <label>Kullanıcı Sözleşmesini Kabul Ediyorum</label>

                    </div>
                    {errors.term && <p className='input-eror'>{errors.term}</p>}
                </div>
                <button type='submit' >Kaydet</button>
            </form>
        </div>
    )
}

export default RegisterForm