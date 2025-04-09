// FAQ.tsx
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { faqData } from '../constants/faq-data';
import { EnchantedHeading } from './EnchantedHeading';

const FAQ: React.FC = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-title"><EnchantedHeading>Frequently Asked Questions</EnchantedHeading></h2>
      <Accordion type="single" collapsible className='mx-32 -mx-10 my-32 '>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className='text-xl'>{faq.question}</AccordionTrigger>
            <AccordionContent className='text-lg'>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;