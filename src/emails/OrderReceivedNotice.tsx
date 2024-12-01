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
} from '@react-email/components';
import * as React from 'react';

interface OrderReceivedNotice {
  firstName?: string;
  hfEmail?: string;
  estimatedTotal?: string
  cakeSize? : string
}

export const OrderReceivedNotice = ({
  firstName,
  hfEmail,
  estimatedTotal,
  cakeSize
}: OrderReceivedNotice) => {

  const previewText = `Howdy from Housefly...`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans w-full">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={"https://i.ibb.co/41pgkrY/cfc137182f8d.png"}
                width="200"
                height="200"
                alt="cake fly"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Thank you for you order!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {firstName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your order has been received! Your estimated total for your {`${cakeSize} inch`} cake is {estimatedTotal}. You will receive a confirmation email and invoice in 2-3 business days. I look forward to making this cake for you!
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This notice was intended for {firstName}, if you received this in error please let us know at <Link
                href={`mailto:${hfEmail}`}
                className="text-blue-600 no-underline"
              >
                {hfEmail}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrderReceivedNotice;