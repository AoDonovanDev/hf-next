'use client';

import { useReducer } from "react"
import ContactInfo from "./ContactInfo";
import Pickup from "./Pickup";
import CakeType from "./CakeType";
import Preferences from "./Preferences";
import Flavors from "./Flavors";
import ReferencePhoto from "./ReferencePhoto";
import Policies from "./Policies";
import ThankYou from "./ThankYou";

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
      label: 'Preferences',
      component: function(fn, warnings, existingInfo){
        return <Preferences dispatch={fn} warnings={warnings} existingInfo={existingInfo}/>
      }
    },
    {
      label: 'Flavors',
      component: function(fn, warnings, existingInfo){
        return <Flavors dispatch={fn} warnings={warnings} existingInfo={existingInfo}/>
      },
      state: 'invalid'
    },
    {
      label: 'Reference Photo',
      component: function(fn, warnings, existingInfo){
        return <ReferencePhoto dispatch={fn} warnings={warnings} existingInfo={existingInfo}/>
      },
      state: 'valid'
    },
    {
      label: 'Policies',
      component: function(fn, warnings, existingInfo){
        return <Policies dispatch={fn} warnings={warnings} existingInfo={existingInfo}/>
      },
      state: 'invalid'
    },
    {
      label: 'Thank You',
      component: function(fn, warnings, existingInfo){
        return 
      }
    }
  ]

  function reducer(state, action){
    console.log(state, action)
    switch(action.type){
      case 'warn':
        return {...state, warnings: action.payload}
      case 'next':
        state.steps[state.currentStep].state = 'valid';
        console.log(action.payload)
        state.formData = {...state.formData, ...action.payload};
        state.warnings = '';
        console.log(state.formData)
        if(state.currentStep === 2){
          state.total = state.formData.cakeSize === 6 ? 80 : 100;
        }
        if(state.currentStep === 3 && state.formData.cakeType === 'trust'){
          return {...state, currentStep: state.currentStep + 2}
        }
        return {...state, currentStep: state.currentStep + 1}
      case 'prev':
        if(state.currentStep === 5 && state.formData.cakeType === 'trust'){
          return {...state, currentStep: state.currentStep - 2}
        }
        return {...state, currentStep: state.currentStep - 1}
      case 'submit':
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
    <div className="flex flex-col bg-base-200 w-96 h-3/5 md:w-1/3 md:h-2/3 justify-center items-center rounded-lg ring-inset md:pl-6 md:py-6 border-8 bg-pink-100">
      {state.steps[state.currentStep].component(dispatch, state.warnings, state.formData)}
    </div>
  )
}