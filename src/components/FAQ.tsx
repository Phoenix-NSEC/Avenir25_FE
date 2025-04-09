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
    <div className="relative z-30 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <EnchantedHeading>Frequently Asked Questions</EnchantedHeading>
        </h2>
      </div>
      
      <Accordion 
        type="single" 
        collapsible 
        className="w-full max-w-4xl mx-auto space-y-4 bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 shadow-lg relative z-40"
      >
        {faqData.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-b border-purple-500/30 last:border-b-0 overflow-hidden"
          >
            <AccordionTrigger 
              className="text-xl font-medium py-4 text-white hover:text-purple-300 transition-colors duration-200 hover:no-underline" 
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent 
              className="text-lg text-white/90 pb-4 pt-1"
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;