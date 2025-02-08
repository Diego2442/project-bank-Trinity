import { useMemo } from 'react';
import {useState, useEffect } from 'react';


export const useForm = (initialForm = {}, formValidations = {}) => {
  
    const [formState, setFormState] = useState(initialForm);

    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      createValidators();
    }, [formState])

    //Este useEffect ayuda a hacer de nuevo la petición cuando cambian los valores del initialForm
    useEffect(() => {
      setFormState(initialForm);
    }, [initialForm])
    

    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;    
        }

        return true;
    }, [formValidation]);
    

    const onInputChange = (evento) =>{
        //console.log(evento.target.value)
        const {target} = evento;
        const {value, name} = target;

        setFormState({
            ...formState,
            [name]: value, //propiedades computadas de los objetos
        });
    }

    const onCleanForm = () =>{
        
        setFormState(
            initialForm,
        );
    }

    //Valida el formulario
    const createValidators = () =>{
        const formCheckedValues={};

            for (const formInput of Object.keys(formValidations)){
                //console.log(formInput)
                const [fnValidation, errorMessage] = formValidations[formInput];
    
                formCheckedValues[`${formInput}Valid`] = fnValidation( formState[formInput]) ? null : errorMessage 
            }
    
            setFormValidation( formCheckedValues );
            //console.log(formCheckedValues)
    }

    return {
        ...formState, //Esta linea desestructura el objeto form, para que al momento de devolver el objeto ya se puedan desestructurar directamente los atributos
        formState,
        onInputChange,
        onCleanForm,

        //Esparcir los resultados de las validaciones
        ...formValidation,
        isFormValid,
    }
}
