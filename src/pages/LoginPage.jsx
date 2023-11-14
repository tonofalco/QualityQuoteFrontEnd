import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../hooks';

import fondoLogin from '../assets/img/fondoLogin.jpg'
import logoGuerrero from '../assets/img/logoGuerrero.png'

import '../styles/styles.css';
import { Button, Input, Label, Logo, LongImage } from '../styles/styledComponents';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore()

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)

    const loginSubmit = (e) => {
        e.preventDefault()
        startLogin({ email: loginEmail, password: loginPassword })
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticacion', errorMessage, 'error')
        }
    }, [errorMessage])

    return (
        <div>
            <div className="row flex-column-reverse flex-md-row">
                <div className="col-md-5" >
                    <LongImage className='img-fluid' src={fondoLogin} />
                </div>

                <div className="col-md-7 login-form-1 login-container">
                    <Logo className='img-fluid' src={logoGuerrero} />
                    <form onSubmit={loginSubmit} className=''>
                        <h5 className='fw-light text-center mb-3'>Software de cotizacion y gestion para transportes terrestres</h5>
                        <div className="form-group input">
                            <Label>Email</Label>
                            <Input //? CORREO
                                type="email"
                                className="form-control"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group input">
                            <Label>Contraseña</Label>
                            <Input //? CONTRASEÑA
                                type="password"
                                className="form-control"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid input">
                            <Button //? BOTON ACESSO
                                type="submit"
                                className="btnSubmit"
                                value="Acceso"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
