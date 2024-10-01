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
import { submit } from "@/lib/actions";


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
        return <ThankYou />
      }
    }
  ]

  function reducer(state, action){
    switch(action.type){
      case 'warn':
        return {...state, warnings: action.payload}
      case 'next':
        state.steps[state.currentStep].state = 'valid';
        state.formData = {...state.formData, ...action.payload};
        state.warnings = '';
        if(state.currentStep === 2){
          state.formData.total = state.formData.cakeSize === '6' ? 80 : 100;
          state.formData.total = state.formData.cakeType === 'custom' ? state.formData.total + 20 : state.formData.total;
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
        state.steps[state.currentStep].state = 'valid';
        submit(state.formData);
        return {...state, currentStep: state.currentStep +1}
      case 'extra': {
        state.formData.cakeDetails.extras[action.payload.name] = action.payload.checkedState;
        state.formData.total = action.payload.total;
        state.formData = {...state.formData};
        return {...state}
      }

    }
  }

  const [state, dispatch] = useReducer(reducer, {
    steps,
    currentStep: 0,
    warnings: '',
    formData: {
      total: 0,
      cakeDetails: {
        extras: {
        glitterCherries: null,
        discoBalls: null,
        bows: null,
        }
      },
    },
  })

  return (
    <>
      <div className={state.currentStep === 7 ? "hero h-full min-w-screen" : "flex flex-col bg-base-200 overflow-auto overscroll-contain w-full h-full justify-center md:self-center border-8 bg-[#F9F1FE] items-center rounded-lg md:w-2/3 md:h-2/3 md:pl-6 mb-[60px]"}
      style={ {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%2377b8da' fill-opacity='0.27'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundColor: `#f9f1fe`,
        }
      }>
        {state.steps[state.currentStep].component(dispatch, state.warnings, state.formData)}
      </div>
      {(state.currentStep > 3) && <div className="w-full flex justify-center">
        <div className="stats shadow h-full relative bottom-[30px]">
            <div className="stat self-center">
              <div className="stat-title">Estimated Total</div>
              <div className="stat-value">${state.formData.total}.00</div>
            </div>
        </div>
      </div>}
    </>
  )
}