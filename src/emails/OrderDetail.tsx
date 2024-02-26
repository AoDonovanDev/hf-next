import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  Column,
  Row
} from '@react-email/components';
import * as React from 'react';
import uuid4 from "uuid4";

interface Extras {
  bows: boolean,
  discoBalls: boolean,
  freshFruit: boolean,
  glitterCherries: boolean,
}

interface ContactInfo {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
}

interface PickupDetails {
  date: string,
  pickupTime: string
}

interface CakeDetails {
  cakeFlavor: string,
  extras: Extras,
  fillingFlavor: string,
  fillingType: string,
  frostingFlavor: string,
  frostingType: string,
  other: string,
  writeInCakeFlavor: string,
  writeInFrostingFlavor: string
}


interface OrderDetails {
  total: number,
  cakeDetails: CakeDetails,
  cakeSize: string,
  cakeType: string,
  contactInfo: ContactInfo,
  pickupDetails: PickupDetails,
  preferences: string,
  imgUrl: string
}


export const OrderDetails = ({
  total,
  cakeDetails,
  cakeSize,
  cakeType ,
  contactInfo,
  pickupDetails,
  preferences,
  imgUrl
} : OrderDetails) => {

  const previewText = "You have a new order!"
  const xtras = Object.keys(cakeDetails.extras).filter(x => cakeDetails.extras[x]===true).map((x,i) => (<div key={uuid4()}>{i != 0 ? <Hr/> : <></>}<Row><Text className="m-0 p-2">{x}</Text></Row></div>));


  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans w-5/6 flex">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px] flex flex-col items-center gap-6">          
            <Heading className='text-center'>New Order</Heading>
            <Text className='text-md font-bold'>Cake Details:</Text>
            <Section>
              <Column className='border border-solid border-[#eaeaea]'>
                <Row><Text className='m-0 p-2'>Cake Type</Text></Row>
                <Hr/>
                <Row><Text className='m-0 p-2'>Cake Size</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Cake Flavor</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Frosting Flavor</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Frosting Type</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Filling Flavor</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Filling Type</Text></Row>
              </Column>
              <Column className='border border-solid border-[#eaeaea] border-l-0'>
                <Row><Text className='m-0 p-2'>{cakeType}</Text></Row>
                <Hr/>
                <Row><Text className='m-0 p-2'>{cakeSize}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{cakeDetails.cakeFlavor === "Other" ? cakeDetails.writeInCakeFlavor : cakeDetails.cakeFlavor}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{cakeDetails.frostingFlavor === "Other" ? cakeDetails.writeInFrostingFlavor : cakeDetails.frostingFlavor}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{cakeDetails.frostingType}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{cakeDetails.fillingFlavor}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{cakeDetails.fillingType === "Other" ? cakeDetails.other : cakeDetails.fillingType}</Text></Row>
              </Column>
            </Section>
            <Section className='mt-6'>
              <Column className='border border-solid border-[#eaeaea]'><Text className="m-0 p-2">Extras</Text></Column>
              <Column className='border border-solid border-[#eaeaea] border-l-0'>{xtras}</Column>
            </Section>
            {preferences && <Section className='border border-solid border-[#eaeaea] mt-6'>
              <Text className='text-md text-center'>Preferences</Text>
              <Hr/>
              <Text className='mt-6 italic p-6'>{preferences}</Text>
            </Section>}
            <Section className='mt-6'>
              <Column className='border border-solid border-[#eaeaea] w-1/2'><Text className="m-0">Estimated Total</Text></Column>
              <Column className='border border-solid border-[#eaeaea] border-l-0'><Text className="m-0 p-2">${total}.00</Text></Column>
            </Section>
            <Text className='text-md font-bold'>Contact Info:</Text>
            <Section>
              <Column className='border border-solid border-[#eaeaea]'>
                <Row><Text className="m-0 p-2">First Name</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Last Name</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Email</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Phone Number</Text></Row>
              </Column>
              <Column className='border border-solid border-[#eaeaea] border-l-0'>
                <Row><Text className="m-0 p-2">{contactInfo.firstName}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{contactInfo.lastName}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{contactInfo.email}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{contactInfo.phoneNumber}</Text></Row>
              </Column>
            </Section>
            <Text className='text-md font-bold'>Pickup Details:</Text>
            <Section>
              <Column className='border border-solid border-[#eaeaea]'>
                <Row><Text className="m-0 p-2">Pickup Date</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">Pickup Time</Text></Row>
              </Column>
              <Column className='border border-solid border-[#eaeaea] border-l-0'>
                <Row><Text className="m-0 p-2">{pickupDetails.date.slice(0,9)}</Text></Row>
                <Hr/>
                <Row><Text className="m-0 p-2">{pickupDetails.pickupTime}</Text></Row>
              </Column>
            </Section>
            {imgUrl && <Section className='border border-solid border-[#eaeaea] mt-6'>
              <Text className='text-md text-center'>Reference Image</Text>
              <Hr/>
              <Img 
                src={imgUrl}
                width="200"
                height="200"
                alt="ref photo"
                className="my-0 mx-auto"/>
            </Section>}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default OrderDetails