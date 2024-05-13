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
          state.formData.total = state.formData.cakeSize === '6' ? 80 : 100;
          state.formData.total = state.formData.cakeType === 'custom' ? state.formData.total + 20 : state.formData.total;
        }
        if(state.currentStep === 3){
          const nav = document.getElementById("hfNavBar");
          nav.scrollIntoView();
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
      <div className={state.currentStep === 7 ? "hero h-full min-w-screen" : "flex flex-col bg-base-200 overflow-auto overscroll-contain w-full h-full justify-center md:self-center border-8 bg-pink-100 items-center rounded-lg md:w-2/3 md:h-2/3 md:pl-6 mb-[60px]"}>
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