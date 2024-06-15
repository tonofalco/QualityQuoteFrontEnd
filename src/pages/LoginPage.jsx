import { useEffect, Suspense, memo } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useAuthStore, useForm } from '../hooks';

import FondoLogin from '../assets/img/fondoLogin.webp'
import LogoGuerrero from '../assets/img/logoGuerrero.webp'
import '../styles/login.css';


const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = memo(() => {

    const { startLogin, errorMessage } = useAuthStore()

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)

    const loginSubmit = (e) => {
        e.preventDefault()
        startLogin({ email: loginEmail, password: loginPassword })
    }

    const SwalWithReact = withReactContent(Swal);

    useEffect(() => {
        if (errorMessage !== undefined) {
            SwalWithReact.fire({
                title: 'Error en la autenticacion',
                text: errorMessage,
                icon: 'error'
            });
        }
    }, [errorMessage]);

    return (
        <div>
            <div className="row ">
                <div className="col-md-5 d-none d-md-block" >
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyLoadImage src={FondoLogin} className='img-login-large' />
                    </Suspense>
                </div>

                <div className="col-md-7 col-12 login-form-1 login-container d-flex-column align-items-center justify-content-center">
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyLoadImage src={LogoGuerrero} className='logoQuality' />
                    </Suspense>
                    <form onSubmit={loginSubmit} className=''>
                        <h5 className='fw-light text-center mb-3'>Software de cotizacion y gestion para transportes terrestres</h5>
                        <div className="form-group input">
                            <label className='label-form'>Email</label>
                            <input //? CORREO
                                type="email"
                                className="form-control"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group input">
                            <label className='label-form'>Contraseña</label>
                            <input //? CONTRASEÑA
                                type="password"
                                className="form-control"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid input ">
                            <button
                                type="submit"
                                className="btnSubmit text-white py-2 btn-form "
                                value="Acceso"
                            >Acceso

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
})
