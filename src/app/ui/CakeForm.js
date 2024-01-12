'use client';

import { useReducer } from "react"
import ContactInfo from "./ContactInfo";
import Pickup from "./Pickup";
import CakeType from "./CakeType";

export default function CakeForm(){

  const steps = [
    {
      label: 'Contact Info',
      component: function(fn, warnings, existingInfo){
        return <ContactInfo dispatch={fn} warnings={warnings} existingInfo={existingInfo}/>}
      ,
      state: 'invalid'
    },
    {
      label: 'Pickup',
      component: function(fn, warnings, existingInfo){
        return <Pickup dispatch={fn} warnings={warnings} existingInfo={existingInfo}/>
      },
      state: 'invalid'
    },
    {
      label: 'Trust/Custom',
      component: function(fn, warnings, existingInfo){
        return <CakeType dispatch={fn} warnings={warnings} existingInfo={existingInfo}/>
      },
      state: 'invalid'
    },
    {
      label: 'Flavors',
      state: 'invalid'
    },
    {
      label: 'Reference Photo',
      state: 'valid'
    },
    {
      label: 'Policies',
      state: 'invalid'
    }
  ]

  function reducer(state, action){
    console.log(state, action)
    switch(action.type){
      case 'warn':
        return {...state, warnings: action.payload}
      case 'next':
        state.steps[state.currentStep].state = 'valid';
        state.formData = {...state.formData, ...action.payload}
        console.log(state.formData)
        return {...state, currentStep: state.currentStep+1}
      case 'prev':
        return {...state, currentStep: state.currentStep-1}
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    steps,
    currentStep: 0,
    warnings: '',
    formData: {},
    total: 0
  })

  return (
    <>
      {state.steps[state.currentStep].component(dispatch, state.warnings, state.formData)}
    </>
  )
}