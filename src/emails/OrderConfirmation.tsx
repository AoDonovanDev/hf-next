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

interface OrderConfirmation {
  emailBody?: string;
}

export const OrderConfirmation = ({
  emailBody
}: OrderConfirmation) => {

  const previewText = `Hurray!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans w-full">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Text className="text-[#666666] text-[12px] leading-[24px] tracking-wide whitespace-pre">
              {emailBody}


              Need anything? Email me at:

            </Text>
            <Link
                href={`mailto:${process.env.ADMIN_EMAIL}`}
                className="text-blue-600 no-underline">{process.env.ADMIN_EMAIL}
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrderConfirmation;