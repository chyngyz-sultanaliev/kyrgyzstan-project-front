"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "When is the best time to visit Kyrgyzstan?",
    answer:
      "The best time to visit is from June to September, when the weather is warm and mountain roads are open.",
  },
  {
    question: "Do I need a visa to visit Kyrgyzstan?",
    answer:
      "Many nationalities can visit visa-free, but check your country rules.",
  },
  {
    question: "How can I book a tour or accommodation?",
    answer:
      "You can book online or through local travel companies available across the country.",
  },
  {
    question: "What is the local currency, and can I use credit cards?",
    answer:
      "The local currency is the Kyrgyz Som (KGS). Credit cards are accepted in major cities.",
  },
  {
    question: "Is Kyrgyzstan safe for travelers?",
    answer: "Yes, Kyrgyzstan is generally safe, especially tourist areas.",
  },
  {
    question: "How can I travel around the country?",
    answer:
      "You can use taxis, buses, marshrutkas, or rent a car for flexible travel.",
  },
  {
    question: "Can I use mobile internet and Wi-Fi easily?",
    answer:
      "Yes, mobile internet is cheap and reliable. Wi-Fi is available in cities.",
  },
  {
    question: "What kind of activities can I do in Kyrgyzstan?",
    answer:
      "Hiking, horseback riding, yurt stays, lakes, mountains, culture tours, and more.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full ">
      <div className="mx-auto h-[87vh] overflow-y-auto hide-scrollbar">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border-b border-gray-300 last:border-none"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="
                  w-full flex justify-between items-center 
                  text-left px-6 py-4 text-lg font-medium text-gray-600
                  hover:bg-gray-200 transition-colors
                "
              >
                <span>
                  {index + 1}. {item.question}
                </span>
                {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </button>

              {isOpen && (
                <p className="px-6 pb-4 text-xl text-gray-700">{item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
