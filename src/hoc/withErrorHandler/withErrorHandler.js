import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrapperComponent, axios) => {

    return class extends Component {
        
        state = {
            error: null
        }


        
        constructor () {
            super();
    
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptio = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <WrapperComponent {...this.props} />
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;